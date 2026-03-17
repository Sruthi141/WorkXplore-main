import "./env.js"; // must be first

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import Stripe from "stripe";

import mongodbconnect from "./utils/db.js";

import userRoutes from "./routes/userRoutes.js";
import companyRoutes from "./routes/companyRoutes.js";
import jobRoutes from "./routes/jobRoutes.js";
import applicationRoutes from "./routes/applicationRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import resumeRoutes from "./routes/resumeRoutes.js";

const app = express();
const PORT = process.env.PORT || 5000;

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("STRIPE_SECRET_KEY missing in .env");
}

console.log("✅ Stripe key prefix:", process.env.STRIPE_SECRET_KEY.slice(0, 12));

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// -------------------- MIDDLEWARES --------------------
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));

const allowedOrigin = process.env.CORS_ORIGIN || "http://localhost:5173";

app.use(
  cors({
    origin: allowedOrigin,
    credentials: true,
  })
);

// -------------------- HEALTH CHECK --------------------
app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "OK",
    data: null,
    error: null,
  });
});

// -------------------- ROUTES --------------------
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/company", companyRoutes);
app.use("/api/v1/job", jobRoutes);
app.use("/api/v1/application", applicationRoutes);
app.use("/api/v1/admin", adminRoutes);

// ✅ confirm endpoint becomes: POST /api/v1/payment/confirm
app.use("/api/v1/payment", paymentRoutes);

app.use("/api/v1/resume", resumeRoutes);

// -------------------- STRIPE PAYMENT --------------------
app.post("/create-payment-intent", async (req, res, next) => {
  try {
    const { amount } = req.body;

    if (!amount || isNaN(amount)) {
      return res.status(400).json({
        success: false,
        message: "Valid amount (in rupees) is required",
        data: null,
        error: null,
      });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(Number(amount) * 100),
      currency: "inr",
      // ✅ card-only intent (matches CardElement + confirmCardPayment)
      payment_method_types: ["card"],
    });

    console.log("CREATED PI:", paymentIntent.id);
    console.log("CLIENT SECRET PREFIX:", paymentIntent.client_secret?.slice(0, 20));

    if (!paymentIntent.client_secret) {
      return res.status(500).json({
        success: false,
        message: "Stripe did not return client_secret",
        data: null,
        error: null,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Payment intent created",
      data: { clientSecret: paymentIntent.client_secret },
      error: null,
    });
  } catch (error) {
    return next(error);
  }
});

// -------------------- GLOBAL ERROR HANDLER --------------------
app.use((err, req, res, next) => {
  console.error("GLOBAL ERROR:", err?.stack || err);

  const status = err?.status || 500;
  const message = err?.message || "Internal Server Error";

  return res.status(status).json({
    success: false,
    message,
    data: null,
    error: process.env.NODE_ENV === "production" ? null : err,
  });
});

// -------------------- SERVER START --------------------
const startServer = async () => {
  try {
    await mongodbconnect();

    const server = app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

    server.on("error", (err) => {
      if (err.code === "EADDRINUSE") {
        console.error(`❌ Port ${PORT} already in use`);
        process.exit(1);
      } else {
        console.error("Server error:", err);
      }
    });

    process.on("SIGINT", () => {
      console.log("Shutting down server...");
      server.close(() => process.exit(0));
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();