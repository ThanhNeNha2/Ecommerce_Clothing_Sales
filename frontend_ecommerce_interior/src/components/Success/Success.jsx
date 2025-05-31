import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  completeOrderByPaymentIntent,
  getPaymentByIntent,
} from "../../services/api";

const Success = () => {
  const [searchParams] = useSearchParams();
  const [InfoPayment, setInfoPayment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const clientSecret = searchParams.get("payment_intent");

  // Format price to Vietnamese currency
  const formatPrice = (price) => {
    if (!price) return "0";
    return new Intl.NumberFormat("vi-VN").format(price);
  };

  // Format date to Vietnamese format
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleString("vi-VN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const fetchInfoPayment = async (clientSecret) => {
    try {
      setLoading(true);
      setError(null);
      const res = await getPaymentByIntent(clientSecret);
      setInfoPayment(res.payment);
    } catch (err) {
      console.error("Error fetching payment info:", err);
      setError("Không thể tải thông tin thanh toán");
    } finally {
      setLoading(false);
    }
  };

  const updateStatusPayment = async (clientSecret) => {
    try {
      setLoading(true);
      setError(null);
      const res = await completeOrderByPaymentIntent(clientSecret);
      console.log(" check completeOrderByPaymentIntent", res);
    } catch (err) {
      console.error("Error completeOrderByPaymentIntent:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (clientSecret) {
      fetchInfoPayment(clientSecret);
      updateStatusPayment(clientSecret);
    } else {
      setError("Không tìm thấy thông tin thanh toán");
      setLoading(false);
    }
  }, [clientSecret]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-lg w-full border border-gray-100">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Đang tải thông tin thanh toán...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-lg w-full border border-gray-100">
          <div className="text-center">
            <div className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-10 h-10 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              Có lỗi xảy ra
            </h1>
            <p className="text-red-600 mb-6">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200"
            >
              Thử lại
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-lg w-full border border-gray-100">
        {/* Success Animation Icon */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-green-500 rounded-full flex items-center justify-center shadow-lg">
              <svg
                className="w-10 h-10 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            {/* Decorative ring */}
            <div className="absolute -inset-2 border-2 border-green-200 rounded-full animate-pulse"></div>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-2">
          Thanh toán thành công!
        </h1>

        {/* Subtitle */}
        <p className="text-lg text-green-600 font-medium text-center mb-6">
          Đơn hàng của bạn đã được xử lý
        </p>

        {/* Order Details */}
        <div className="bg-gray-50 rounded-xl p-6 mb-6">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Mã đơn hàng:</span>
              <span className="font-semibold text-gray-800">
                {InfoPayment?.OrderCode || "N/A"}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Tổng tiền:</span>
              <span className="font-bold text-xl text-green-600">
                {formatPrice(InfoPayment?.price)} VNĐ
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Phương thức:</span>
              <span className="font-medium text-gray-800">
                {InfoPayment?.paymentMethod || "Thẻ tín dụng"}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Thời gian:</span>
              <span className="font-medium text-gray-800">
                {formatDate(InfoPayment?.createdAt) || "N/A"}
              </span>
            </div>
            {InfoPayment?.status && (
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Trạng thái:</span>
                <span className="font-medium text-green-600 capitalize">
                  {InfoPayment.status}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Message */}
        <div className="text-center mb-8">
          <p className="text-gray-600 leading-relaxed">
            Cảm ơn bạn đã mua sắm! Chúng tôi sẽ gửi email xác nhận và thông tin
            vận chuyển đến địa chỉ email của bạn trong vài phút tới.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => {
              // Add your track order logic here
              window.location.href = "/order";
            }}
            className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 shadow-lg"
          >
            Theo dõi đơn hàng
          </button>
          <button
            onClick={() => {
              // Add your continue shopping logic here
              window.location.href = "/";
            }}
            className="flex-1 bg-white hover:bg-gray-50 text-gray-700 font-semibold py-4 px-6 rounded-xl border-2 border-gray-200 hover:border-gray-300 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-opacity-50"
          >
            Tiếp tục mua sắm
          </button>
        </div>

        {/* Footer Note */}
        <div className="mt-6 pt-4 border-t border-gray-100">
          <p className="text-sm text-gray-500 text-center">
            Nếu có thắc mắc, vui lòng liên hệ{" "}
            <span
              onClick={() => {
                // Add your support contact logic here
                console.log("Support contact clicked");
              }}
              className="text-green-600 font-medium cursor-pointer hover:underline"
            >
              hỗ trợ khách hàng
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Success;
