import mongoose from "mongoose";

import Size from "../models/Size.model";

// CREATE SIZE
export const createSize = async (req, res) => {
  try {
    const { name, description } = req.body;

    // Kiểm tra name
    if (!name) {
      return res.status(400).json({
        message: "Tên kích cỡ là bắt buộc",
        idCode: 1,
      });
    }

    // Kiểm tra name đã tồn tại
    const existingSize = await Size.findOne({ name });
    if (existingSize) {
      return res.status(400).json({
        message: "Kích cỡ này đã tồn tại",
        idCode: 1,
      });
    }

    const size = await Size.create({
      name,
      description,
    });

    return res.status(200).json({
      message: "OK",
      idCode: 0,
      size,
    });
  } catch (error) {
    console.log("Error", error);
    return res.status(500).json({
      message: "Tạo kích cỡ không thành công",
      idCode: 1,
    });
  }
};

// GET ALL SIZES
export const getAllSizes = async (req, res) => {
  try {
    const { page = 1, limit = 10, search } = req.query;

    const query = {};
    if (search) query.name = { $regex: search, $options: "i" };

    const sizes = await Size.find(query)
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit))
      .lean();

    const formattedSizes = sizes.map((size) => ({
      ...size,
      id: size._id,
      _id: undefined,
    }));

    const total = await Size.countDocuments(query);

    return res.status(200).json({
      message: "OK",
      idCode: 0,
      sizes: formattedSizes,
      total,
      page: Number(page),
      pages: Math.ceil(total / Number(limit)),
    });
  } catch (error) {
    console.log("Error", error);
    return res.status(500).json({
      message: "Truy cập danh sách kích cỡ không thành công",
      idCode: 1,
    });
  }
};

// GET SIZE BY ID
export const getSizeById = async (req, res) => {
  try {
    const size = await Size.findOne({ _id: req.params.id });

    if (!size) {
      return res.status(404).json({
        message: "Kích cỡ không tồn tại",
        idCode: 1,
      });
    }

    return res.status(200).json({
      message: "OK",
      idCode: 0,
      size,
    });
  } catch (error) {
    console.log("Error", error);
    return res.status(500).json({
      message: "Truy cập kích cỡ không thành công",
      idCode: 1,
    });
  }
};

// UPDATE SIZE
export const updateSize = async (req, res) => {
  try {
    const size = await Size.findOne({ _id: req.params.id });
    if (!size) {
      return res.status(404).json({
        message: "Kích cỡ không tồn tại",
        idCode: 1,
      });
    }

    const { name } = req.body;

    // Kiểm tra name nếu được cung cấp
    if (name !== undefined && !name) {
      return res.status(400).json({
        message: "Tên kích cỡ không được rỗng",
        idCode: 1,
      });
    }

    // Kiểm tra name đã tồn tại (nếu thay đổi name)
    if (name && name !== size.name) {
      const existingSize = await Size.findOne({ name });
      if (existingSize) {
        return res.status(400).json({
          message: "Kích cỡ này đã tồn tại",
          idCode: 1,
        });
      }
    }

    const updatedSize = await Size.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    return res.status(200).json({
      message: "OK",
      idCode: 0,
      size: updatedSize,
    });
  } catch (error) {
    console.log("Error", error);
    return res.status(500).json({
      message: "Cập nhật kích cỡ không thành công",
      idCode: 1,
    });
  }
};

// DELETE SIZE
export const deleteSize = async (req, res) => {
  try {
    const size = await Size.findOne({ _id: req.params.id });
    if (!size) {
      return res.status(404).json({
        message: "Kích cỡ không tồn tại",
        idCode: 1,
      });
    }

    // Kiểm tra xem kích cỡ có được sử dụng trong sản phẩm không
    const products = await mongoose.model("Product").find({
      "sizes.size_id": req.params.id,
    });

    if (products.length > 0) {
      return res.status(400).json({
        message: "Không thể xóa kích cỡ vì có sản phẩm liên quan",
        idCode: 1,
      });
    }

    await Size.findByIdAndDelete(req.params.id);

    return res.status(200).json({
      message: "Xóa kích cỡ thành công",
      idCode: 0,
    });
  } catch (error) {
    console.log("Error", error);
    return res.status(500).json({
      message: "Xóa kích cỡ không thành công",
      idCode: 1,
    });
  }
};
