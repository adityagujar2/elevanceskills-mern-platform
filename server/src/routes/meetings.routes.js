import { Router } from "express";
import crypto from "node:crypto";
import { requireAuth } from "../middleware/auth.js";

const router = Router();
const rooms = new Map();

router.post("/", requireAuth, (req, res) => {
  const id = crypto.randomBytes(9).toString("base64url");
  const room = { id, hostId: req.auth.sub, title: String(req.body.title || "LearnSphere meeting").slice(0, 100), createdAt: new Date().toISOString() };
  rooms.set(id, room);
  res.status(201).json({ room, note: "Room metadata is currently in-memory. Configure persistent storage and WebRTC signaling before production use." });
});

router.get("/:id", requireAuth, (req, res) => {
  const room = rooms.get(req.params.id);
  if (!room) return res.status(404).json({ message: "Meeting not found. Demo rooms reset when the server restarts." });
  res.json({ room });
});

export default router;
