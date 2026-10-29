import mongoose from "mongoose";

const downloadSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
  video: { type: mongoose.Schema.Types.ObjectId, ref: "Video", required: true },
  status: { type: String, enum: ["authorized", "completed", "failed"], default: "authorized" },
  planAtDownload: { type: String, enum: ["Free", "Bronze", "Silver", "Gold"], required: true },
  fileSizeBytes: { type: Number, default: null },
  ipAddress: { type: String, default: null },
  userAgent: { type: String, default: null },
  completedAt: { type: Date, default: null }
}, { timestamps: true });

downloadSchema.index({ user: 1, createdAt: -1 });
export default mongoose.model("Download", downloadSchema);
