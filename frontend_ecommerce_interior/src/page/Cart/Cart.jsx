import React, { useEffect } from "react";
import Header from "../../components/Header/Header";
import CoverImg from "../../components/Cover/CoverImg";
import { FaTrash } from "react-icons/fa";
import Quality from "../../components/Quality/Quality";
import Footer from "../../components/Footer/Footer";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  deleteCartByUserId,
  getCartByUserId,
  getPromotionByCode,
  updateQuantityCart,
} from "../../services/api";
import { Link, useNavigate } from "react-router-dom";
import { notification } from "antd";
import {
  useFinalPriceStore,
  usePromotionStore,
} from "../../Custom/Zustand/Store";

const Cart = () => {
  const queryClient = useQueryClient();
  const user = JSON.parse(localStorage.getItem("user"));
  const [voucher, setVoucher] = React.useState({
    discount_type: "percentage",
    discount_value: 0,
  });
  const [errorVoucher, setErrorVoucher] = React.useState("");
  const setFinalPrice = useFinalPriceStore((state) => state.setFinalPrice);
  const setPromotion_id = usePromotionStore((state) => state.setPromotion_id);

  const navigator = useNavigate();
  // Lấy dữ liệu giỏ hàng từ API
  const {
    data: carts = [],
    isLoading,
    isError,
    error,
  } = useQuery(
    ["cart", user?._id],
    () => getCartByUserId(user._id).then((res) => res.data.cart),
    {
      enabled: !!user?._id,
    }
  );

  // Mutation để xóa sản phẩm
  const deleteMutation = useMutation({
    mutationFn: (id) => deleteCartByUserId(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["cart", user._id]);
    },
    onError: (error) => {
      console.error("Lỗi khi xóa:", error.message);
    },
  });

  // Mutation để cập nhật số lượng
  const updateMutation = useMutation({
    mutationFn: ({ id, quantity }) => updateQuantityCart(id, quantity),
    onSuccess: () => {
      queryClient.invalidateQueries(["cart", user._id]);
    },
    onError: (error) => {
      console.error("Lỗi khi cập nhật số lượng:", error.message);
    },
  });

  // Tăng số lượng
  const increaseQuantity = (id, currentQuantity) => {
    updateMutation.mutate({ id, quantity: currentQuantity + 1 });
  };

  // Giảm số lượng
  const decreaseQuantity = (id, currentQuantity) => {
    if (currentQuantity > 1) {
      updateMutation.mutate({ id, quantity: currentQuantity - 1 });
    }
  };

  const subtotal = carts.reduce(
    (total, item) => total + item.product.salePrice * item.quantity,
    0
  );

  // Tính tổng giá
  const calculateTotal = () => {
    const subtotal = carts.reduce(
      (total, item) => total + item.product.salePrice * item.quantity,
      0
    );

    let discount = 0;

    if (voucher.discount_type === "percentage") {
      discount = (subtotal * voucher.discount_value) / 100;
    } else if (voucher.discount_type === "fixed") {
      discount = voucher.discount_value;
    }

    const totalAfterDiscount = Math.max(subtotal - discount, 0); // tránh giá âm

    return totalAfterDiscount;
  };

  // Cuộn lên đầu trang
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Xử lý xóa sản phẩm
  const handleDelete = (id) => {
    deleteMutation.mutate(id);
  };

  if (isLoading)
    return <div className="text-center py-10">Đang tải giỏ hàng...</div>;
  if (isError)
    return (
      <div className="text-center py-10 text-red-500">Lỗi: {error.message}</div>
    );
  const handleVoucherBlur = async (e) => {
    const code = e.target.value;
    const res = await getPromotionByCode(code);
    console.log("check res.promotion.id", res.promotion.id);

    if (res.idCode === 0) {
      setVoucher({
        discount_type: res.promotion.discount_type,
        discount_value: res.promotion.discount_value,
      });
      setErrorVoucher("");
      await setPromotion_id(res.promotion.id);

      notification.success({
        message: "Voucher applied successfully",
      });
    }
    if (res.idCode === 2) {
      setErrorVoucher("Invalid coupon code");
    }
  };
  const handleCheckout = async () => {
    await setFinalPrice(calculateTotal().toFixed(2));

    navigator("/payment", {
      state: { final_price: calculateTotal().toFixed(2) },
    });
  };
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <CoverImg namePage="Giỏ hàng" />
      <div className="flex gap-6 h-auto mt-8 px-[130px] py-10">
        <div className="w-[65%]">
          {/* Header giỏ hàng */}
          <div
            className="flex items-center px-6 justify-between py-3 mb-4 rounded-lg shadow-sm"
            style={{
              background: "linear-gradient(135deg, #FFF7ED 0%, #F9F1E7 100%)",
            }}
          >
            <span className="text-xl font-poppins font-semibold text-gray-800">
              Giỏ hàng
            </span>
            <p className="text-gray-600">
              {carts.length} sản phẩm {carts.length !== 1 ? "s" : ""}
            </p>
          </div>
          {/* Danh sách sản phẩm */}
          {carts.length === 0 ? (
            <div className="text-center py-10 text-gray-500">
              Giỏ hàng của bạn đang trống.
            </div>
          ) : (
            carts.map((item, index) => (
              <div
                key={item.id}
                className="flex items-center gap-4 px-6 py-5 border-b border-gray-100 hover:bg-gray-50 transition-all duration-200 group"
              >
                {/* Product Image */}
                <div className="w-20 h-20 rounded-xl overflow-hidden shadow-sm group-hover:shadow-md transition-shadow">
                  <img
                    src={item.product.image_url[0]}
                    alt={item.product.nameProduct}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Product Info */}
                <div className="flex-1 min-w-0">
                  <Link to={`/SingleProduct/${item.product.id}`}>
                    <h3
                      className="font-poppins font-semibold text-gray-800 hover:text-blue-500 cursor-pointer transition-colors text-sm md:text-base leading-tight mb-1"
                      title={item.product.nameProduct}
                    >
                      {item.product.nameProduct.length > 35
                        ? item.product.nameProduct.substring(0, 35) + "..."
                        : item.product.nameProduct}
                    </h3>
                  </Link>
                  <div className="flex items-center gap-3 text-sm text-gray-500">
                    <span className="bg-gray-100 px-2 py-1 rounded-md text-xs font-medium">
                      Size: {item.size.name}
                    </span>
                    <span className="font-medium text-gray-700">
                      {item.product.salePrice.toLocaleString("vi-VN")} VNĐ
                    </span>
                  </div>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
                  <button
                    className="px-3 py-2 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-gray-600 hover:text-gray-800"
                    onClick={() => decreaseQuantity(item.id, item.quantity)}
                    disabled={item.quantity <= 1}
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M20 12H4"
                      />
                    </svg>
                  </button>
                  <span className="px-4 py-2 text-gray-700 font-medium min-w-[3rem] text-center border-x border-gray-200">
                    {item.quantity}
                  </span>
                  <button
                    className="px-3 py-2 hover:bg-gray-50 transition-colors text-gray-600 hover:text-gray-800"
                    onClick={() => increaseQuantity(item.id, item.quantity)}
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                  </button>
                </div>

                {/* Total Price */}
                <div className="text-right min-w-[80px]">
                  <span className="font-bold text-lg text-gray-900">
                    {(item.product.salePrice * item.quantity).toLocaleString(
                      "vi-VN"
                    )}{" "}
                    VNĐ
                  </span>
                </div>

                {/* Delete Button */}
                <button
                  onClick={() => handleDelete(item.id)}
                  className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all duration-200 group/delete"
                  title="Remove item"
                >
                  <FaTrash className="w-4 h-4 group-hover/delete:scale-110 transition-transform" />
                </button>
              </div>
            ))
          )}
        </div>
        {/* Cart Totals */}
        <div
          className="flex-1 flex flex-col gap-3 items-center justify-center w-full h-[350px]"
          style={{
            background: "linear-gradient(135deg, #FFF7ED 0%, #F9F1E7 100%)",
          }}
        >
          <span className="font-poppins font-semibold text-[22px]">
            Tổng số tiền
          </span>
          <div className="border border-gray-300 w-[400px]"></div>
          <div className="flex flex-col gap-3 w-[400px] px-4 ">
            <div className="flex flex-col gap-3 w-[400px] ">
              {/* Subtotal */}
              <div className="flex gap-3">
                <span className="min-w-[100px] text-left">Tổng cộng</span>
                <p className="text-[15px] text-gray-400 text-left">
                  {subtotal.toLocaleString("vi-VN")} VNĐ
                </p>
              </div>

              {/* Voucher */}
              {/* <div className="flex gap-3 items-start">
                <span className="min-w-[100px] text-left pt-2">Voucher</span>
                <div className="flex flex-col w-[250px]">
                  <input
                    type="text"
                    className="py-1 px-2 border border-gray-300 rounded-md text-left"
                    placeholder="Enter the discount code."
                    onBlur={handleVoucherBlur}
                  />
                  {errorVoucher && (
                    <p className="text-red-500 text-sm mt-1">{errorVoucher}</p>
                  )}
                </div>
              </div> */}

              {/* Sale */}
              <div className="flex gap-3">
                <span className="min-w-[100px] text-left">Giảm giá</span>
                <p className="text-[15px] text-gray-400 text-left">
                  {voucher.discount_value}
                  {voucher.discount_type === "percentage"
                    ? "%"
                    : voucher.discount_type === "fixed"
                    ? "VNĐ"
                    : ""}
                </p>
              </div>

              {/* Total */}
              <div className="flex gap-3">
                <span className="min-w-[100px] text-left">Giá cuối cùng</span>
                <p className="text-[15px] text-colorMain font-medium text-left">
                  {calculateTotal().toLocaleString("vi-VN")} VNĐ
                </p>
              </div>
            </div>
            <div className="flex items-center justify-center pt-2">
              <button
                disabled={carts.length === 0}
                className={`px-5 bg-colorMain text-white font-medium hover:opacity-85 rounded py-2 ${
                  carts.length === 0 ? "cursor-not-allowed" : "cursor-pointer"
                }  `}
                onClick={() => {
                  handleCheckout();
                }}
              >
                Thanh toán
              </button>
            </div>
          </div>
        </div>
      </div>
      <Quality />
      <Footer />
    </div>
  );
};

export default Cart;
