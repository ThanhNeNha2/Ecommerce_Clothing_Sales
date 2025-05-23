import mongoose from "mongoose";
import Order from "../models/Order.model.js";
import Promotion from "../models/Promotion.model.js";
import Product from "../models/Product.model.js";
import Cart from "../models/Cart.model.js";

// Tạo đơn hàng từ giỏ hàng
export const createOrder = async (req, res) => {
  try {
    const {
      user_id,
      shipping_address,
      payment_method,
      promotion_id,
      final_amount,
      notes,
    } = req.body;

    // Kiểm tra dữ liệu đầu vào
    if (
      !mongoose.Types.ObjectId.isValid(user_id) ||
      !shipping_address ||
      !payment_method ||
      !Number.isFinite(final_amount) ||
      final_amount < 0
    ) {
      return res.status(400).json({
        message:
          "ID người dùng, địa chỉ giao hàng, phương thức thanh toán và giá trị cuối cùng là bắt buộc",
        idCode: 1,
      });
    }

    if (!["cash", "card", "online"].includes(payment_method)) {
      return res.status(400).json({
        message: "Phương thức thanh toán không hợp lệ",
        idCode: 1,
      });
    }

    // Lấy giỏ hàng của người dùng
    const cartItems = await Cart.find({ user_id }).populate(
      "product_id size_id"
    );
    if (cartItems.length === 0) {
      return res.status(400).json({
        message: "Giỏ hàng trống",
        idCode: 1,
      });
    }

    // Kiểm tra tồn kho và tạo order items
    const orderItems = [];

    for (const item of cartItems) {
      const product = item.product_id;
      if (!product) {
        return res.status(404).json({
          message: `Sản phẩm với ID ${item.product_id} không tồn tại`,
          idCode: 1,
        });
      }

      // Kiểm tra size_id hợp lệ
      if (!mongoose.Types.ObjectId.isValid(item.size_id)) {
        return res.status(400).json({
          message: `Kích thước với ID ${item.size_id} không hợp lệ`,
          idCode: 1,
        });
      }
      // console.log("check product", product);

      // Tìm kích thước trong sizes của sản phẩm
      const size = product.sizes.find(
        (s) => s.size_id.toString() === item.size_id._id.toString()
      );
      // console.log("check size", product.sizes);
      // console.log("check item", item);

      if (!size) {
        return res.status(400).json({
          message: `Sản phẩm ${product.nameProduct} không có kích thước này`,
          idCode: 1,
        });
      }

      // Kiểm tra tồn kho của kích thước
      if (size.stock < item.quantity) {
        return res.status(400).json({
          message: `Sản phẩm ${product.nameProduct} (kích thước ${item.size_id}) không đủ tồn kho`,
          idCode: 1,
        });
      }

      const price = product.salePrice;
      orderItems.push({
        product_id: item.product_id,
        size_id: item.size_id,
        quantity: item.quantity,
        price,
      });

      // Giảm tồn kho
      await Product.findOneAndUpdate(
        { _id: product._id, "sizes.size_id": item.size_id },
        {
          $inc: {
            "sizes.$.stock": -item.quantity,
            stock_quantity: -item.quantity,
          },
        }
      );
    }

    // Kiểm tra và cập nhật promotion
    let validated_promotion_id = null;
    if (promotion_id) {
      if (!mongoose.Types.ObjectId.isValid(promotion_id)) {
        return res.status(400).json({
          message: "ID mã khuyến mãi không hợp lệ",
          idCode: 1,
        });
      }

      const promotion = await Promotion.findById(promotion_id);
      if (!promotion) {
        return res.status(404).json({
          message: "Mã khuyến mãi không tồn tại",
          idCode: 1,
        });
      }

      const now = new Date();
      if (promotion.start_date > now || promotion.end_date < now) {
        return res.status(400).json({
          message: "Mã khuyến mãi không hợp lệ hoặc đã hết hạn",
          idCode: 1,
        });
      }

      validated_promotion_id = promotion._id;
      await Promotion.findByIdAndUpdate(promotion_id, {
        $inc: { usedCount: 1 },
      });
    }

    // Tạo đơn hàng
    const order = await Order.create({
      user_id,
      order_items: orderItems,
      final_amount,
      promotion_id: validated_promotion_id,
      status: "pending",
      payment_method,
      payment_status: "pending",
      shipping_address,
      notes: notes || "",
    });

    // Xóa giỏ hàng
    await Cart.deleteMany({ user_id });

    return res.status(201).json({
      message: "OK",
      idCode: 0,
      order,
    });
  } catch (error) {
    console.log("Error in createOrder:", error);
    return res.status(500).json({
      message: "Tạo đơn hàng không thành công",
      idCode: 1,
    });
  }
};

// Lấy danh sách đơn hàng của người dùng
export const getOrdersByUser = async (req, res) => {
  try {
    const { user_id, page = 1, limit = 100, status } = req.query;

    // Kiểm tra user_id
    if (!mongoose.Types.ObjectId.isValid(user_id)) {
      return res.status(400).json({
        message: "ID người dùng không hợp lệ",
        idCode: 1,
      });
    }

    // Xây dựng query
    const query = { user_id };
    if (status) {
      if (
        ![
          "pending",
          "confirmed",
          "shipped",
          "delivered",
          "cancelled",
          "completed",
        ].includes(status)
      ) {
        return res.status(400).json({
          message: "Trạng thái không hợp lệ",
          idCode: 1,
        });
      }
      query.status = status;
    }

    // Lấy danh sách đơn hàng
    const orders = await Order.find(query)
      .populate({
        path: "order_items.product_id",
        select: "nameProduct salePrice image_url mainCategory subCategory",
      })
      .populate({
        path: "order_items.size_id",
        select: "name", // Giả sử Size có trường name
      })
      .populate("promotion_id", "code discount_type discount_value")
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit))
      .lean();

    return res.status(200).json({
      message: "OK",
      idCode: 0,
      orders,
      total: await Order.countDocuments(query),
      page: Number(page),
      pages: Math.ceil((await Order.countDocuments(query)) / Number(limit)),
    });
  } catch (error) {
    console.log("Error in getOrdersByUser:", error);
    return res.status(500).json({
      message: "Truy cập danh sách đơn hàng không thành công",
      idCode: 1,
    });
  }
};

