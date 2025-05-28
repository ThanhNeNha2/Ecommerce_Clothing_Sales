import mongoose from "mongoose";

// Logic tính doanh thu theo tháng
export const getMonthlyRevenueHandler = async (req, res) => {
  try {
    const year = parseInt(req.query.year);
    const month = parseInt(req.query.month);

    if (
      !Number.isInteger(year) ||
      !Number.isInteger(month) ||
      month < 1 ||
      month > 12
    ) {
      return res
        .status(400)
        .json({ message: "Tham số năm hoặc tháng không hợp lệ" });
    }

    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 1);

    const result = await mongoose.model("Order").aggregate([
      {
        $match: {
          createdAt: { $gte: startDate, $lt: endDate },
          status: "completed",
        },
      },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$final_amount" },
        },
      },
    ]);

    return res.status(200).json({
      totalRevenue: result.length > 0 ? result[0].totalRevenue : 0,
    });
  } catch (error) {
    console.error("Lỗi khi lấy doanh thu theo tháng:", error.message);
    return res.status(500).json({ message: "Không thể tính doanh thu" });
  }
};

// Logic tính doanh thu theo sản phẩm
export const getProductRevenueHandler = async (req, res) => {
  try {
    let { startDate, endDate } = req.query;

    startDate = new Date(startDate);
    endDate = new Date(endDate);

    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      return res.status(400).json({ message: "Ngày không hợp lệ" });
    }

    if (startDate > endDate) {
      return res
        .status(400)
        .json({ message: "Ngày bắt đầu phải nhỏ hơn hoặc bằng ngày kết thúc" });
    }

    const result = await mongoose.model("Order").aggregate([
      {
        $match: {
          createdAt: { $gte: startDate, $lte: endDate },
          status: "completed",
        },
      },
      { $unwind: "$order_items" },
      {
        $group: {
          _id: "$order_items.product_id",
          totalRevenue: {
            $sum: {
              $multiply: ["$order_items.quantity", "$order_items.price"],
            },
          },
          totalQuantity: { $sum: "$order_items.quantity" },
        },
      },
      {
        $lookup: {
          from: "products",
          localField: "_id",
          foreignField: "_id",
          as: "product",
        },
      },
      { $unwind: "$product" },
      {
        $project: {
          productName: "$product.name",
          totalRevenue: 1,
          totalQuantity: 1,
        },
      },
    ]);

    return res.status(200).json(result);
  } catch (error) {
    console.error("Lỗi khi lấy doanh thu theo sản phẩm:", error.message);
    return res
      .status(500)
      .json({ message: "Không thể lấy doanh thu theo sản phẩm" });
  }
};
