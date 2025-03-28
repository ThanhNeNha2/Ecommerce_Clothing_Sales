const {
  getAllChat,
  getChatById,
  createChat,
  readChat,
} = require("../controller/chat.controller");

const router = require("express").Router();

router.get("/chat", getAllChat);
router.get("/chat/:chatId", getChatById);
router.post("/chat", createChat);
router.post("/read/:chatId", readChat);

module.exports = router;
