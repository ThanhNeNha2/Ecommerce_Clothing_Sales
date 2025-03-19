import BLOG from "../models/Blog.model";

//  CREATE USER
export const createBlog = async (req, res) => {
  try {
    const blog = await BLOG.create(req.body);
    return res.status(200).json({
      message: "OK",
      idCode: 0,
      blog,
    });
  } catch (error) {
    console.log("Error", error);
    return res.status(500).json({
      message: "Tạo blog không thành công ",
      idCode: 1,
    });
  }
};

//  GET ALL BLOG
export const getAllBlog = async (req, res) => {
  try {
    const getAllBlog = await BLOG.find({}).lean();

    return res.status(200).json({
      message: "OK",
      idCode: 0,
      getAllBlog, // Trả về danh sách đã thay đổi
    });
  } catch (error) {
    console.log("Error", error);

    return res.status(500).json({
      message: "Truy cap danh sach blog khong thanh cong",
      idCode: 1,
    });
  }
};

// GET BLOG BY ID

export const getBlogById = async (req, res) => {
  try {
    const blog = await BLOG.findOne({ _id: req.params.id });
    if (!blog) {
      return res.status(404).json({
        message: "Blog not found",
        idCode: 1,
      });
    }

    return res.status(200).json({
      message: "OK",
      idCode: 0,
      blog,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Truy cap danh sach blog khong thanh cong", idCode: 1 });
  }
};

//  UPDATE BLOG
export const updateUser = async (req, res) => {
  try {
    const checkExitId = await BLOG.findOne({ _id: req.params.id });
    if (!checkExitId) {
      return res.status(200).json({
        message: "Blog khong ton tai ",
        idCode: 1,
      });
    }
    const updateBlog = await BLOG.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    return res.status(200).json({
      message: "OK",
      idCode: 0,
      updateBlog,
    });
  } catch (error) {
    console.log("Error", error);

    return res.status(500).json({
      message: "Update blog không thành công ",
      idCode: 1,
    });
  }
};

//  DELETE BLOG
export const deleteUser = async (req, res) => {
  try {
    const checkExitId = await BLOG.findOne({ _id: req.params.id });
    if (!checkExitId) {
      return res.status(200).json({
        message: "Blog khong ton tai ",
        idCode: 1,
      });
    }
    await BLOG.findByIdAndDelete(req.params.id);

    return res.status(200).json({
      message: "OK",
      idCode: 0,
    });
  } catch (error) {
    console.log("Error", error);

    return res.status(500).json({
      message: "Delete blog không thành công ",
      idCode: 1,
    });
  }
};
