const {
  verifyAdminAndIdAccess,
  verifyAdminAccess,
} = require("../controller/middlewareController");
const {
  createUser,
  getUser,
  updateUser,
  deleteUser,
  getUserById,
} = require("../controller/users.controller");

const router = require("express").Router();

router.get("/user", verifyAdminAccess(), getUser);
router.get("/user/:id", verifyAdminAndIdAccess(), getUserById);

router.post("/user", verifyAdminAccess(), createUser);
router.put("/user/:id", verifyAdminAndIdAccess(), updateUser);
router.delete("/user/:id", verifyAdminAccess(), deleteUser);

module.exports = router;
