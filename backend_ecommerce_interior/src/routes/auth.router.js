const {
  Register,
  Login,

  activateAccount,
  resetKeyActivateAccount,
} = require("../controller/auth.controller");

const router = require("express").Router();

router.post("/auth/login", Login);

router.post("/auth/register", Register);
router.post("/activateAccount/:id", activateAccount);
router.post("/resetKeyActivateAccount", resetKeyActivateAccount);

module.exports = router;
