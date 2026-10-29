import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
  plan: { type: String, enum: ["Free", "Bronze", "Silver", "Gold"], required: true },
  status: { type: String, enum: ["active", "pending", "expired", "cancelled"], default: "pending" },
  startsAt: { type: Date, default: null },
  expiresAt: { type: Date, default: null },
  billingCycle: { type: String, enum: ["monthly", "quarterly", "yearly"], default: "monthly" },
  razorpayOrderId: { type: String, default: null },
  razorpayPaymentId: { type: String, default: null },
  amountPaise: { type: Number, min: 0, default: 0 },
  currency: { type: String, default: "INR" }
}, { timestamps: true });

export default mongoose.model("Subscription", subscriptionSchema);
