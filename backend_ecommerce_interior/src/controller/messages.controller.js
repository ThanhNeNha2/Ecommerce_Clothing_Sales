import MESSAGE from "../models/Message.model.js";
import CHAT from "../models/Chat.model.js";
export const createMessage = async (req, res) => {
  const { chatId, senderId, text } = req.body;

  try {
    // 1. Tạo message mới
    const newMessage = new MESSAGE({
      chatId,
      senderId,
      text,
    });
    const savedMessage = await newMessage.save();

    // 2. Lấy thông tin chat
    const chat = await CHAT.findById(chatId);
    if (!chat) {
      return res.status(404).json({
        message: "Cuộc trò chuyện không tồn tại",
        idCode: 1,
      });
    }

    // 3. Tìm người nhận (ngoại trừ sender)
    const receiverIds = chat.members.filter(
      (memberId) => memberId.toString() !== senderId
    );

    // 4. Tăng số lượng tin nhắn chưa đọc cho người nhận
    await CHAT.findByIdAndUpdate(chatId, {
      lastMessage: text,
      lastMessageAt: Date.now(),
      $inc: { unreadCount: 1 }, // Chỉ tăng 1
    });

    return res.status(200).json({
      message: "Gửi tin nhắn thành công",
      idCode: 0,
      data: savedMessage,
    });
  } catch (error) {
    console.log("Error:", error);
    return res.status(500).json({
      message: "Gửi tin nhắn thất bại",
      idCode: 1,
      error: error.message,
    });
  }
};
