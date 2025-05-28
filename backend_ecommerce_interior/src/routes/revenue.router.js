import express from "express";
import {
  getDailyRevenueByMonthHandler,
  getMonthlyRevenueHandler,
  getProductRevenueHandler,
} from "../controller/Revenue.controller.js";

const router = express.Router();

// Định nghĩa route với controller đúng chuẩn Express
router.get("/monthly-revenue", getMonthlyRevenueHandler);
router.get("/product-revenue", getProductRevenueHandler);
router.get("/day-revenue", getDailyRevenueByMonthHandler);

export default router;
