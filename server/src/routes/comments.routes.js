import { Router } from "express";
import mongoose from "mongoose";
import Comment from "../models/Comment.js";
import CommentReport from "../models/CommentReport.js";
import Video from "../models/Video.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();
const blockedTerms = ["<script", "javascript:", "data:text/html"];

router.get("/video/:videoId", async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.videoId)) return res.status(400).json({ message: "Invalid video ID." });
    const sort = req.query.sort === "oldest" ? { createdAt: 1 } : req.query.sort === "popular" ? { likes: -1, createdAt: -1 } : { createdAt: -1 };
    const comments = await Comment.find({ video: req.params.videoId, parentComment: null, status: "visible" })
      .sort(sort).limit(100).populate("user", "name").lean();
    res.json({ comments });
  } catch (error) { next(error); }
});

router.post("/", requireAuth, async (req, res, next) => {
  try {
    const { videoId, text, parentComment = null, language = "und" } = req.body;
    const body = String(text || "").trim();
    if (!mongoose.isValidObjectId(videoId) || body.length < 1 || body.length > 2000) {
      return res.status(400).json({ message: "A valid video and comment of 1–2000 characters are required." });
    }
    if (blockedTerms.some(term => body.toLowerCase().includes(term))) return res.status(400).json({ message: "Comment contains disallowed markup or a suspicious link." });
    if (!await Video.exists({ _id: videoId, published: true })) return res.status(404).json({ message: "Video not found." });
    if (parentComment && !await Comment.exists({ _id: parentComment, video: videoId })) return res.status(400).json({ message: "Parent comment does not belong to this video." });
    const recent = await Comment.findOne({ user: req.auth.sub, video: videoId, text: body, createdAt: { $gte: new Date(Date.now() - 60_000) } });
    if (recent) return res.status(429).json({ message: "Duplicate comment detected. Please wait before reposting." });
    const comment = await Comment.create({ user: req.auth.sub, video: videoId, parentComment, text: body, language });
    await comment.populate("user", "name");
    res.status(201).json({ comment });
  } catch (error) { next(error); }
});

router.patch("/:id", requireAuth, async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment || String(comment.user) !== req.auth.sub) return res.status(404).json({ message: "Comment not found." });
    if (Date.now() - comment.createdAt.getTime() > 15 * 60 * 1000) return res.status(403).json({ message: "Comments can only be edited for 15 minutes." });
    const text = String(req.body.text || "").trim();
    if (!text || text.length > 2000 || blockedTerms.some(term => text.toLowerCase().includes(term))) return res.status(400).json({ message: "Comment text is invalid." });
    comment.text = text; comment.editedAt = new Date();
    await comment.save();
    res.json({ comment });
  } catch (error) { next(error); }
});

router.delete("/:id", requireAuth, async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment || String(comment.user) !== req.auth.sub) return res.status(404).json({ message: "Comment not found." });
    comment.status = "deleted"; comment.text = "[deleted]";
    await comment.save();
    res.json({ message: "Comment deleted." });
  } catch (error) { next(error); }
});

router.post("/:id/report", requireAuth, async (req, res, next) => {
  try {
    const reason = String(req.body.reason || "");
    if (!["spam", "harassment", "offensive", "malicious_link", "other"].includes(reason)) return res.status(400).json({ message: "Choose a valid report reason." });
    const comment = await Comment.findById(req.params.id);
    if (!comment || comment.status === "deleted") return res.status(404).json({ message: "Comment not found." });
    const report = await CommentReport.create({ comment: comment.id, reporter: req.auth.sub, reason, details: String(req.body.details || "").slice(0, 500) });
    comment.status = "under_review"; await comment.save();
    res.status(201).json({ report: { id: report.id, status: report.status }, message: "Report submitted for moderator review." });
  } catch (error) {
    if (error?.code === 11000) return res.status(409).json({ message: "You have already reported this comment." });
    next(error);
  }
});

router.post("/:id/reaction", requireAuth, async (req, res, next) => {
  try {
    const kind = req.body.kind;
    if (!["like", "dislike"].includes(kind)) return res.status(400).json({ message: "Reaction must be like or dislike." });
    const comment = await Comment.findById(req.params.id);
    if (!comment || comment.status !== "visible") return res.status(404).json({ message: "Comment not found." });
    const userId = new mongoose.Types.ObjectId(req.auth.sub);
    comment.likes = comment.likes.filter(id => !id.equals(userId));
    comment.dislikes = comment.dislikes.filter(id => !id.equals(userId));
    const target = kind === "like" ? comment.likes : comment.dislikes;
    target.push(userId);
    await comment.save();
    res.json({ likes: comment.likes.length, dislikes: comment.dislikes.length });
  } catch (error) { next(error); }
});

export default router;
