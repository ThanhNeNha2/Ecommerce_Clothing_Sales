import MESSAGE from "../models/Message.model.js";
import CHAT from "../models/Chat.model.js";

export const createMessage = async (req, res) => {
  const { chatId, senderId, text } = req.body;

  try {
    const newMessage = new MESSAGE({
      chatId,
      senderId,
      text,
    });
    const savedMessage = await newMessage.save();

    // Cập nhật lastMessage trong chat
    await CHAT.findByIdAndUpdate(chatId, { lastMessage: text });

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

// Hàm đánh dấu tất cả tin nhắn trong chat là đã đọc
export const markAsRead = async (req, res) => {
  const { chatId, userId } = req.body;

  try {
    // Cập nhật tin nhắn chưa đọc thành đã đọc
    const updatedMessages = await MESSAGE.updateMany(
      { chatId, senderId: { $ne: userId }, isRead: false }, // Tin nhắn chưa đọc từ người khác
      { $set: { isRead: true } }
    );

    return res.status(200).json({
      message: "Đã đánh dấu tất cả là đã đọc",
      idCode: 0,
      data: updatedMessages,
    });
  } catch (error) {
    console.log("Error:", error);
    return res.status(500).json({
      message: "Không thể cập nhật trạng thái",
      idCode: 1,
      error: error.message,
    });
  }
};

// Lấy tin nhắn chưa đọc
export const getUnreadMessages = async (req, res) => {
  const { userId } = req.params;

  try {
    // Lấy tất cả tin nhắn chưa đọc của user
    const unreadMessages = await MESSAGE.find({
      senderId: { $ne: userId },
      isRead: false,
    });

    return res.status(200).json({
      message: "Lấy tin nhắn chưa đọc thành công",
      idCode: 0,
      data: unreadMessages,
    });
  } catch (error) {
    console.log("Error:", error);
    return res.status(500).json({
      message: "Không thể lấy tin nhắn chưa đọc",
      idCode: 1,
      error: error.message,
    });
  }
};
