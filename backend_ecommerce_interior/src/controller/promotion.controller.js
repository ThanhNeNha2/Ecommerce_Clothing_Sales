import mongoose from "mongoose";
import Promotion from "../models/Promotion.model.js";

// Hàm kiểm tra dữ liệu đầu vào
const validatePromotionData = ({
  code,
  description,
  discount_type,
  discount_value,
  start_date,
  end_date,
  maxUses,
}) => {
  const errors = [];

  if (!code || typeof code !== "string" || code.trim() === "") {
    errors.push("Mã khuyến mãi là bắt buộc và phải hợp lệ");
  }
  if (
    !description ||
    typeof description !== "string" ||
    description.trim() === ""
  ) {
    errors.push("Mô tả là bắt buộc");
  }
  if (!discount_type || !["percentage", "fixed"].includes(discount_type)) {
    errors.push("Loại giảm giá phải là 'percentage' hoặc 'fixed'");
  }
  if (
    discount_value === undefined ||
    isNaN(discount_value) ||
    discount_value < 0
  ) {
    errors.push("Giá trị giảm giá phải là số không âm");
  }
  if (discount_type === "percentage" && discount_value > 100) {
    errors.push("Giá trị giảm giá phần trăm không được vượt quá 100");
  }
  if (!start_date || isNaN(new Date(start_date))) {
    errors.push("Ngày bắt đầu không hợp lệ");
  }
  if (!end_date || isNaN(new Date(end_date))) {
    errors.push("Ngày kết thúc không hợp lệ");
  }
  if (start_date && end_date) {
    const start = new Date(start_date);
    const end = new Date(end_date);
    const now = new Date();
    if (start >= end) {
      errors.push("Ngày bắt đầu phải trước ngày kết thúc");
    }
    if (start < new Date(now.setHours(0, 0, 0, 0))) {
      errors.push("Ngày bắt đầu không được ở quá khứ");
    }
  }
  if (
    maxUses === undefined ||
    !Number.isInteger(Number(maxUses)) ||
    Number(maxUses) < 0
  ) {
    errors.push("Số lần sử dụng tối đa phải là số nguyên không âm");
  }

  return errors;
};

