// routes/paymentRoutes.js
import express from "express";
import { isAuthenticated } from "../middlewares/authentication.js";
import { confirmPayment } from "../controllers/paymentController.js";

const router = express.Router();

// Confirm a completed Stripe payment and upgrade recruiter to premium
router.post("/confirm", isAuthenticated, confirmPayment);

export default router;