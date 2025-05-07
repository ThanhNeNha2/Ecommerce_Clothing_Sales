const {
  Register,
  Login,

  activateAccount,
  resetKeyActivateAccount,
  reSendKey,
  userLogout,
  requestRefreshToken,
} = require("../controller/auth.controller");
const { verifyToken } = require("../controller/middlewareController");

const router = require("express").Router();
router.post("/auth/login", Login);
router.post("/auth/register", Register);
router.post("/activateAccount/:id", activateAccount);
router.post("/resetKeyActivateAccount", resetKeyActivateAccount);
router.post("/reSendKey/:id", reSendKey);
router.post("/refresh", requestRefreshToken);
router.post("/logout", verifyToken, userLogout);

module.exports = router;
