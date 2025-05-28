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
