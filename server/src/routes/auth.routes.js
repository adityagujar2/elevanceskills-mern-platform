import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

router.post("/register", async (req, res, next) => {
  try {
    const name = String(req.body.name || "").trim();
    const email = String(req.body.email || "").trim().toLowerCase();
    const password = String(req.body.password || "");
    if (name.length < 2 || name.length > 80 || !emailPattern.test(email) || password.length < 8) {
      return res.status(400).json({ message: "Provide a name, valid email and password of at least 8 characters." });
    }
    if (await User.exists({ email })) return res.status(409).json({ message: "An account with this email already exists." });
    const passwordHash = await bcrypt.hash(password, 12);
    const user = await User.create({ name, email, passwordHash });
    return res.status(201).json({ user: { id: user.id, name: user.name, email: user.email, role: user.role, plan: user.plan } });
  } catch (error) { next(error); }
});

router.post("/login", async (req, res, next) => {
  try {
    const email = String(req.body.email || "").trim().toLowerCase();
    const password = String(req.body.password || "");
    const user = await User.findOne({ email }).select("+passwordHash");
    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
      return res.status(401).json({ message: "Email or password is incorrect." });
    }
    if (!process.env.JWT_SECRET || process.env.JWT_SECRET.length < 32) {
      return res.status(503).json({ message: "Server authentication is not configured. Set a long JWT_SECRET." });
    }
    const token = jwt.sign({ sub: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "2h" });
    return res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role, plan: user.plan, theme: user.theme } });
  } catch (error) { next(error); }
});

router.get("/me", requireAuth, async (req, res, next) => {
  try {
    const user = await User.findById(req.auth.sub).select("name email role plan theme");
    if (!user) return res.status(404).json({ message: "Account not found." });
    return res.json({ user });
  } catch (error) { next(error); }
});

export default router;
