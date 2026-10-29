import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true, maxlength: 180 },
  description: { type: String, default: "", maxlength: 3000 },
  thumbnailUrl: { type: String, default: "" },
  videoUrl: { type: String, required: true },
  durationSeconds: { type: Number, default: 0, min: 0 },
  isPremium: { type: Boolean, default: false },
  downloadable: { type: Boolean, default: false },
  captionsUrl: { type: String, default: "" },
  published: { type: Boolean, default: true }
}, { timestamps: true });

export default mongoose.model("Video", videoSchema);
