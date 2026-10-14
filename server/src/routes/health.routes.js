import { Router } from "express";
import mongoose from "mongoose";

const router = Router();

router.get("/", (_req, res) => {
  const databaseConnected = mongoose.connection.readyState === 1;

  res.status(200).json({
    status: "ok",
    service: "api",
    database: databaseConnected ? "connected" : "not connected",
    timestamp: new Date().toISOString()
  });
});

export default router;
