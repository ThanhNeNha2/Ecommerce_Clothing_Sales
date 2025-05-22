import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  product_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  size_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Size",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
});

// Index cho truy vấn theo user, product và size
cartSchema.index({ user_id: 1, product_id: 1, size_id: 1 }, { unique: true });

export default mongoose.model("Cart", cartSchema);
