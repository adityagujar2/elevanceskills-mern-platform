import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";

const router = Router();
const progressStore = new Map();

router.get("/:videoId", requireAuth, (req, res) => {
  res.json({ videoId: req.params.videoId, progress: progressStore.get(`${req.auth.sub}:${req.params.videoId}`) || { seconds: 0, completed: false } });
});

router.put("/:videoId", requireAuth, (req, res) => {
  const seconds = Number(req.body.seconds);
  const duration = Number(req.body.duration);
  if (!Number.isFinite(seconds) || seconds < 0 || !Number.isFinite(duration) || duration < 0) return res.status(400).json({ message: "Valid seconds and duration are required." });
  const progress = { seconds: Math.min(seconds, duration || seconds), completed: duration > 0 && seconds / duration >= 0.9, updatedAt: new Date().toISOString() };
  progressStore.set(`${req.auth.sub}:${req.params.videoId}`, progress);
  res.json({ videoId: req.params.videoId, progress });
});

export default router;
