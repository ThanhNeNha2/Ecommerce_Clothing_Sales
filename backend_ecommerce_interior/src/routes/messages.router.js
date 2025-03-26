const { createMessage } = require("../controller/messages.controller");

const router = require("express").Router();

router.post("/message", createMessage);

module.exports = router;
