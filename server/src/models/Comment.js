import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  video: { type: mongoose.Schema.Types.ObjectId, ref: "Video", required: true, index: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  parentComment: { type: mongoose.Schema.Types.ObjectId, ref: "Comment", default: null },
  text: { type: String, required: true, trim: true, maxlength: 2000 },
  language: { type: String, default: "und" },
  editedAt: { type: Date, default: null },
  status: { type: String, enum: ["visible", "under_review", "hidden", "deleted"], default: "visible" },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  dislikes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]
}, { timestamps: true });

commentSchema.index({ video: 1, createdAt: -1 });
export default mongoose.model("Comment", commentSchema);
