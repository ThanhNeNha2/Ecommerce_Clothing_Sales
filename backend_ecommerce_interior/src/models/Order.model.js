import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    order_items: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "OrderItem",
        required: true,
      },
    ],
    total_amount: {
      type: Number,
      required: true,
      min: 0,
    },
    discount_amount: {
      type: Number,
      default: 0,
      min: 0,
    },
    final_amount: {
      type: Number,
      required: true,
      min: 0,
    },
    promotion_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Promotion",
      default: null,
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "shipped", "delivered", "cancelled"],
      default: "pending",
    },
    shipping_address: {
      type: String,
      required: true,
    },
    payment_method: {
      type: String,
      enum: ["cash", "card", "online"],
      required: true,
    },
    payment_status: {
      type: String,
      enum: ["pending", "completed", "failed"],
      default: "pending",
    },
  },
  { timestamps: true }
);

// Index để tối ưu truy vấn
orderSchema.index({ user_id: 1, status: 1, createdAt: 1 });

export default mongoose.model("Order", orderSchema);
