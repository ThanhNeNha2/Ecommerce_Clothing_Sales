import express from "express";

import {
  createReview,
  getReviewsByProduct,
  getReviewById,
  updateReview,
  deleteReview,
} from "../controller/review.controller.js";
import {
  verifyAdminAndIdAccess,
  verifyAdminAndIdBody,
} from "../controller/middlewareController.js";

const router = express.Router();

// Định nghĩa các route
router.post("/reviews", createReview);
router.get("/reviews/product/:product_id", getReviewsByProduct);
router.post("/reviews/:id", verifyAdminAndIdBody(), getReviewById);
router.put("/reviews/:id", verifyAdminAndIdBody(), updateReview);
router.delete("/reviews/:id", verifyAdminAndIdBody(), deleteReview);

export default router;
