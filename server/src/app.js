import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import healthRouter from "./routes/health.routes.js";
import authRouter from "./routes/auth.routes.js";
import videosRouter from "./routes/videos.routes.js";
import commentsRouter from "./routes/comments.routes.js";
import subscriptionsRouter from "./routes/subscriptions.routes.js";
import downloadsRouter from "./routes/downloads.routes.js";
import securityRouter from "./routes/security.routes.js";
import meetingsRouter from "./routes/meetings.routes.js";
import watchProgressRouter from "./routes/watchprogress.routes.js";

const app = express();

app.disable("x-powered-by");
app.use(helmet());
app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:5173",
  credentials: true
}));
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true, limit: "1mb" }));
app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));
app.use("/api", rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 300,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  message: { message: "Too many requests. Please try again shortly." }
}));

app.get("/", (_req, res) => {
  res.json({
    name: "ElevanceSkills MERN Video Platform API",
    status: "running",
    docs: "See README.md for the current project scope"
  });
});

app.use("/api/health", healthRouter);
app.use("/api/auth", authRouter);
app.use("/api/videos", videosRouter);
app.use("/api/comments", commentsRouter);
app.use("/api/subscriptions", subscriptionsRouter);
app.use("/api/downloads", downloadsRouter);
app.use("/api/security", securityRouter);
app.use("/api/meetings", meetingsRouter);
app.use("/api/watch-progress", watchProgressRouter);

app.use((_req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(err.status || 500).json({
    message: err.status ? err.message : "Internal server error"
  });
});

export default app;
