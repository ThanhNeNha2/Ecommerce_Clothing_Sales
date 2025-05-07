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
router.post("/", createSize);
router.get("/", getAllSizes);
router.get("/:id", getSizeById);
router.put("/:id", updateSize);
router.delete("/:id", deleteSize);

export default router;
