import Promotion from "../models/Promotion.model.js"; // Đường dẫn tới model Promotion
import mongoose from "mongoose";
// Tạo khuyến mãi mới
export const createPromotion = async (req, res) => {
  try {
    const {
      code,
      discount_type,
      discount_value,
      start_date,
      end_date,
      quantity = 20,
    } = req.body;

    // Kiểm tra dữ liệu đầu vào
    if (
      !code ||
      !discount_type ||
      discount_value === undefined ||
      !start_date ||
      !end_date ||
      quantity === undefined
    ) {
      return res.status(400).json({
        message:
          "Mã khuyến mãi, loại giảm giá, giá trị, ngày bắt đầu, ngày kết thúc và số lượng là bắt buộc",
        idCode: 1,
      });
    }
    const parsedDiscountValue = Number(discount_value);
    const parsedQuantity = Number(quantity);
    // Kiểm tra mã khuyến mãi duy nhất
    const existingPromotion = await Promotion.findOne({ code });
    if (existingPromotion) {
      return res.status(400).json({
        message: "Mã khuyến mãi đã tồn tại",
        idCode: 1,
      });
    }

    if (parsedDiscountValue < 0) {
      return res.status(400).json({
        message: "Giá trị giảm giá không được âm",
        idCode: 1,
      });
    }
    if (discount_type === "percentage" && parsedDiscountValue > 100) {
      return res.status(400).json({
        message: "Giá trị giảm giá phần trăm không được vượt quá 100",
        idCode: 1,
      });
    }

    // Kiểm tra ngày
    const start = new Date(start_date);
    const end = new Date(end_date);
    const now = new Date();
    if (isNaN(start) || isNaN(end)) {
      return res.status(400).json({
        message: "Ngày bắt đầu hoặc kết thúc không hợp lệ",
        idCode: 1,
      });
    }
    if (start >= end) {
      return res.status(400).json({
        message: "Ngày bắt đầu phải trước ngày kết thúc",
        idCode: 1,
      });
    }
    if (start < now.setHours(0, 0, 0, 0)) {
      return res.status(400).json({
        message: "Ngày bắt đầu không được ở quá khứ",
        idCode: 1,
      });
    }

    if (!Number.isInteger(parsedQuantity) || parsedQuantity < 0) {
      return res.status(400).json({
        message: "Số lượng phải là số nguyên không âm",
        idCode: 1,
      });
    }
    // Tạo khuyến mãi
    const promotion = await Promotion.create({
      code,
      discount_type,
      discount_value,
      start_date,
      end_date,
      quantity,
    });

    return res.status(201).json({
      message: "OK",
      idCode: 0,
      promotion,
    });
  } catch (error) {
    console.log("Error in createPromotion:", error);
    return res.status(500).json({
      message: "Tạo khuyến mãi không thành công",
      idCode: 1,
    });
  }
};

// Lấy danh sách khuyến mãi
export const getAllPromotions = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 100,
      code,
      discount_type,
      status,
      available,
    } = req.query;

    // Xây dựng query
    const query = {};

    // Lọc theo code
    if (code) {
      query.code = { $regex: code, $options: "i" };
    }

    // Lọc theo discount_type
    if (discount_type) {
      query.discount_type = discount_type;
    }

    // Lọc theo trạng thái (active, expired)
    const now = new Date();
    if (status === "active") {
      query.start_date = { $lte: now };
      query.end_date = { $gte: now };
    } else if (status === "expired") {
      query.end_date = { $lt: now };
    }

    // Lọc theo quantity (available: còn khả dụng)
    if (available === "true") {
      query.quantity = { $gt: 0 };
    }

    // Truy vấn khuyến mãi
    const promotions = await Promotion.find(query)
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit))
      .lean();

    // Định dạng kết quả
    const formattedPromotions = promotions.map((promotion) => ({
      id: promotion._id,
      code: promotion.code,
      discount_type: promotion.discount_type,
      discount_value: promotion.discount_value,
      start_date: promotion.start_date,
      end_date: promotion.end_date,
      quantity: promotion.quantity,
    }));

    // Tổng số bản ghi
    const total = await Promotion.countDocuments(query);

    return res.status(200).json({
      message: "OK",
      idCode: 0,
      promotions: formattedPromotions,
      total,
      page: Number(page),
      pages: Math.ceil(total / Number(limit)),
    });
  } catch (error) {
    console.log("Error in getAllPromotions:", error);
    return res.status(500).json({
      message: "Truy cập danh sách khuyến mãi không thành công",
      idCode: 1,
    });
  }
};

