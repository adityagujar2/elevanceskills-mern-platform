import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";
import Download from "../models/Download.js";
import Video from "../models/Video.js";
import User from "../models/User.js";
import { planPolicy } from "./subscriptions.routes.js";

const router = Router();

router.get("/me", requireAuth, async (req, res, next) => {
  try {
    const downloads = await Download.find({ user: req.auth.sub }).populate("video", "title thumbnailUrl durationSeconds").sort({ createdAt: -1 }).limit(100);
    res.json({ downloads });
  } catch (error) { next(error); }
});

router.post("/:videoId", requireAuth, async (req, res, next) => {
  try {
    const user = await User.findById(req.auth.sub).select("plan");
    const video = await Video.findOne({ _id: req.params.videoId, published: true });
    if (!user || !video) return res.status(404).json({ message: "User or video not found." });
    if (!video.downloadable || !video.videoUrl) return res.status(403).json({ message: "This video is not available for download." });
    const policy = planPolicy[user.plan] || planPolicy.Free;
    const start = new Date(); start.setHours(0, 0, 0, 0);
    const used = await Download.countDocuments({ user: user.id, createdAt: { $gte: start }, status: { $in: ["authorized", "completed"] } });
    const existing = await Download.findOne({ user: user.id, video: video.id, createdAt: { $gte: start }, status: { $in: ["authorized", "completed"] } });
    if (!existing && used >= policy.dailyDownloads) return res.status(429).json({ message: "Daily download quota reached.", quota: policy.dailyDownloads, used });
    const record = existing || await Download.create({
      user: user.id, video: video.id, planAtDownload: user.plan,
      ipAddress: req.ip, userAgent: req.get("user-agent") || null, status: "authorized"
    });
    res.json({ download: record, quota: { dailyLimit: policy.dailyDownloads, used: existing ? used : used + 1 }, message: "Authorized. Connect a protected file storage provider to serve the video securely." });
  } catch (error) { next(error); }
});

export default router;
