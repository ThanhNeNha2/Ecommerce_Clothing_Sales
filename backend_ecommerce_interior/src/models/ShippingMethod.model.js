import mongoose from "mongoose";

const shippingMethodSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    cost: {
      type: Number,
      required: true,
      min: 0,
    },
    estimated_time: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

// Index cho tìm kiếm
shippingMethodSchema.index({ name: 1 });

export default mongoose.model("ShippingMethod", shippingMethodSchema);
