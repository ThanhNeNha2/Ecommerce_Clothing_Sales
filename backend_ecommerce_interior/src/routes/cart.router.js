import express from "express";
import {
  addToCart,
  getCart,
  removeFromCart,
  updateCart,
} from "../controller/cart.controller";
import { verifyToken } from "../controller/middlewareController";

const router = express.Router();

// Định nghĩa các route
router.post("/cart", verifyToken, addToCart);
router.get("/cart", verifyToken, getCart);
router.put("/cart/:id", verifyToken, updateCart);
router.delete("/cart/:id", verifyToken, removeFromCart);

export default router;