// Tạo khuyến mãi mới
export const createPromotion = async (req, res) => {
  try {
    const {
      code,
      description,
      discount_type,
      discount_value,
      start_date,
      end_date,
      maxUses = 20,
    } = req.body;

    // Kiểm tra dữ liệu đầu vào
    const errors = validatePromotionData({
      code,
      description,
      discount_type,
      discount_value,
      start_date,
      end_date,
      maxUses,
    });
    if (errors.length > 0) {
      return res.status(400).json({
        message: errors.join(", "),
        idCode: 1,
      });
    }

    // Kiểm tra mã khuyến mãi duy nhất
    const existingPromotion = await Promotion.findOne({ code }).lean();
    if (existingPromotion) {
      return res.status(400).json({
        message: "Mã khuyến mãi đã tồn tại",
        idCode: 2,
      });
    }

    // Tạo khuyến mãi
    const promotion = await Promotion.create({
      code,
      description,
      discount_type,
      discount_value: Number(discount_value),
      start_date: new Date(start_date),
      end_date: new Date(end_date),
      maxUses: Number(maxUses),
    });

    return res.status(201).json({
      message: "OK",
      idCode: 0,
      promotion,
    });
  } catch (error) {
    console.error("Error in createPromotion:", error);
    return res.status(500).json({
      message: "Tạo khuyến mãi không thành công",
      idCode: 3,
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

    // Kiểm tra page và limit
    const parsedPage = Number(page);
    const parsedLimit = Number(limit);
    if (
      isNaN(parsedPage) ||
      parsedPage < 1 ||
      isNaN(parsedLimit) ||
      parsedLimit < 1
    ) {
      return res.status(400).json({
        message: "Trang và giới hạn phải là số dương",
        idCode: 1,
      });
    }

    // Xây dựng query
    const query = {};
    if (code) {
      query.code = { $regex: code.trim(), $options: "i" };
    }
    if (discount_type) {
      query.discount_type = discount_type;
    }
    const now = new Date();
    if (status === "active") {
      query.start_date = { $lte: now };
      query.end_date = { $gte: now };
    } else if (status === "expired") {
      query.end_date = { $lt: now };
    }
    if (available === "true") {
      query.maxUses = { $gt: query.usedCount || 0 };
    }

    // Truy vấn khuyến mãi
    const promotions = await Promotion.find(query)
      .select(
        "code description discount_type discount_value start_date end_date usedCount maxUses"
      )
      .skip((parsedPage - 1) * parsedLimit)
      .limit(parsedLimit)
      .lean();

    // Định dạng kết quả
    const formattedPromotions = promotions.map((promotion) => ({
      id: promotion._id,
      code: promotion.code,
      description: promotion.description,
      discount_type: promotion.discount_type,
      discount_value: promotion.discount_value,
      start_date: promotion.start_date,
      end_date: promotion.end_date,
      usedCount: promotion.usedCount,
      maxUses: promotion.maxUses,
    }));

    // Tổng số bản ghi
    const total = await Promotion.countDocuments(query);

    return res.status(200).json({
      message: "OK",
      idCode: 0,
      promotions: formattedPromotions,
      total,
      page: parsedPage,
      pages: Math.ceil(total / parsedLimit),
    });
  } catch (error) {
    console.error("Error in getAllPromotions:", error);
    return res.status(500).json({
      message: "Truy cập danh sách khuyến mãi không thành công",
      idCode: 3,
    });
  }
};

// Lấy chi tiết khuyến mãi theo code
export const getPromotionByCode = async (req, res) => {
  try {
    const { code } = req.query;

    // Kiểm tra code hợp lệ
    if (
      !code ||
      typeof code !== "string" ||
      code.trim() === "" ||
      /[<>{}]/.test(code)
    ) {
      return res.status(400).json({
        message: "Vui lòng cung cấp mã code hợp lệ",
        idCode: 1,
      });
    }

    const processedCode = code.trim();
    const promotion = await Promotion.findOne({
      code: { $regex: `^${processedCode}$`, $options: "i" },
    })
      .select(
        "code description discount_type discount_value start_date end_date usedCount maxUses"
      )
      .lean();

    if (!promotion) {
      return res.status(404).json({
        message: "Mã giảm giá không tồn tại",
        idCode: 2,
      });
    }

    return res.status(200).json({
      message: "OK",
      idCode: 0,
      promotion: {
        id: promotion._id,
        code: promotion.code,
        description: promotion.description,
        discount_type: promotion.discount_type,
        discount_value: promotion.discount_value,
        start_date: promotion.start_date,
        end_date: promotion.end_date,
        usedCount: promotion.usedCount,
        maxUses: promotion.maxUses,
      },
    });
  } catch (error) {
    console.error("Error in getPromotionByCode:", error);
    return res.status(500).json({
      message: "Lỗi máy chủ khi tìm mã giảm giá",
      idCode: 3,
    });
  }
};

// Lấy chi tiết khuyến mãi theo ID
export const getPromotionById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "ID khuyến mãi không hợp lệ",
        idCode: 1,
      });
    }

    const promotion = await Promotion.findById(id)
      .select(
        "code description discount_type discount_value start_date end_date usedCount maxUses"
      )
      .lean();

    if (!promotion) {
      return res.status(404).json({
        message: "Khuyến mãi không tồn tại",
        idCode: 2,
      });
    }

    return res.status(200).json({
      message: "OK",
      idCode: 0,
      promotion: {
        id: promotion._id,
        code: promotion.code,
        description: promotion.description,
        discount_type: promotion.discount_type,
        discount_value: promotion.discount_value,
        start_date: promotion.start_date,
        end_date: promotion.end_date,
        usedCount: promotion.usedCount,
        maxUses: promotion.maxUses,
      },
    });
  } catch (error) {
    console.error("Error in getPromotionById:", error);
    return res.status(500).json({
      message: "Truy cập khuyến mãi không thành công",
      idCode: 3,
    });
  }
};

