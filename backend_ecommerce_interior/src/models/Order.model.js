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
        price: {
          type: Number,
          required: true,
          min: 0,
        },
      },
    ],
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
      enum: [
        "pending",
        "confirmed",
        "shipped",
        "delivered",
        "cancelled",
        "completed",
      ],
      default: "pending",
    },
    payment_method: {
      type: String,
      enum: ["cash", "card", "transfer"],
      required: true,
    },
    payment_status: {
      type: String,
      enum: ["pending", "completed", "failed"],
      default: "pending",
    },
    shipping_address: {
      type: String,
      required: true,
    },
    notes: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

// Validation cho order_items
orderSchema.path("order_items").validate(function (items) {
  return items.length > 0;
}, "Order must have at least one item");

// Index tối ưu truy vấn
orderSchema.index({ user_id: 1 });
orderSchema.index({ status: 1 });
orderSchema.index({ createdAt: 1 });

export default mongoose.model("Order", orderSchema);
