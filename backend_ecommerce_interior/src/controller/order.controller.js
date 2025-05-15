import Order from "../models/Order.model.js";
import OrderItem from "../models/OrderItem.model.js";
import mongoose from "mongoose";
import Promotion from "../models/Promotion.model.js";
import Product from "../models/Product.model.js";
import Cart from "../models/Cart.model.js";

// Tạo đơn hàng từ giỏ hàng
export const createOrder = async (req, res) => {
  try {
    const { user_id, shipping_address, payment_method, promotion_code } =
      req.body;

    // Kiểm tra dữ liệu đầu vào
    if (
      !mongoose.Types.ObjectId.isValid(user_id) ||
      !shipping_address ||
      !payment_method
    ) {
      return res.status(400).json({
        message:
          "ID người dùng, địa chỉ giao hàng và phương thức thanh toán là bắt buộc",
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
    const cartItems = await Cart.find({ user_id }).populate("product_id");
    if (cartItems.length === 0) {
      return res.status(400).json({
        message: "Giỏ hàng trống",
        idCode: 1,
      });
    }

    // Kiểm tra tồn kho và tạo order items
    const orderItems = [];
    let total_amount = 0;

    for (const item of cartItems) {
      const product = item.product_id;
      if (!product) {
        return res.status(404).json({
          message: `Sản phẩm với ID ${item.product_id} không tồn tại`,
          idCode: 1,
        });
      }

      if (product.stock_quantity < item.quantity) {
        return res.status(400).json({
          message: `Sản phẩm ${product.nameProduct} không đủ tồn kho`,
          idCode: 1,
        });
      }

      const unit_price = product.salePrice;
      const total_price = unit_price * item.quantity;
      total_amount += total_price;

      const orderItem = await OrderItem.create({
        order_id: null, // Sẽ cập nhật sau
        product_id: item.product_id,
        quantity: item.quantity,
        unit_price,
        total_price,
      });
      orderItems.push(orderItem._id);

      // Giảm tồn kho
      await Product.findByIdAndUpdate(product._id, {
        $inc: { stock_quantity: -item.quantity },
      });
    }

    // Áp dụng khuyến mãi
    let discount_amount = 0;
    let promotion_id = null;
    if (promotion_code) {
      const promotion = await Promotion.findOne({ code: promotion_code });
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

      if (promotion.quantity <= 0) {
        return res.status(400).json({
          message: "Mã khuyến mãi đã hết lượt sử dụng",
          idCode: 1,
        });
      }

      discount_amount =
        promotion.discount_type === "percentage"
          ? (total_amount * promotion.discount_value) / 100
          : promotion.discount_value;
      promotion_id = promotion._id;
      await Promotion.findByIdAndUpdate(promotion_id, {
        $inc: { quantity: -1 },
      });
    }

    // Tính final_amount
    const final_amount = total_amount - discount_amount;

    // Tạo đơn hàng
    const order = await Order.create({
      user_id,
      order_items: orderItems,
      total_amount,
      discount_amount,
      final_amount,
      promotion_id,
      status: "pending",
      shipping_address,
      payment_method,
      payment_status: "pending",
    });

    // Cập nhật order_id cho order items
    await OrderItem.updateMany(
      { _id: { $in: orderItems } },
      { order_id: order._id }
    );

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
        !["pending", "confirmed", "shipped", "delivered", "cancelled"].includes(
          status
        )
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
        path: "order_items",
        populate: {
          path: "product_id",
          select: "nameProduct salePrice image_url mainCategory subCategory",
        },
      })
      .populate("promotion_id", "code discount_type discount_value")
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit))
      .lean();

    // Tổng số bản ghi
    const total = await Order.countDocuments(query);

    return res.status(200).json({
      message: "OK",
      idCode: 0,
      orders,
      total,
      page: Number(page),
      pages: Math.ceil(total / Number(limit)),
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
        path: "order_items",
        populate: {
          path: "product_id",
          select: "nameProduct salePrice image_url mainCategory subCategory",
        },
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
      !["pending", "confirmed", "shipped", "delivered", "cancelled"].includes(
        status
      )
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
    const { payment_result } = req.body; // Giả sử từ cổng thanh toán

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
      order.status = "confirmed"; // Chuyển sang trạng thái xác nhận
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
    const order = await Order.findById(id).populate("order_items");
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
      await Product.findByIdAndUpdate(item.product_id, {
        $inc: { stock_quantity: item.quantity },
      });
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
