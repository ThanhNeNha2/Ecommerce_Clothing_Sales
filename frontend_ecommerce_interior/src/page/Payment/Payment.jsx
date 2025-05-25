import React, { useEffect, useState } from "react";
import {
  CreditCard,
  ShieldCheck,
  Lock,
  Calendar,
  User,
  Mail,
  MapPin,
  Building,
  Truck,
  Book,
  Phone,
} from "lucide-react";
import Header from "../../components/Header/Header";
import { notification } from "antd";
import {
  createCodePayment,
  createOrder,
  getPromotionByCode,
} from "../../services/api";
import { useFinalPriceStore } from "../../Custom/Zustand/Store";
import { useNavigate } from "react-router-dom";
import Pay from "../InfoPayment/Pay";

const Payment = () => {
  // Mock data - thay thế bằng dữ liệu thực từ store
  // useFinalPriceStore((state) => state.final_price);
  const [errorVoucher, setErrorVoucher] = React.useState("");
  const [voucher, setVoucher] = React.useState({
    discount_type: "percentage",
    discount_value: 0,
    discount_id: "",
  });
  const [clientSecret, setClientSecret] = useState("");

  const [promotion, setPromotion] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [checkPaymentCard, setCheckPaymentCard] = useState(false);
  const [formData, setFormData] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardHolder: "",
    email: "",
    shipping_address: "",
    city: "",
    zipCode: "",
    phone: "",
    notes: "",
  });
  const navigator = useNavigate();
  const final_price = useFinalPriceStore((state) => state.final_price);
  useEffect(() => {
    if (paymentMethod === "card") {
      const handleCreatePayment = async () => {
        try {
          const res = await createCodePayment();
          console.log("check res code pay ", res);
          setClientSecret(res.clientSecret);
        } catch (error) {
          console.error("Payment creation failed:", error);
        }
      };
      handleCreatePayment();
    }
  }, [paymentMethod]);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  // Tính tổng giá
  const calculateTotal = () => {
    let discount = 0;

    if (voucher.discount_type === "percentage") {
      discount = (final_price * voucher.discount_value) / 100;
    } else if (voucher.discount_type === "fixed") {
      discount = voucher.discount_value;
    }
    const totalAfterDiscount = Math.max(final_price - discount, 0); // tránh giá âm
    return totalAfterDiscount;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const handleSubmit = async () => {
    const final_amount = calculateTotal();
    const res = await createOrder({
      promotion_id: voucher.discount_id,
      ...formData,
      final_amount,
      payment_method: paymentMethod,
    });
    if (res.idCode === 0) {
      notification.success({
        message: "Order successfully",
      });
      navigator("/order");
    } else {
      notification.warning({
        message: "Không thể order vui lòng kiểm tra lại!",
      });
    }
  };

  const handleVoucher = async () => {
    const res = await getPromotionByCode(promotion);

    if (res.idCode === 0) {
      setVoucher({
        discount_type: res.promotion.discount_type,
        discount_value: res.promotion.discount_value,
        discount_id: res.promotion.id,
      });
      setErrorVoucher("");

      notification.success({
        message: "Voucher applied successfully",
      });
    }
    if (res.idCode === 2) {
      setErrorVoucher("Invalid coupon code");
    }
  };
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 py-20 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Thanh Toán
            </h1>
            <p className="text-gray-600">
              Hoàn tất đơn hàng của bạn một cách an toàn
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Payment Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-lg p-6">
                {/* Payment Methods */}
                <div className="mb-8">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">
                    Phương thức thanh toán
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <button
                      onClick={() => setPaymentMethod("card")}
                      className={`p-4 border-2 rounded-lg flex flex-col items-center transition-all ${
                        paymentMethod === "card"
                          ? "border-blue-500 bg-blue-50 text-blue-700"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <CreditCard className="w-6 h-6 mb-2" />
                      <span className="font-medium">Thẻ tín dụng</span>
                    </button>

                    <button
                      onClick={() => setPaymentMethod("wallet")}
                      className={`p-4 border-2 rounded-lg flex flex-col items-center transition-all ${
                        paymentMethod === "wallet"
                          ? "border-blue-500 bg-blue-50 text-blue-700"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className="w-6 h-6 mb-2 bg-orange-500 rounded flex items-center justify-center">
                        <span className="text-white text-xs font-bold">M</span>
                      </div>
                      <span className="font-medium">Ví điện tử</span>
                    </button>

                    <button
                      onClick={() => setPaymentMethod("transfer")}
                      className={`p-4 border-2 rounded-lg flex flex-col items-center transition-all ${
                        paymentMethod === "transfer"
                          ? "border-blue-500 bg-blue-50 text-blue-700"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <Building className="w-6 h-6 mb-2" />
                      <span className="font-medium">Chuyển khoản</span>
                    </button>

                    <button
                      onClick={() => setPaymentMethod("cash")}
                      className={`p-4 border-2 rounded-lg flex flex-col items-center transition-all ${
                        paymentMethod === "cash"
                          ? "border-blue-500 bg-blue-50 text-blue-700"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <Truck className="w-6 h-6 mb-2" />
                      <span className="font-medium">COD</span>
                      <span className="text-xs text-gray-500 mt-1">
                        Thanh toán khi nhận hàng
                      </span>
                    </button>
                  </div>
                </div>

                {/* Payment Form */}
                <div>
                  {paymentMethod === "cash" && (
                    <div className="mb-6">
                      <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
                        <div className="flex items-start">
                          <Truck className="w-6 h-6 text-amber-600 mr-3 mt-1" />
                          <div>
                            <h3 className="text-lg font-semibold text-amber-800 mb-2">
                              Thanh toán khi nhận hàng (COD)
                            </h3>
                            <div className="space-y-2 text-sm text-amber-700">
                              <p>
                                • Bạn sẽ thanh toán bằng tiền mặt khi nhận được
                                hàng
                              </p>
                              <p>• Shipper sẽ thu tiền và đưa hàng cho bạn</p>
                              <p>
                                • Vui lòng chuẩn bị đủ tiền mặt:{" "}
                                <span className="font-semibold">
                                  {formatPrice(final_price)}
                                </span>
                              </p>
                              <p>
                                • Phí COD:{" "}
                                <span className="font-semibold text-green-600">
                                  Miễn phí
                                </span>
                              </p>
                            </div>
                            <div className="mt-4 p-3 bg-white rounded border border-amber-200">
                              <p className="text-sm font-medium text-amber-800">
                                Lưu ý quan trọng:
                              </p>
                              <p className="text-xs text-amber-600 mt-1">
                                Vui lòng kiểm tra kỹ sản phẩm trước khi thanh
                                toán. Sau khi thanh toán, việc đổi trả sẽ tuân
                                theo chính sách của shop.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {paymentMethod === "wallet" && (
                    <div className="mb-6">
                      <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-orange-800 mb-4">
                          Chọn ví điện tử
                        </h3>
                        <div className="grid grid-cols-2 gap-4">
                          <button className="p-4 border-2 border-gray-200 rounded-lg hover:border-orange-300 transition-all">
                            <div className="flex items-center justify-center">
                              <div className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center mr-3">
                                <span className="text-white text-sm font-bold">
                                  M
                                </span>
                              </div>
                              <span>MoMo</span>
                            </div>
                          </button>
                          <button className="p-4 border-2 border-gray-200 rounded-lg hover:border-orange-300 transition-all">
                            <div className="flex items-center justify-center">
                              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mr-3">
                                <span className="text-white text-sm font-bold">
                                  Z
                                </span>
                              </div>
                              <span>ZaloPay</span>
                            </div>
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {paymentMethod === "transfer" && (
                    <div className="mb-6">
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-blue-800 mb-4">
                          Thông tin chuyển khoản
                        </h3>
                        <div className="space-y-3 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Ngân hàng:</span>
                            <span className="font-medium">Vietcombank</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Số tài khoản:</span>
                            <span className="font-medium">1234567890</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">
                              Chủ tài khoản:
                            </span>
                            <span className="font-medium">CÔNG TY ABC</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Số tiền:</span>
                            <span className="font-medium text-red-600">
                              {formatPrice(final_price)}
                            </span>
                          </div>
                          <div className="mt-4 p-3 bg-white rounded border">
                            <p className="text-xs text-gray-600">
                              Nội dung chuyển khoản:{" "}
                              <span className="font-medium">
                                Thanh toan don hang [Mã đơn hàng]
                              </span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {paymentMethod === "card" && (
                    <>
                      {/* <div className="mb-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">
                          Thông tin thẻ
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Số thẻ
                            </label>
                            <div className="relative">
                              <input
                                type="text"
                                name="cardNumber"
                                value={formData.cardNumber}
                                onChange={handleInputChange}
                                placeholder="1234 5678 9012 3456"
                                className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pl-12"
                              />
                              <CreditCard className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
                            </div>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Ngày hết hạn
                            </label>
                            <div className="relative">
                              <input
                                type="text"
                                name="expiryDate"
                                value={formData.expiryDate}
                                onChange={handleInputChange}
                                placeholder="MM/YY"
                                className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pl-12"
                              />
                              <Calendar className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
                            </div>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              CVV
                            </label>
                            <div className="relative">
                              <input
                                type="text"
                                name="cvv"
                                value={formData.cvv}
                                onChange={handleInputChange}
                                placeholder="123"
                                className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pl-12"
                              />
                              <Lock className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
                            </div>
                          </div>

                          <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Tên chủ thẻ
                            </label>
                            <div className="relative">
                              <input
                                type="text"
                                name="cardHolder"
                                value={formData.cardHolder}
                                onChange={handleInputChange}
                                placeholder="NGUYEN VAN A"
                                className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pl-12"
                              />
                              <User className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
                            </div>
                          </div>
                        </div>
                      </div> */}
                    </>
                  )}

                  {/* Billing Information - Only show for card and wallet payments */}
                  {
                    // paymentMethod === "card" ||
                    paymentMethod === "wallet" && (
                      <div className="mb-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">
                          Thông tin thanh toán
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Email
                            </label>
                            <div className="relative">
                              <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                placeholder="your@email.com"
                                className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pl-12"
                              />
                              <Mail className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
                            </div>
                          </div>

                          <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Địa chỉ
                            </label>
                            <div className="relative">
                              <input
                                type="text"
                                name="shipping_address"
                                value={formData.shipping_address}
                                onChange={handleInputChange}
                                placeholder="123 Đường ABC, Quận XYZ"
                                className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pl-12"
                              />
                              <MapPin className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
                            </div>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Thành phố
                            </label>
                            <input
                              type="text"
                              name="city"
                              value={formData.city}
                              onChange={handleInputChange}
                              placeholder="Hồ Chí Minh"
                              className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Mã bưu điện
                            </label>
                            <input
                              type="text"
                              name="zipCode"
                              value={formData.zipCode}
                              onChange={handleInputChange}
                              placeholder="700000"
                              className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                          </div>
                        </div>
                      </div>
                    )
                  }

                  {/* Contact Information - Show for all payment methods */}
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Thông tin liên hệ
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email *
                        </label>
                        <div className="relative">
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="your@email.com"
                            className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pl-12"
                            required
                          />
                          <Mail className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
                        </div>
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Số điện thoại *
                        </label>
                        <div className="relative">
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone || ""}
                            onChange={handleInputChange}
                            placeholder="0901234567"
                            className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 pl-12"
                            required
                          />
                          <Phone className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
                        </div>
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Địa chỉ giao hàng *
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            name="shipping_address"
                            value={formData.shipping_address}
                            onChange={handleInputChange}
                            placeholder="123 Đường ABC, Quận XYZ"
                            className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 pl-12"
                            required
                          />
                          <MapPin className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
                        </div>
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Ghi chú *
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            name="notes"
                            value={formData.notes}
                            onChange={handleInputChange}
                            placeholder="123 Đường ABC, Quận XYZ"
                            className="w-full px-5 py-3  border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 pl-12"
                            required
                          />
                          <Book className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                    <div className="flex items-center">
                      <ShieldCheck className="w-5 h-5 text-green-600 mr-3" />
                      <div>
                        <p className="text-sm font-medium text-green-800">
                          Thanh toán an toàn
                        </p>
                        <p className="text-xs text-green-600 mt-1">
                          Thông tin của bạn được mã hóa và bảo mật với SSL
                          256-bit
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="w-full bg-blue-600 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors shadow-lg"
                  >
                    {paymentMethod === "cash"
                      ? `Xác nhận đặt hàng ${formatPrice(final_price)}`
                      : `Hoàn tất thanh toán ${formatPrice(final_price)}`}
                  </button>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-lg p-6 sticky top-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">
                  Tóm tắt đơn hàng
                </h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-gray-600">
                    <span>Tạm tính</span>
                    <span>{formatPrice(final_price + 50000)}</span>
                  </div>

                  {promotion && (
                    <div className="flex justify-between text-green-600">
                      <span>Giảm giá ({promotion})</span>
                      <span>
                        {voucher.discount_value}{" "}
                        {voucher.discount_type === "percentage" ? "%" : "VNĐ"}
                      </span>
                    </div>
                  )}

                  <div className="flex justify-between text-gray-600">
                    <span>Phí vận chuyển</span>
                    <span className="text-green-600">Miễn phí</span>
                  </div>

                  <hr className="border-gray-200" />

                  <div className="flex justify-between text-lg font-semibold text-gray-900">
                    <span>Tổng cộng</span>
                    <span>{formatPrice(calculateTotal())}</span>
                  </div>
                </div>

                {/* Promotion Code */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mã giảm giá
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Nhập mã giảm giá"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      defaultValue={promotion}
                      onChange={(e) => {
                        setPromotion(e.target.value);
                      }}
                    />
                    <button
                      type="button"
                      className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                      onClick={handleVoucher}
                    >
                      Áp dụng
                    </button>
                  </div>
                </div>

                {/* Trust Badges */}
                <div className="border-t border-gray-200 pt-6">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="flex flex-col items-center">
                      <ShieldCheck className="w-8 h-8 text-green-500 mb-2" />
                      <span className="text-xs text-gray-600">Bảo mật SSL</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <Lock className="w-8 h-8 text-blue-500 mb-2" />
                      <span className="text-xs text-gray-600">
                        Mã hóa 256-bit
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Payment;
