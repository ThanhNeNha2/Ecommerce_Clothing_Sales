import mongoose from "mongoose";

const ChatSchema = new mongoose.Schema(
  {
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    lastMessage: { type: String }, // Tin nhắn cuối cùng
    lastMessageAt: { type: Date, default: Date.now }, // Thời gian tin nhắn cuối
    unreadCount: { type: Number, default: 0 }, // Số lượng tin nhắn chưa đọc
  },
  { timestamps: true }
);

export default mongoose.model("Chat", ChatSchema);
