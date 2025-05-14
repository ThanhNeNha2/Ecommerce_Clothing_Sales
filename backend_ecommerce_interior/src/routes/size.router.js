import express from "express";
import {
  createSize,
  getAllSizes,
  getSizeById,
  updateSize,
  deleteSize,
} from "../controller/size.controller.js";

const router = express.Router();

// Định nghĩa các route
router.post("/size", createSize);
router.get("/size", getAllSizes);
router.get("/size/:id", getSizeById);
router.put("/size/:id", updateSize);
router.delete("/size/:id", deleteSize);

export default router;
