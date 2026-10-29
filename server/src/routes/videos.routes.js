import { Router } from "express";
import Video from "../models/Video.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

router.get("/", async (_req, res, next) => {
  try {
    const videos = await Video.find({ published: true }).select("-videoUrl").sort({ createdAt: -1 }).limit(100);
    res.json({ videos });
  } catch (error) { next(error); }
});

router.get("/:id", async (req, res, next) => {
  try {
    const video = await Video.findOne({ _id: req.params.id, published: true });
    if (!video) return res.status(404).json({ message: "Video not found." });
    if (video.isPremium) {
      const authHeader = req.headers.authorization || "";
      if (!authHeader.startsWith("Bearer ")) return res.status(401).json({ message: "Sign in to check access." });
      try {
        const jwt = await import("jsonwebtoken");
        const auth = jwt.default.verify(authHeader.slice(7), process.env.JWT_SECRET);
        const User = (await import("../models/User.js")).default;
        const user = await User.findById(auth.sub).select("plan");
        if (!user || user.plan === "Free") return res.status(403).json({ message: "An active paid plan is required." });
      } catch { return res.status(401).json({ message: "Session is invalid or expired." }); }
    }
    res.json({ video });
  } catch (error) { next(error); }
});

export default router;
