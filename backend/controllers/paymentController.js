import User from "../models/userModel.js";
import { stripe } from "../utils/stripe.js";

const PLAN_PRICES_IN_RUPEES = {
  basic: 499,
  pro: 999,
  enterprise: 1999,
};

// ✅ helper: accept either "pi_..." OR "pi_..._secret_..."
const extractPaymentIntentId = (value) => {
  if (!value) return null;
  const v = String(value).trim();
  if (v.startsWith("pi_") && v.includes("_secret_")) return v.split("_secret_")[0]; // client_secret -> id
  if (v.startsWith("pi_")) return v; // already an id
  return null;
};

export const confirmPayment = async (req, res, next) => {
  try {
    const userId = req.id;

    // ✅ accept both: paymentIntentId OR clientSecret (from frontend)
    const { paymentIntentId, clientSecret, plan } = req.body;

    const intentId = extractPaymentIntentId(paymentIntentId || clientSecret);

    if (!intentId || !plan) {
      return res.status(400).json({
        success: false,
        message: "paymentIntentId (or clientSecret) and plan are required",
        data: null,
        error: null,
      });
    }

    const normalizedPlan = String(plan).toLowerCase();
    const expectedAmount = PLAN_PRICES_IN_RUPEES[normalizedPlan];

    if (!expectedAmount) {
      return res.status(400).json({
        success: false,
        message: "Invalid plan selected",
        data: null,
        error: null,
      });
    }

    // ✅ retrieve using a real PaymentIntent id (pi_...)
    const intent = await stripe.paymentIntents.retrieve(intentId);

    if (!intent || intent.status !== "succeeded") {
      return res.status(400).json({
        success: false,
        message: "Payment has not succeeded yet",
        data: { status: intent?.status },
        error: null,
      });
    }

    // amount is stored in the smallest currency unit (paise)
    if (intent.amount !== expectedAmount * 100) {
      return res.status(400).json({
        success: false,
        message: "Payment amount does not match selected plan",
        data: { receivedAmount: intent.amount, expectedAmount: expectedAmount * 100 },
        error: null,
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
        data: null,
        error: null,
      });
    }

    if (user.role !== "recruiter") {
      return res.status(403).json({
        success: false,
        message: "Only recruiters can purchase premium plans",
        data: null,
        error: null,
      });
    }

    user.profile = user.profile || {};
    user.profile.subscriptionPlan = normalizedPlan;
    user.profile.isPremium = true;
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Subscription upgraded successfully",
      data: {
        subscriptionPlan: user.profile.subscriptionPlan,
        isPremium: user.profile.isPremium,
      },
      error: null,
    });
  } catch (error) {
    return next(error);
  }
};