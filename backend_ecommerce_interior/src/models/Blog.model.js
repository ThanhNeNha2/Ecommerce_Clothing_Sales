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
    public_id_image: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Blog", blogSchema);
