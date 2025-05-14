import express from "express";
import {
  addToWishlist,
  getWishlist,
  checkWishlist,
  toggleWishlist,
  removeFromWishlist,
} from "../controller/wishlist.controller.js";
const router = express.Router();

router.post("/wishlist", addToWishlist);
router.get("/wishlist", getWishlist);
router.get("/wishlist/check", checkWishlist);
router.post("/wishlist/toggle", toggleWishlist);
router.delete("/wishlist", removeFromWishlist);

export default router;
