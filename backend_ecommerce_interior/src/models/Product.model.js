import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    originalPrice: {
      type: Number,
      required: true,
      min: 0,
    },
    salePrice: {
      type: Number,
      required: true,
      min: 0,
    },
    salePercentage: {
      type: Number,
      default: 0,
      enum: [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50],
      min: 0,
      max: 100, // Giới hạn phần trăm từ 0-100
    },
    stock_quantity: {
      type: Number,
      required: true,
      min: 0,
    },
    category_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    image_url: {
      type: [String],
      required: true,
    },
    sizes: [
      {
        size_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Size",
          required: true,
        },
        stock: {
          type: Number,
          required: true,
          min: 0,
        },
      },
    ],
  },
  { timestamps: true }
);

// Index cho tìm kiếm
productSchema.index({ name: "text", category_id: 1 });

export default mongoose.model("Product", productSchema);
