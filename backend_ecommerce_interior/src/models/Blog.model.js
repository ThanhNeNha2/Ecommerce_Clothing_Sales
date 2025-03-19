import mongoose from "mongoose";
const blogSchema = new mongoose.Schema(
  {
    imgMainBlog: {
      type: String,
      required: false,
    },
    titleBlog: {
      type: String,
      required: true,
    },
    descripShort: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Blog", blogSchema);
