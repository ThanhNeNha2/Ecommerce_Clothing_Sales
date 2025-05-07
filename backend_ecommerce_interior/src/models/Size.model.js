import mongoose from "mongoose";

const sizeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    description: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

// Index cho tìm kiếm
sizeSchema.index({ name: 1 });

export default mongoose.model("Size", sizeSchema);
