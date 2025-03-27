const {
  getAllChat,
  getChatById,
  createChat,
  readChat,
} = require("../controller/chat.controller");

const router = require("express").Router();

router.get("/chats/:userId", getAllChat);
router.get("/chat/:chatId", getChatById);
router.get("/chat/:userId", getAllChat);
router.post("/read/:chatId", readChat);

module.exports = router;
