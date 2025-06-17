import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    payment_intent: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    OrderCode: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Payment", paymentSchema);
