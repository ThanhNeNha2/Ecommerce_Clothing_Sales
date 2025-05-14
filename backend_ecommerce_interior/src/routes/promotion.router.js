import express from "express";
import {
  createPromotion,
  getAllPromotions,
  getPromotionById,
  updatePromotion,
  deletePromotion,
} from "../controller/promotion.controller.js";

const router = express.Router();

// Định nghĩa các route
router.post("/promotions", createPromotion);
router.get("/promotions", getAllPromotions);
router.get("/promotions/:id", getPromotionById);
router.put("/promotions/:id", updatePromotion);
router.delete("/promotions/:id", deletePromotion);

export default router;
