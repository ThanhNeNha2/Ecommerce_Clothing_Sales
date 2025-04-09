const {
  verifyTokenAndPermission,
} = require("../controller/middlewareController");
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

router.post("/user", verifyTokenAndPermission(["ADMIN"]), createUser);
router.put(
  "/user/:id",
  verifyTokenAndPermission(["ADMIN", "STAFF"]),
  updateUser
);
router.delete(
  "/user/:id",
  verifyTokenAndPermission(["ADMIN", "STAFF"]),
  deleteUser
);

module.exports = router;
