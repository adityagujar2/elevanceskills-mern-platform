import mongoose from "mongoose";

const commentReportSchema = new mongoose.Schema({
  comment: { type: mongoose.Schema.Types.ObjectId, ref: "Comment", required: true, index: true },
  reporter: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  reason: { type: String, enum: ["spam", "harassment", "offensive", "malicious_link", "other"], required: true },
  details: { type: String, maxlength: 500, default: "" },
  status: { type: String, enum: ["open", "reviewed", "dismissed", "actioned"], default: "open" },
  reviewedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
  reviewedAt: { type: Date, default: null }
}, { timestamps: true });

commentReportSchema.index({ comment: 1, reporter: 1 }, { unique: true });
export default mongoose.model("CommentReport", commentReportSchema);
