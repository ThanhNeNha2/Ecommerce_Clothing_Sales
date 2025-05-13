import mongoose from "mongoose";
import Wishlist from "../models/Wishlist.model.js"; // Đường dẫn tới model Wishlist
import Product from "../models/Product.model.js"; // Đường dẫn tới model Product

// Thêm sản phẩm vào danh sách yêu thích
export const addToWishlist = async (req, res) => {
  try {
    const { user_id, product_id } = req.body;

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

    // Kiểm tra sản phẩm tồn tại
    const product = await Product.findById(product_id);
    if (!product) {
      return res.status(404).json({
        message: "Sản phẩm không tồn tại",
        idCode: 1,
      });
    }

    // Thêm vào danh sách yêu thích
    const wishlistItem = new Wishlist({ user_id, product_id });
    await wishlistItem.save();

    return res.status(201).json({
      message: "Đã thêm sản phẩm vào danh sách yêu thích",
      idCode: 0,
      wishlistItem,
    });
  } catch (error) {
    // Xử lý lỗi trùng lặp (sản phẩm đã có trong wishlist)
    if (error.code === 11000) {
      return res.status(409).json({
        message: "Sản phẩm đã có trong danh sách yêu thích",
        idCode: 1,
      });
    }
    console.error("Error in addToWishlist:", error);
    return res.status(500).json({
      message: "Thêm sản phẩm vào danh sách yêu thích thất bại",
      idCode: 1,
    });
  }
};

// Lấy danh sách yêu thích của người dùng
export const getWishlist = async (req, res) => {
  try {
    const { user_id } = req.query;

    // Kiểm tra user_id
    if (!mongoose.Types.ObjectId.isValid(user_id)) {
      return res.status(400).json({
        message: "ID người dùng không hợp lệ",
        idCode: 1,
      });
    }

    // Lấy danh sách yêu thích và populate thông tin sản phẩm
    const wishlist = await Wishlist.find({ user_id })
      .populate({
        path: "product_id",
        select: "nameProduct salePrice image_url mainCategory subCategory",
      })
      .lean();

    // Định dạng kết quả
    const formattedWishlist = wishlist.map((item) => ({
      id: item._id,
      user_id: item.user_id,
      product: {
        id: item.product_id._id,
        nameProduct: item.product_id.nameProduct,
        salePrice: item.product_id.salePrice,
        image_url: item.product_id.image_url,
        mainCategory: item.product_id.mainCategory,
        subCategory: item.product_id.subCategory,
      },
    }));

    return res.status(200).json({
      message: "OK",
      idCode: 0,
      wishlist: formattedWishlist,
      total: wishlist.length,
    });
  } catch (error) {
    console.error("Error in getWishlist:", error);
    return res.status(500).json({
      message: "Lấy danh sách yêu thích thất bại",
      idCode: 1,
    });
  }
};

// Kiểm tra sản phẩm có trong danh sách yêu thích không
export const checkWishlist = async (req, res) => {
  try {
    const { user_id, product_id } = req.query;

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

    // Kiểm tra trong danh sách yêu thích
    const wishlistItem = await Wishlist.findOne({ user_id, product_id });

    return res.status(200).json({
      message: "OK",
      idCode: 0,
      isInWishlist: !!wishlistItem,
    });
  } catch (error) {
    console.error("Error in checkWishlist:", error);
    return res.status(500).json({
      message: "Kiểm tra danh sách yêu thích thất bại",
      idCode: 1,
    });
  }
};

// Chuyển đổi trạng thái sản phẩm trong danh sách yêu thích (thêm hoặc xóa)
export const toggleWishlist = async (req, res) => {
  try {
    const { user_id, product_id } = req.body;

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

    // Kiểm tra sản phẩm tồn tại
    const product = await Product.findById(product_id);
    if (!product) {
      return res.status(404).json({
        message: "Sản phẩm không tồn tại",
        idCode: 1,
      });
    }

    // Kiểm tra sản phẩm có trong danh sách yêu thích không
    const wishlistItem = await Wishlist.findOne({ user_id, product_id });

    if (wishlistItem) {
      // Nếu sản phẩm đã có, xóa khỏi danh sách
      await Wishlist.deleteOne({ user_id, product_id });
      return res.status(200).json({
        message: "Đã xóa sản phẩm khỏi danh sách yêu thích",
        idCode: 0,
        isInWishlist: false,
      });
    } else {
      // Nếu sản phẩm chưa có, thêm vào danh sách
      const newWishlistItem = new Wishlist({ user_id, product_id });
      await newWishlistItem.save();
      return res.status(201).json({
        message: "Đã thêm sản phẩm vào danh sách yêu thích",
        idCode: 0,
        isInWishlist: true,
      });
    }
  } catch (error) {
    // Xử lý lỗi trùng lặp (không áp dụng vì đã kiểm tra trước)
    console.error("Error in toggleWishlist:", error);
    return res.status(500).json({
      message: "Chuyển đổi trạng thái danh sách yêu thích thất bại",
      idCode: 1,
    });
  }
};

// Xóa sản phẩm khỏi danh sách yêu thích
export const removeFromWishlist = async (req, res) => {
  try {
    const { user_id, product_id } = req.body;

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

    // Xóa sản phẩm khỏi danh sách yêu thích
    const result = await Wishlist.deleteOne({ user_id, product_id });

    if (result.deletedCount === 0) {
      return res.status(404).json({
        message: "Sản phẩm không có trong danh sách yêu thích",
        idCode: 1,
      });
    }

    return res.status(200).json({
      message: "Đã xóa sản phẩm khỏi danh sách yêu thích",
      idCode: 0,
    });
  } catch (error) {
    console.error("Error in removeFromWishlist:", error);
    return res.status(500).json({
      message: "Xóa sản phẩm khỏi danh sách yêu thích thất bại",
      idCode: 1,
    });
  }
};
