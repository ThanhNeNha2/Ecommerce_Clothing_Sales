const {
  createBlog,
  getAllBlog,
  getBlogById,
  updateUser,
  deleteUser,
} = require("../controller/blogs.controller");
const { verifyAdminAccess } = require("../controller/middlewareController");

const router = require("express").Router();

router.get("/blog", getAllBlog);
router.get("/blog/:id", getBlogById);

router.post("/blog", verifyAdminAccess(), createBlog);
router.put("/blog/:id", verifyAdminAccess(), updateUser);
router.delete("/blog/:id", verifyAdminAccess(), deleteUser);

module.exports = router;
