import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, maxlength: 80 },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  passwordHash: { type: String, required: true, select: false },
  role: { type: String, enum: ["user", "moderator", "admin"], default: "user" },
  plan: { type: String, enum: ["Free", "Bronze", "Silver", "Gold"], default: "Free" },
  theme: { type: String, enum: ["light", "dark"], default: null },
  trustedDevices: [{ deviceHash: String, label: String, trustedUntil: Date }]
}, { timestamps: true });

export default mongoose.model("User", userSchema);
