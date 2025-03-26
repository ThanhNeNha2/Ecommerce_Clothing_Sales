const {
  getAllChat,
  getChatById,
  createChat,
  readChat,
} = require("../controller/chat.controller");

const router = require("express").Router();

router.get("/chat", getAllChat);
router.get("/chat/:id", getChatById);

router.post("/chat", createChat);
router.post("/read/:id", readChat);

module.exports = router;
