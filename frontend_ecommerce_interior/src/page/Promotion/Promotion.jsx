import React, { useEffect, useState } from "react";
import {
  Clock,
  Calendar,
  Percent,
  DollarSign,
  Tag,
  Gift,
  Star,
  Sparkles,
} from "lucide-react";
import Header from "../../components/Header/Header";
import { getAllPromotion } from "../../services/api";
import { notification } from "antd";

const Promotion = () => {
  const [promotions, setPromotions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Giả lập API call với mock data
        const res = await getAllPromotion();
        // const res = { promotions: mockPromotions }; // Sử dụng mock data
        // console.log("API Response:", res.promotions);
        setPromotions(res.promotions);
        setLoading(false);
      } catch (err) {
        setError("Lỗi khi tải dữ liệu khuyến mãi.");
        console.error(err);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const toDateOnly = (date) => date.toISOString().split("T")[0];

  const getCategoryIcon = (category) => {
    switch (category) {
      case "seasonal":
        return <Sparkles className="w-5 h-5" />;
      case "new-customer":
        return <Star className="w-5 h-5" />;
      case "flash-sale":
        return <Gift className="w-5 h-5" />;
      default:
        return <Tag className="w-5 h-5" />;
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case "seasonal":
        return "from-purple-500 to-pink-500";
      case "new-customer":
        return "from-blue-500 to-cyan-500";
      case "flash-sale":
        return "from-orange-500 to-red-500";
      default:
        return "from-purple-500 to-pink-500";
    }
  };

  const filteredPromotions = promotions.filter((promo) => {
    if (filter === "all") return true;
    if (filter === "active") {
      const currentDate = toDateOnly(new Date());
      const start_date = toDateOnly(new Date(promo.start_date));
      const end_date = toDateOnly(new Date(promo.end_date));
      return currentDate >= start_date && currentDate <= end_date;
    }
    if (filter === "expired") {
      const currentDate = toDateOnly(new Date());
      const end_date = toDateOnly(new Date(promo.end_date));
      return end_date < currentDate;
    }
    return true;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-pink-500 border-t-transparent mx-auto mb-4"></div>
            <p className="text-gray-600 text-lg">Đang tải khuyến mãi...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-2xl shadow-lg">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <p className="text-red-600 text-lg">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
      <Header />

      {/* Header Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 text-white pt-16">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-6 py-20">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-4 tracking-tight">
              🎉 Khuyến Mãi Đặc Biệt
            </h1>
            <p className="text-xl opacity-90 max-w-2xl mx-auto leading-relaxed">
              Khám phá những ưu đãi tuyệt vời cho bộ sưu tập thời trang mới nhất
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-t from-pink-50 to-transparent"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Filter Tabs */}
        <div className="flex justify-center mb-12">
          <div className="bg-white rounded-2xl p-2 shadow-lg inline-flex">
            {[
              { key: "all", label: "Tất cả", icon: "🎯" },
              { key: "active", label: "Đang hoạt động", icon: "✨" },
              { key: "expired", label: "Hết hạn", icon: "⏰" },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setFilter(tab.key)}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 flex items-center gap-2 ${
                  filter === tab.key
                    ? "bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg transform scale-105"
                    : "text-gray-600 hover:text-pink-500 hover:bg-pink-50"
                }`}
              >
                <span>{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Promotions Grid */}
        {filteredPromotions.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-8xl mb-6">🛍️</div>
            <h3 className="text-2xl font-semibold text-gray-700 mb-2">
              Không có khuyến mãi nào
            </h3>
            <p className="text-gray-500">
              Hãy quay lại sau để không bỏ lỡ ưu đãi tuyệt vời!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPromotions.map((promo, index) => {
              const currentDate = toDateOnly(new Date());
              const start_date = toDateOnly(new Date(promo.start_date));
              const end_date = toDateOnly(new Date(promo.end_date));

              const isExpired = end_date < currentDate;
              const isNotStarted = currentDate < start_date;
              const isActive = !isExpired && !isNotStarted;

              const DiscountIcon =
                promo.discount_type === "percentage" ? Percent : DollarSign;
              const usagePercentage = promo.maxUses
                ? (promo.usedCount / promo.maxUses) * 100
                : 0;

              return (
                <div
                  key={index}
                  className={`group relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden ${
                    isExpired ? "opacity-75" : ""
                  }`}
                >
                  {/* Gradient Header */}
                  <div
                    className={`h-32 bg-gradient-to-r ${getCategoryColor(
                      promo.category
                    )} relative overflow-hidden`}
                  >
                    <div className="absolute inset-0 bg-black opacity-20"></div>
                    <div className="absolute top-4 left-4 flex items-center gap-2 text-white">
                      {getCategoryIcon(promo.category)}
                      <span className="text-sm font-medium">
                        {promo.category === "seasonal" && "Theo mùa"}
                        {promo.category === "new-customer" && "Khách mới"}
                        {promo.category === "flash-sale" && "Flash Sale"}
                        {!["seasonal", "new-customer", "flash-sale"].includes(
                          promo.category
                        ) && "Khuyến mãi"}
                      </span>
                    </div>
                    <div className="absolute top-4 right-4">
                      <div
                        className={`px-3 py-1 rounded-full text-xs font-bold ${
                          isActive
                            ? "bg-green-500 text-white"
                            : isExpired
                            ? "bg-red-500 text-white"
                            : "bg-yellow-500 text-white"
                        }`}
                      >
                        {isActive
                          ? "🟢 HOẠT ĐỘNG"
                          : isExpired
                          ? "🔴 HẾT HẠN"
                          : "🟡 SẮP TỚI"}
                      </div>
                    </div>

                    {/* Discount Value Display */}
                    <div className="absolute bottom-4 left-4 text-white">
                      <div className="flex items-baseline gap-1">
                        <span className="text-4xl font-bold">
                          {promo.discount_value}
                        </span>
                        <span className="text-xl">
                          {promo.discount_type === "percentage" ? "%" : "VNĐ"}
                        </span>
                      </div>
                      <div className="text-sm opacity-90">GIẢM GIÁ</div>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6">
                    {/* Promo Code */}
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-xl font-bold text-gray-800 group-hover:text-pink-600 transition-colors">
                          {promo.code}
                        </h3>
                        <button
                          onClick={() =>
                            navigator.clipboard.writeText(promo.code)
                          }
                          className="bg-pink-100 hover:bg-pink-200 text-pink-600 px-3 py-1 rounded-lg text-sm font-medium transition-colors"
                        >
                          📋 Copy
                        </button>
                      </div>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {promo.description || "Không có mô tả"}
                      </p>
                    </div>

                    {/* Usage Progress */}
                    {promo.maxUses && (
                      <div className="mb-4">
                        <div className="flex justify-between text-sm text-gray-600 mb-2">
                          <span>Đã sử dụng</span>
                          <span>
                            {promo.usedCount}/{promo.maxUses}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full transition-all duration-500 ${
                              usagePercentage >= 80
                                ? "bg-red-500"
                                : usagePercentage >= 50
                                ? "bg-yellow-500"
                                : "bg-green-500"
                            }`}
                            style={{
                              width: `${Math.min(usagePercentage, 100)}%`,
                            }}
                          ></div>
                        </div>
                      </div>
                    )}

                    {/* Date Information */}
                    <div className="border-t border-gray-100 pt-4">
                      <div className="grid grid-cols-2 gap-4 text-xs text-gray-500">
                        <div className="flex items-center gap-2">
                          <Calendar size={14} className="text-green-500" />
                          <div>
                            <div className="font-medium">Bắt đầu</div>
                            <div>{formatDate(promo.start_date)}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock size={14} className="text-red-500" />
                          <div>
                            <div className="font-medium">Kết thúc</div>
                            <div>{formatDate(promo.end_date)}</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Action Button */}
                    <div className="mt-6 pt-4 border-t border-gray-100">
                      <button
                        disabled={isExpired}
                        onClick={() => {
                          if (!isExpired) {
                            navigator.clipboard.writeText(promo.code);
                            notification.success({
                              message: "🎉 Sao chép thành công!",
                              description:
                                "Dán mã khi thanh toán để được giảm giá nhé!",
                              placement: "topRight",
                            });
                          }
                        }}
                        className={`w-full py-3 rounded-xl font-medium transition-all duration-300 ${
                          isExpired
                            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                            : "bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:from-pink-600 hover:to-purple-600 transform hover:scale-105 shadow-lg hover:shadow-xl"
                        }`}
                      >
                        {isExpired ? "Đã hết hạn" : "🛒 Áp dụng ngay"}
                      </button>
                    </div>
                  </div>

                  {/* Decorative Elements */}
                  <div className="absolute top-0 right-0 w-20 h-20 bg-white opacity-10 rounded-full -translate-y-10 translate-x-10"></div>
                  <div className="absolute bottom-0 left-0 w-16 h-16 bg-white opacity-5 rounded-full translate-y-8 -translate-x-8"></div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Promotion;
