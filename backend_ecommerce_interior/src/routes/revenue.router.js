import express from "express";
import {
  getMonthlyRevenueHandler,
  getProductRevenueHandler,
} from "../controller/Revenue.controller.js";

const router = express.Router();

// Định nghĩa route với controller đúng chuẩn Express
router.get("/monthly-revenue", getMonthlyRevenueHandler);

export default router;
