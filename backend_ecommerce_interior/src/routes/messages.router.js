const {
  createMessage,
  markAsRead,
  getUnreadMessages,
} = require("../controller/messages.controller");

const router = require("express").Router();

router.post("/message", createMessage);

// Đánh dấu là đã đọc
router.put("/message/mark-as-read", markAsRead);

// Lấy tin nhắn chưa đọc
router.get("/message/unread/:userId", getUnreadMessages);

module.exports = router;
