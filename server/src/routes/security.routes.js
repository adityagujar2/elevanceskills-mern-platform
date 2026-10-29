import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";
import User from "../models/User.js";

const router = Router();

router.patch("/theme", requireAuth, async (req, res, next) => {
  try {
    if (!["light", "dark", null].includes(req.body.theme)) return res.status(400).json({ message: "Theme must be light, dark or null for automatic." });
    const user = await User.findByIdAndUpdate(req.auth.sub, { theme: req.body.theme }, { new: true }).select("theme");
    res.json({ theme: user.theme });
  } catch (error) { next(error); }
});

router.get("/logins", requireAuth, (_req, res) => {
  res.json({ logins: [], message: "Login audit persistence and email/SMS OTP provider integration are not configured yet." });
});

router.post("/otp/verify", (_req, res) => {
  res.status(501).json({ message: "OTP verification is not enabled until an email/SMS provider, hashed OTP storage and attempt limits are configured." });
});

export default router;
