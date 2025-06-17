import mongoose from "mongoose";

const promotionSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    discount_type: {
      type: String,
      enum: ["percentage", "fixed"],
      required: true,
    },
    discount_value: {
      type: Number,
      required: true,
      min: 0,
    },
    start_date: {
      type: Date,
      required: true,
    },
    end_date: {
      type: Date,
      required: true,
    },
    usedCount: {
      type: Number,
      required: true,
      default: 0,
    },
    maxUses: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  { timestamps: true }
);

// Index cho tìm kiếm và lọc
promotionSchema.index({ code: 1, start_date: 1, end_date: 1 });

export default mongoose.model("Promotion", promotionSchema);
