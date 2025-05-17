import express from "express";

import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  getProductsForChatbot,
} from "../controller/product.controller.js";

const router = express.Router();

// Định nghĩa các route
router.post("/product", createProduct);
router.get("/product", getAllProducts);
router.get("/product/chatbot", getProductsForChatbot);
router.get("/product/:id", getProductById);
router.put("/product/:id", updateProduct);
router.delete("/product/:id", deleteProduct);

export default router;
