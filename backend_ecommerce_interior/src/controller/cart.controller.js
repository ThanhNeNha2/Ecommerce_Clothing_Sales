import mongoose from "mongoose";
import Cart from "../models/Cart.model.js"; // Đường dẫn tới model Cart
import Product from "../models/Product.model.js"; // Đường dẫn tới model Product

// Thêm sản phẩm vào giỏ hàng
export const addToCart = async (req, res) => {
  try {
    const { user_id, product_id, quantity = 1 } = req.body;

    // Kiểm tra dữ liệu đầu vào
    if (
      !mongoose.Types.ObjectId.isValid(user_id) ||
      !mongoose.Types.ObjectId.isValid(product_id)
    ) {
      return res.status(400).json({
        message: "ID người dùng hoặc sản phẩm không hợp lệ",
        idCode: 1,
      });
    }

    if (!Number.isInteger(quantity) || quantity < 1) {
      return res.status(400).json({
        message: "Số lượng phải là số nguyên dương",
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

    // Kiểm tra số lượng tồn kho
    if (product.stock_quantity < quantity) {
      return res.status(400).json({
        message: "Số lượng yêu cầu vượt quá số lượng tồn kho",
        idCode: 1,
      });
    }

    // Thêm hoặc cập nhật giỏ hàng
    const cartItem = await Cart.findOneAndUpdate(
      { user_id, product_id },
      { $set: { quantity } },
      { upsert: true, new: true, runValidators: true }
    );

    return res.status(201).json({
      message: "OK",
      idCode: 0,
      cartItem,
    });
  } catch (error) {
    // Xử lý lỗi trùng lặp (không cần vì findOneAndUpdate xử lý upsert)
    console.log("Error in addToCart:", error);
    return res.status(500).json({
      message: "Thêm sản phẩm vào giỏ hàng không thành công",
      idCode: 1,
    });
  }
};

// Lấy danh sách sản phẩm trong giỏ hàng của người dùng
export const getCart = async (req, res) => {
  try {
    const { user_id, page = 1, limit = 100 } = req.query;

    // Kiểm tra user_id
    if (!mongoose.Types.ObjectId.isValid(user_id)) {
      return res.status(400).json({
        message: "ID người dùng không hợp lệ",
        idCode: 1,
      });
    }

    // Lấy danh sách giỏ hàng và populate thông tin sản phẩm
    const cartItems = await Cart.find({ user_id })
      .populate({
        path: "product_id",
        select:
          "nameProduct salePrice image_url mainCategory subCategory stock_quantity",
      })
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit))
      .lean();

    // Định dạng kết quả
    const formattedCart = cartItems.map((item) => ({
      id: item._id,
      user_id: item.user_id,
      product: {
        id: item.product_id._id,
        nameProduct: item.product_id.nameProduct,
        salePrice: item.product_id.salePrice,
        image_url: item.product_id.image_url,
        mainCategory: item.product_id.mainCategory,
        subCategory: item.product_id.subCategory,
        stock_quantity: item.product_id.stock_quantity,
      },
      quantity: item.quantity,
    }));

    // Tổng số bản ghi
    const total = await Cart.countDocuments({ user_id });

    return res.status(200).json({
      message: "OK",
      idCode: 0,
      cart: formattedCart,
      total,
      page: Number(page),
      pages: Math.ceil(total / Number(limit)),
    });
  } catch (error) {
    console.log("Error in getCart:", error);
    return res.status(500).json({
      message: "Truy cập giỏ hàng không thành công",
      idCode: 1,
    });
  }
};

// Cập nhật số lượng sản phẩm trong giỏ hàng
export const updateCart = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;

    // Kiểm tra ID hợp lệ
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "ID giỏ hàng không hợp lệ",
        idCode: 1,
      });
    }

    // Kiểm tra số lượng
    if (!Number.isInteger(quantity) || quantity < 1) {
      return res.status(400).json({
        message: "Số lượng phải là số nguyên dương",
        idCode: 1,
      });
    }

    // Kiểm tra bản ghi giỏ hàng tồn tại
    const cartItem = await Cart.findById(id);
    if (!cartItem) {
      return res.status(404).json({
        message: "Sản phẩm không có trong giỏ hàng",
        idCode: 1,
      });
    }

    // Kiểm tra sản phẩm tồn tại
    const product = await Product.findById(cartItem.product_id);
    if (!product) {
      return res.status(404).json({
        message: "Sản phẩm không tồn tại",
        idCode: 1,
      });
    }

    // Kiểm tra số lượng tồn kho
    if (product.stock_quantity < quantity) {
      return res.status(400).json({
        message: "Số lượng yêu cầu vượt quá số lượng tồn kho",
        idCode: 1,
      });
    }

    // Cập nhật số lượng
    const updatedCartItem = await Cart.findByIdAndUpdate(
      id,
      { $set: { quantity } },
      { new: true, runValidators: true }
    );

    return res.status(200).json({
      message: "OK",
      idCode: 0,
      cartItem: updatedCartItem,
    });
  } catch (error) {
    console.log("Error in updateCart:", error);
    return res.status(500).json({
      message: "Cập nhật giỏ hàng không thành công",
      idCode: 1,
    });
  }
};

// Xóa sản phẩm khỏi giỏ hàng
export const removeFromCart = async (req, res) => {
  try {
    const { id } = req.params;

    // Kiểm tra ID hợp lệ
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "ID giỏ hàng không hợp lệ",
        idCode: 1,
      });
    }

    // Xóa sản phẩm khỏi giỏ hàng
    const cartItem = await Cart.findByIdAndDelete(id);

    if (!cartItem) {
      return res.status(404).json({
        message: "Sản phẩm không có trong giỏ hàng",
        idCode: 1,
      });
    }

    return res.status(200).json({
      message: "OK",
      idCode: 0,
    });
  } catch (error) {
    console.log("Error", error);
    return res.status(500).json({
      message: "Xóa sản phẩm khỏi giỏ hàng không thành công",
      idCode: 1,
    });
  }
};
