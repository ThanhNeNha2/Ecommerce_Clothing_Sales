import express from "express";
import {
  CallBack,
  createPayment,
  getPaymentByIntent,
  PaymentZaloPay,
} from "../controller/payment.controller";

const router = express.Router();

// Định nghĩa các route
router.post("/payments", createPayment);

router.get("/payment/:payment_intent", getPaymentByIntent);
router.post("/paymentZaloPay", PaymentZaloPay);

router.post("/callback", CallBack);

export default router;
