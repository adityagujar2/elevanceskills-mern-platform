import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";
import Subscription from "../models/Subscription.js";

const router = Router();
const planPolicy = {
  Free: { dailyDownloads: 1, pricePaise: 0 },
  Bronze: { dailyDownloads: 3, pricePaise: 19900 },
  Silver: { dailyDownloads: 8, pricePaise: 39900 },
  Gold: { dailyDownloads: 20, pricePaise: 79900 }
};

router.get("/plans", (_req, res) => {
  res.json({ plans: Object.entries(planPolicy).map(([name, policy]) => ({ name, ...policy, currency: "INR" })) });
});

router.get("/me", requireAuth, async (req, res, next) => {
  try {
    const subscription = await Subscription.findOne({ user: req.auth.sub, status: "active", expiresAt: { $gt: new Date() } }).sort({ expiresAt: -1 });
    res.json({ subscription, currentPlan: subscription?.plan || "Free" });
  } catch (error) { next(error); }
});

router.post("/demo-activate", requireAuth, (_req, res) => {
  res.status(501).json({ message: "Demo activation is intentionally disabled. Configure Razorpay Test Mode and implement server-side signature verification before enabling paid subscriptions." });
});

export { planPolicy };
export default router;
