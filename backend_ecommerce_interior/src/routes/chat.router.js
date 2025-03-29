const {
  getAllChat,
  getChatById,
  createChat,
} = require("../controller/chat.controller");

const router = require("express").Router();

router.get("/chat", getAllChat);
router.get("/chat/:chatId", getChatById);
router.post("/chat", createChat);

module.exports = router;
