import express from "express";
import {
  createOrder,
  getOrdersByUser,
  getOrderById,
  updateOrderStatus,
  payOrder,
  cancelOrder,
} from "../controller/order.controller";

const router = express.Router();

// Định nghĩa các route
router.post("/orders", createOrder);
router.get("/orders", getOrdersByUser);
router.get("/orders/:id", getOrderById);
router.put("/orders/:id/status", updateOrderStatus);
router.post("/orders/:id/pay", payOrder);
router.post("/orders/:id/cancel", cancelOrder);

export default router;
