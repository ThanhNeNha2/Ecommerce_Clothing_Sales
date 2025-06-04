import Payment from "../models/Payment.model";
const axios = require("axios").default; // npm install axios
const CryptoJS = require("crypto-js"); // npm install crypto-js
const moment = require("moment"); // npm install moment
import Order from "../models/Order.model.js";

export const createPayment = async (req, res) => {
  try {
    const payment = await Payment.create({
      payment_intent: req.body.payment_intent,
      price: req.body.price,
      OrderCode: req.body.OrderCode,
    });

    return res.status(201).json({
      message: "OK",
      idCode: 0,
      payment, // Trả lại dữ liệu vừa tạo (nếu cần)
    });
  } catch (error) {
    console.error("Lỗi tạo payment:", error);
    return res.status(500).json({
      message: "Tạo payment thất bại",
      idCode: 1,
    });
  }
};

export const getPaymentByIntent = async (req, res) => {
  try {
    const { payment_intent } = req.params;

    const payment = await Payment.findOne({ payment_intent });

    if (!payment) {
      return res.status(404).json({
        message: "Không tìm thấy thông tin thanh toán",
        idCode: 1,
      });
    }

    return res.status(200).json({
      message: "Tìm thành công",
      idCode: 0,
      payment,
    });
  } catch (error) {
    console.error("Lỗi khi tìm payment:", error);
    return res.status(500).json({
      message: "Lỗi server",
      idCode: 2,
    });
  }
};

const config = {
  app_id: "2553",
  key1: "PcY4iZIKFCIdgZvA6ueMcMHHUbRLYjPL",
  key2: "kLtgPl8HHhfvMuDHPwKfgfsY4Ydm9eIz",
  endpoint: "https://sb-openapi.zalopay.vn/v2/create",
};
export const PaymentZaloPay = async (req, res) => {
  const price = req.body.price;
  const idOrder = req.body.idOrder;
  const embed_data = { redirecturl: "http://localhost:5174/order" };

  const items = [{}];
  const transID = Math.floor(Math.random() * 1000000);
  const order = {
    app_id: config.app_id,
    app_trans_id: `${moment().format("YYMMDD")}_${transID}`, // translation missing: vi.docs.shared.sample_code.comments.app_trans_id
    app_user: "user123",
    app_time: Date.now(), // miliseconds
    item: JSON.stringify(items),
    embed_data: JSON.stringify(embed_data),
    amount: price,
    description: `Lazada - Payment for the order #${transID}`,
    bank_code: "",
    callback_url: `https://21f0-123-19-242-217.ngrok-free.app/api/callback?idOrder=${idOrder}`,
  };

  // appid|app_trans_id|appuser|amount|apptime|embeddata|item
  const data =
    config.app_id +
    "|" +
    order.app_trans_id +
    "|" +
    order.app_user +
    "|" +
    order.amount +
    "|" +
    order.app_time +
    "|" +
    order.embed_data +
    "|" +
    order.item;
  order.mac = CryptoJS.HmacSHA256(data, config.key1).toString();

  try {
    const response = await axios.post(config.endpoint, null, { params: order });
    return res.status(200).json({
      message: "Tạo thanh toán thành công",
      response: response.data,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Tạo thanh toán thất bại",
      error: error.response?.data || error.message,
    });
  }
};

export const CallBack = async (req, res) => {
  let result = {};
  const idOrder = req.query.idOrder; // ✅ Lấy id từ query string
  console.log("check  ", idOrder);

  try {
    const dataStr = req.body.data;
    const reqMac = req.body.mac;
    const mac = CryptoJS.HmacSHA256(dataStr, config.key2).toString();

    // ✅ Xác thực callback từ ZaloPay
    if (reqMac !== mac) {
      result.return_code = -1;
      result.return_message = "mac not equal";
    } else {
      const dataJson = JSON.parse(dataStr);

      try {
        const order = await Order.findById(idOrder);

        if (!order) {
          console.log("Không tìm thấy đơn hàng");
        } else if (["completed", "cancelled"].includes(order.status)) {
          console.log("Đơn hàng đã hoàn tất hoặc bị hủy");
        } else {
          order.payment_status = "completed";
          await order.save();
        }

        result.return_code = 1;
        result.return_message = "success";
      } catch (err) {
        console.error("❌ Lỗi khi cập nhật đơn hàng:", err);
        result.return_code = 0;
        result.return_message = "Lỗi cập nhật đơn hàng";
      }
    }
  } catch (ex) {
    console.error("❌ Lỗi callback:", ex);
    result.return_code = 0;
    result.return_message = ex.message;
  }

  // ✅ ZaloPay yêu cầu trả đúng định dạng
  res.json(result);
};
