import Review from "../models/Review.model.js";
import Product from "../models/Product.model.js";
import User from "../models/User.model.js";
import mongoose from "mongoose";
// Tạo đánh giá mới
export const createReview = async (req, res) => {
  try {
    const { product_id, user_id, rating, comment } = req.body;

    // Kiểm tra dữ liệu đầu vào
    if (
      !mongoose.Types.ObjectId.isValid(product_id) ||
      !mongoose.Types.ObjectId.isValid(user_id)
    ) {
      return res.status(400).json({
        message: "ID sản phẩm hoặc người dùng không hợp lệ",
        idCode: 1,
      });
    }

    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({
        message: "Điểm đánh giá phải từ 1 đến 5",
        idCode: 1,
      });
    }

    // Kiểm tra sản phẩm tồn tại
    const product = await Product.findById(product_id);
    if (!product) {
      return res.status(404).json({
        message: "Sản phẩm không tồn tại",
        idCode: 1,
      });
    }

    // Kiểm tra người dùng tồn tại
    const user = await User.findById(user_id);
    if (!user) {
      return res.status(404).json({
        message: "Người dùng không tồn tại",
        idCode: 1,
      });
    }

    // Tạo đánh giá
    const review = await Review.create({
      product_id,
      user_id,
      rating,
      comment,
    });

    return res.status(201).json({
      message: "OK",
      idCode: 0,
      review,
    });
  } catch (error) {
    console.log("Error in createReview:", error);
    if (error.code === 11000) {
      // Duplicate key error (product_id, user_id)
      return res.status(400).json({
        message: "Người dùng đã đánh giá sản phẩm này",
        idCode: 1,
      });
    }
    return res.status(500).json({
      message: "Tạo đánh giá không thành công",
      idCode: 1,
    });
  }
};

// Lấy danh sách đánh giá của một sản phẩm
export const getReviewsByProduct = async (req, res) => {
  try {
    const { product_id } = req.params;
    const { page = 1, limit = 100 } = req.query;

    // Kiểm tra product_id
    if (!mongoose.Types.ObjectId.isValid(product_id)) {
      return res.status(400).json({
        message: "ID sản phẩm không hợp lệ",
        idCode: 1,
      });
    }

    // Kiểm tra sản phẩm tồn tại
    const product = await Product.findById(product_id);
    if (!product) {
      return res.status(404).json({
        message: "Sản phẩm không tồn tại",
        idCode: 1,
      });
    }

    // Lấy danh sách đánh giá
    const reviews = await Review.find({ product_id })
      .populate("user_id", "username email") // Populate thông tin người dùng
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit))
      .lean();

    // Tổng số bản ghi
    const total = await Review.countDocuments({ product_id });

    return res.status(200).json({
      message: "OK",
      idCode: 0,
      reviews,
      total,
      page: Number(page),
      pages: Math.ceil(total / Number(limit)),
    });
  } catch (error) {
    console.log("Error in getReviewsByProduct:", error);
    return res.status(500).json({
      message: "Truy cập danh sách đánh giá không thành công",
      idCode: 1,
    });
  }
};

// Lấy chi tiết đánh giá theo ID
export const getReviewById = async (req, res) => {
  try {
    const { id } = req.params;

    // Kiểm tra ID hợp lệ
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "ID đánh giá không hợp lệ",
        idCode: 1,
      });
    }

    // Tìm đánh giá
    const review = await Review.findById(id)
      .populate("product_id", "nameProduct salePrice image_url")
      .populate("user_id", "username email");

    if (!review) {
      return res.status(404).json({
        message: "Đánh giá không tồn tại",
        idCode: 1,
      });
    }

    return res.status(200).json({
      message: "OK",
      idCode: 0,
      review,
    });
  } catch (error) {
    console.log("Error in getReviewById:", error);
    return res.status(500).json({
      message: "Truy cập đánh giá không thành công",
      idCode: 1,
    });
  }
};

// Cập nhật đánh giá
export const updateReview = async (req, res) => {
  try {
    const { id } = req.params;
    const { user_id, rating, comment } = req.body;

    // Kiểm tra ID hợp lệ
    if (
      !mongoose.Types.ObjectId.isValid(id) ||
      !mongoose.Types.ObjectId.isValid(user_id)
    ) {
      return res.status(400).json({
        message: "ID đánh giá hoặc người dùng không hợp lệ",
        idCode: 1,
      });
    }

    // Tìm đánh giá
    const review = await Review.findById(id);
    if (!review) {
      return res.status(404).json({
        message: "Đánh giá không tồn tại",
        idCode: 1,
      });
    }

    // Kiểm tra quyền chỉnh sửa
    if (review.user_id.toString() !== user_id) {
      return res.status(403).json({
        message: "Bạn không có quyền chỉnh sửa đánh giá này",
        idCode: 1,
      });
    }

    // Kiểm tra rating nếu được cung cấp
    if (rating !== undefined) {
      if (rating < 1 || rating > 5) {
        return res.status(400).json({
          message: "Điểm đánh giá phải từ 1 đến 5",
          idCode: 1,
        });
      }
      review.rating = rating;
    }

    // Cập nhật comment nếu được cung cấp
    if (comment !== undefined) {
      review.comment = comment;
    }

    await review.save();

    return res.status(200).json({
      message: "OK",
      idCode: 0,
      review,
    });
  } catch (error) {
    console.log("Error in updateReview:", error);
    return res.status(500).json({
      message: "Cập nhật đánh giá không thành công",
      idCode: 1,
    });
  }
};

// Xóa đánh giá
export const deleteReview = async (req, res) => {
  try {
    const { id } = req.params;
    const { user_id } = req.body;

    // Kiểm tra ID hợp lệ
    if (
      !mongoose.Types.ObjectId.isValid(id) ||
      !mongoose.Types.ObjectId.isValid(user_id)
    ) {
      return res.status(400).json({
        message: "ID đánh giá hoặc người dùng không hợp lệ",
        idCode: 1,
      });
    }

    // Tìm đánh giá
    const review = await Review.findById(id);
    if (!review) {
      return res.status(404).json({
        message: "Đánh giá không tồn tại",
        idCode: 1,
      });
    }

    // Kiểm tra quyền xóa
    if (review.user_id.toString() !== user_id) {
      return res.status(403).json({
        message: "Bạn không có quyền xóa đánh giá này",
        idCode: 1,
      });
    }

    // Xóa đánh giá
    await Review.findByIdAndDelete(id);

    return res.status(200).json({
      message: "OK",
      idCode: 0,
    });
  } catch (error) {
    console.log("Error in deleteReview:", error);
    return res.status(500).json({
      message: "Xóa đánh giá không thành công",
      idCode: 1,
    });
  }
};