// Cập nhật khuyến mãi
export const updatePromotion = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      code,
      description,
      discount_type,
      discount_value,
      start_date,
      end_date,
      maxUses,
    } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "ID khuyến mãi không hợp lệ",
        idCode: 1,
      });
    }

    const promotion = await Promotion.findById(id);
    if (!promotion) {
      return res.status(404).json({
        message: "Khuyến mãi không tồn tại",
        idCode: 2,
      });
    }

    // Kiểm tra quyền (giả định)
    // if (!req.user.isAdmin) {
    //   return res.status(403).json({
    //     message: "Không có quyền cập nhật khuyến mãi",
    //     idCode: 4,
    //   });
    // }

    // Kiểm tra mã khuyến mãi duy nhất nếu thay đổi
    if (code && code !== promotion.code) {
      const existingPromotion = await Promotion.findOne({ code }).lean();
      if (existingPromotion) {
        return res.status(400).json({
          message: "Mã khuyến mãi đã tồn tại",
          idCode: 2,
        });
      }
    }

    // Kiểm tra dữ liệu đầu vào
    const errors = validatePromotionData({
      code: code || promotion.code,
      description: description || promotion.description,
      discount_type: discount_type || promotion.discount_type,
      discount_value:
        discount_value !== undefined
          ? Number(discount_value)
          : promotion.discount_value,
      start_date: start_date || promotion.start_date,
      end_date: end_date || promotion.end_date,
      maxUses: maxUses !== undefined ? Number(maxUses) : promotion.maxUses,
    });
    if (errors.length > 0) {
      return res.status(400).json({
        message: errors.join(", "),
        idCode: 1,
      });
    }

    // Cập nhật khuyến mãi
    const updatedPromotion = await Promotion.findByIdAndUpdate(
      id,
      {
        code: code || promotion.code,
        description: description || promotion.description,
        discount_type: discount_type || promotion.discount_type,
        discount_value:
          discount_value !== undefined
            ? Number(discount_value)
            : promotion.discount_value,
        start_date: start_date || promotion.start_date,
        end_date: end_date || promotion.end_date,
        maxUses: maxUses !== undefined ? Number(maxUses) : promotion.maxUses,
      },
      { new: true, runValidators: true }
    ).select(
      "code description discount_type discount_value start_date end_date usedCount maxUses"
    );

    return res.status(200).json({
      message: "OK",
      idCode: 0,
      promotion: updatedPromotion,
    });
  } catch (error) {
    console.error("Error in updatePromotion:", error);
    return res.status(500).json({
      message: "Cập nhật khuyến mãi không thành công",
      idCode: 3,
    });
  }
};

// Xóa khuyến mãi
export const deletePromotion = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "ID khuyến mãi không hợp lệ",
        idCode: 1,
      });
    }

    // Kiểm tra quyền (giả định)
    // if (!req.user.isAdmin) {
    //   return res.status(403).json({
    //     message: "Không có quyền xóa khuyến mãi",
    //     idCode: 4,
    //   });
    // }

    const promotion = await Promotion.findByIdAndDelete(id);
    if (!promotion) {
      return res.status(404).json({
        message: "Khuyến mãi không tồn tại",
        idCode: 2,
      });
    }

    return res.status(200).json({
      message: "OK",
      idCode: 0,
    });
  } catch (error) {
    console.error("Error in deletePromotion:", error);
    return res.status(500).json({
      message: "Xóa khuyến mãi không thành công",
      idCode: 3,
    });
  }
};
