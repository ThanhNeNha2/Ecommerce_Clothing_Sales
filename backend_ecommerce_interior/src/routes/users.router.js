const {
  createUser,
  getUser,
  updateUser,
  deleteUser,
  getUserById,
} = require("../controller/users.controller");

const router = require("express").Router();

router.get("/user", getUser);
router.get("/user/:id", getUserById);

router.post("/user", createUser);
router.put("/user/:id", updateUser);
router.delete("/user/:id", deleteUser);

module.exports = router;
