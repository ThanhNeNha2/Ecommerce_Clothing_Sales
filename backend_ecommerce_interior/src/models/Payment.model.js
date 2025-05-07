import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    order_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    payment_method: {
      type: String,
      enum: ["COD", "card", "wallet"],
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

// Index cho truy vấn
paymentSchema.index({ order_id: 1 });

export default mongoose.model("Payment", paymentSchema);
