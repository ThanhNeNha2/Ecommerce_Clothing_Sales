import express from "express";
import {
  createPayment,
  getPaymentByIntent,
} from "../controller/payment.controller";

const router = express.Router();

// Định nghĩa các route
router.post("/payments", createPayment);

router.get("/payment/:payment_intent", getPaymentByIntent);

export default router;
