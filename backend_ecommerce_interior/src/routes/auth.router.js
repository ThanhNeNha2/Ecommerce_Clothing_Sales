const {
  Register,
  Login,
  sendEmailToUser,
} = require("../controller/auth.controller");

const router = require("express").Router();

router.post("/auth/login", Login);

router.post("/auth/register", Register);
router.get("/auth/sendEmail", sendEmailToUser);

module.exports = router;
