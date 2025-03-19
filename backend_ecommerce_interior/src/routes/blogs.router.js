const {
  createBlog,
  getAllBlog,
  getBlogById,
  updateUser,
  deleteUser,
} = require("../controller/blogs.controller");

const router = require("express").Router();

router.get("/blog", getAllBlog);
router.get("/blog/:id", getBlogById);

router.post("/blog", createBlog);
router.put("/blog/:id", updateUser);
router.delete("/blog/:id", deleteUser);

module.exports = router;