// Lấy chi tiết khuyến mãi theo ID
export const getPromotionById = async (req, res) => {
  try {
    const { id } = req.params;

    // Kiểm tra ID hợp lệ
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "ID khuyến mãi không hợp lệ",
        idCode: 1,
      });
    }

    // Tìm khuyến mãi
    const promotion = await Promotion.findById(id);

    if (!promotion) {
      return res.status(404).json({
        message: "Khuyến mãi không tồn tại",
        idCode: 1,
      });
    }

    return res.status(200).json({
      message: "OK",
      idCode: 0,
      promotion,
    });
  } catch (error) {
    console.log("Error in getPromotionById:", error);
    return res.status(500).json({
      message: "Truy cập khuyến mãi không thành công",
      idCode: 1,
    });
  }
};

// Cập nhật khuyến mãi
export const updatePromotion = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      code,
      discount_type,
      discount_value,
      start_date,
      end_date,
      quantity,
    } = req.body;
    const parsedDiscountValue = Number(discount_value);
    const parsedQuantity = Number(quantity);
    // Kiểm tra ID hợp lệ
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "ID khuyến mãi không hợp lệ",
        idCode: 1,
      });
    }

    // Kiểm tra khuyến mãi tồn tại
    const promotion = await Promotion.findById(id);
    if (!promotion) {
      return res.status(404).json({
        message: "Khuyến mãi không tồn tại",
        idCode: 1,
      });
    }

    // Kiểm tra mã khuyến mãi duy nhất nếu thay đổi
    if (code && code !== promotion.code) {
      const existingPromotion = await Promotion.findOne({ code });
      if (existingPromotion) {
        return res.status(400).json({
          message: "Mã khuyến mãi đã tồn tại",
          idCode: 1,
        });
      }
    }

    // Kiểm tra discount_value nếu được cung cấp

    if (parsedDiscountValue < 0) {
      return res.status(400).json({
        message: "Giá trị giảm giá không được âm",
        idCode: 1,
      });
    }
    if (discount_type === "percentage" && parsedDiscountValue > 100) {
      return res.status(400).json({
        message: "Giá trị giảm giá phần trăm không được vượt quá 100",
        idCode: 1,
      });
    }

    // Kiểm tra ngày nếu được cung cấp
    if (start_date || end_date) {
      const start = start_date ? new Date(start_date) : promotion.start_date;
      const end = end_date ? new Date(end_date) : promotion.end_date;
      const now = new Date();
      if (isNaN(start) || isNaN(end)) {
        return res.status(400).json({
          message: "Ngày bắt đầu hoặc kết thúc không hợp lệ",
          idCode: 1,
        });
      }
      if (start >= end) {
        return res.status(400).json({
          message: "Ngày bắt đầu phải trước ngày kết thúc",
          idCode: 1,
        });
      }
      if (start < now.setHours(0, 0, 0, 0)) {
        return res.status(400).json({
          message: "Ngày bắt đầu không được ở quá khứ",
          idCode: 1,
        });
      }
    }

    if (!Number.isInteger(parsedQuantity) || parsedQuantity < 0) {
      return res.status(400).json({
        message: "Số lượng phải là số nguyên không âm",
        idCode: 1,
      });
    }

    // Cập nhật khuyến mãi
    const updatedPromotion = await Promotion.findByIdAndUpdate(
      id,
      { code, discount_type, discount_value, start_date, end_date, quantity },
      { new: true, runValidators: true }
    );

    return res.status(200).json({
      message: "OK",
      idCode: 0,
      promotion: updatedPromotion,
    });
  } catch (error) {
    console.log("Error in updatePromotion:", error);
    return res.status(500).json({
      message: "Cập nhật khuyến mãi không thành công",
      idCode: 1,
    });
  }
};

// Xóa khuyến mãi
export const deletePromotion = async (req, res) => {
  try {
    const { id } = req.params;

    // Kiểm tra ID hợp lệ
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "ID khuyến mãi không hợp lệ",
        idCode: 1,
      });
    }

    // Xóa khuyến mãi
    const promotion = await Promotion.findByIdAndDelete(id);

    if (!promotion) {
      return res.status(404).json({
        message: "Khuyến mãi không tồn tại",
        idCode: 1,
      });
    }

    return res.status(200).json({
      message: "OK",
      idCode: 0,
    });
  } catch (error) {
    console.log("Error in deletePromotion:", error);
    return res.status(500).json({
      message: "Xóa khuyến mãi không thành công",
      idCode: 1,
    });
  }
};
