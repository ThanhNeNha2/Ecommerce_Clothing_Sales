import Payment from "../models/Payment.model";

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
