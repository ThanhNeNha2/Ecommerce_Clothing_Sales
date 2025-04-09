const {
  createBlog,
  getAllBlog,
  getBlogById,
  updateUser,
  deleteUser,
} = require("../controller/blogs.controller");
const {
  verifyTokenAndPermission,
} = require("../controller/middlewareController");

const router = require("express").Router();

router.get("/blog", getAllBlog);
router.get("/blog/:id", getBlogById);

router.post("/blog", createBlog);
router.put(
  "/blog/:id",
  verifyTokenAndPermission(["ADMIN", "STAFF"]),
  updateUser
);
router.delete(
  "/blog/:id",
  verifyTokenAndPermission(["ADMIN", "STAFF"]),
  deleteUser
);

module.exports = router;