// Lấy chi tiết đơn hàng theo ID
export const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;

    // Kiểm tra ID hợp lệ
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "ID đơn hàng không hợp lệ",
        idCode: 1,
      });
    }

    // Tìm đơn hàng
    const order = await Order.findById(id)
      .populate({
        path: "order_items.product_id",
        select: "nameProduct salePrice image_url mainCategory subCategory",
      })
      .populate({
        path: "order_items.size_id",
        select: "name", // Giả sử Size có trường name
      })
      .populate("promotion_id", "code discount_type discount_value");

    if (!order) {
      return res.status(404).json({
        message: "Đơn hàng không tồn tại",
        idCode: 1,
      });
    }

    return res.status(200).json({
      message: "OK",
      idCode: 0,
      order,
    });
  } catch (error) {
    console.log("Error in getOrderById:", error);
    return res.status(500).json({
      message: "Truy cập đơn hàng không thành công",
      idCode: 1,
    });
  }
};

// Cập nhật trạng thái đơn hàng
export const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // Kiểm tra ID hợp lệ
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "ID đơn hàng không hợp lệ",
        idCode: 1,
      });
    }

    // Kiểm tra trạng thái hợp lệ
    if (
      ![
        "pending",
        "confirmed",
        "shipped",
        "delivered",
        "cancelled",
        "completed",
      ].includes(status)
    ) {
      return res.status(400).json({
        message: "Trạng thái đơn hàng không hợp lệ",
        idCode: 1,
      });
    }

    // Tìm đơn hàng
    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({
        message: "Đơn hàng không tồn tại",
        idCode: 1,
      });
    }

    // Kiểm tra trạng thái hiện tại
    if (order.status === "delivered" || order.status === "cancelled") {
      return res.status(400).json({
        message:
          "Không thể cập nhật trạng thái của đơn hàng đã giao hoặc đã hủy",
        idCode: 1,
      });
    }

    // Cập nhật trạng thái
    order.status = status;
    if (status === "delivered" && order.payment_method === "cash") {
      order.payment_status = "completed"; // Thanh toán khi nhận hàng
    }
    await order.save();

    return res.status(200).json({
      message: "OK",
      idCode: 0,
      order,
    });
  } catch (error) {
    console.log("Error in updateOrderStatus:", error);
    return res.status(500).json({
      message: "Cập nhật trạng thái đơn hàng không thành công",
      idCode: 1,
    });
  }
};

// Thanh toán đơn hàng
export const payOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const { payment_result } = req.body;

    // Kiểm tra ID hợp lệ
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "ID đơn hàng không hợp lệ",
        idCode: 1,
      });
    }

    // Tìm đơn hàng
    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({
        message: "Đơn hàng không tồn tại",
        idCode: 1,
      });
    }

    // Kiểm tra trạng thái thanh toán
    if (order.payment_status !== "pending") {
      return res.status(400).json({
        message: "Đơn hàng đã được thanh toán hoặc không thể thanh toán",
        idCode: 1,
      });
    }

    // Xử lý thanh toán
    if (payment_result === "success") {
      order.payment_status = "completed";
      order.status = "confirmed";
      await order.save();
    } else {
      order.payment_status = "failed";
      await order.save();
      return res.status(400).json({
        message: "Thanh toán thất bại",
        idCode: 1,
      });
    }

    return res.status(200).json({
      message: "OK",
      idCode: 0,
      order,
    });
  } catch (error) {
    console.log("Error in payOrder:", error);
    return res.status(500).json({
      message: "Thanh toán không thành công",
      idCode: 1,
    });
  }
};

// Hủy đơn hàng
export const cancelOrder = async (req, res) => {
  try {
    const { id } = req.params;

    // Kiểm tra ID hợp lệ
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "ID đơn hàng không hợp lệ",
        idCode: 1,
      });
    }

    // Tìm đơn hàng
    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({
        message: "Đơn hàng không tồn tại",
        idCode: 1,
      });
    }

    // Kiểm tra trạng thái
    if (order.status !== "pending") {
      return res.status(400).json({
        message: "Chỉ có thể hủy đơn hàng ở trạng thái chờ xử lý",
        idCode: 1,
      });
    }

    // Hoàn tồn kho
    for (const item of order.order_items) {
      await Product.findOneAndUpdate(
        { _id: item.product_id, "sizes.size_id": item.size_id },
        {
          $inc: {
            "sizes.$.stock": item.quantity,
            stock_quantity: item.quantity,
          },
        }
      );
    }

    // Cập nhật trạng thái
    order.status = "cancelled";
    await order.save();

    return res.status(200).json({
      message: "OK",
      idCode: 0,
      order,
    });
  } catch (error) {
    console.log("Error in cancelOrder:", error);
    return res.status(500).json({
      message: "Hủy đơn hàng không thành công",
      idCode: 1,
    });
  }
};
