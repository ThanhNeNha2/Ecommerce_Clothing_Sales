import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
  {
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ], // Danh sách người tham gia
    lastMessage: {
      type: String,
      default: "", // Tin nhắn gần nhất
    },
  },
  { timestamps: true }
);

export default mongoose.model("Chat", chatSchema);
