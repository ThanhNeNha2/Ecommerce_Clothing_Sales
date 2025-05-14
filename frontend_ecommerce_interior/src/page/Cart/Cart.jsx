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
  updateQuantityCart,
} from "../../services/api";
import { Link } from "react-router-dom";

const Cart = () => {
  const queryClient = useQueryClient();
  const user = JSON.parse(localStorage.getItem("user"));

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

  // Tính tổng giá
  const calculateTotal = () => {
    return carts.reduce(
      (total, item) => total + item.product.salePrice * item.quantity,
      0
    );
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

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <CoverImg namePage="Cart" />
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
              Shopping Cart
            </span>
            <p className="text-gray-600">
              {carts.length} item{carts.length !== 1 ? "s" : ""}
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
                className="flex items-center justify-between px-6 py-4 border-b border-gray-200 hover:bg-gray-50 transition"
              >
                <div className="w-[100px] h-[100px] rounded-lg overflow-hidden">
                  <img
                    src={item.product.image_url[0]}
                    alt={item.product.nameProduct}
                    className="w-full h-full object-cover"
                  />
                </div>
                <Link to={`/SingleProduct/${item.product.id}`}>
                  <span
                    className="block w-[200px] font-poppins font-medium text-gray-700 hover:text-blue-400 cursor-pointer   "
                    title={item.product.nameProduct}
                  >
                    {item.product.nameProduct.length > 30
                      ? item.product.nameProduct.substring(0, 30) + "..."
                      : item.product.nameProduct}
                  </span>
                </Link>
                <span className="text-gray-600">
                  ${item.product.salePrice.toFixed(2)}
                </span>
                <div className="flex items-center gap-1">
                  <button
                    className="border border-gray-300 px-3 py-1 rounded-l hover:bg-gray-200 transition"
                    onClick={() => decreaseQuantity(item.id, item.quantity)}
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  <span className="border border-gray-300 px-4 py-1 text-gray-700">
                    {item.quantity}
                  </span>
                  <button
                    className="border border-gray-300 px-3 py-1 rounded-r hover:bg-gray-200 transition"
                    onClick={() => increaseQuantity(item.id, item.quantity)}
                  >
                    +
                  </button>
                </div>
                <span className="font-medium text-gray-800">
                  ${(item.product.salePrice * item.quantity).toFixed(2)}
                </span>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="text-red-500 hover:text-red-700 transition"
                >
                  <FaTrash />
                </button>
              </div>
            ))
          )}
        </div>
        {/* Cart Totals */}
        <div
          className="flex-1 flex flex-col gap-3 items-center justify-center w-full h-[300px]"
          style={{
            background: "linear-gradient(135deg, #FFF7ED 0%, #F9F1E7 100%)",
          }}
        >
          <span className="font-poppins font-semibold text-[22px]">
            Cart Totals
          </span>
          <div className="border border-gray-300 w-[400px]"></div>
          <div className="flex flex-col gap-3">
            <div className="flex gap-5">
              <span>Subtotal</span>
              <p className="text-[15px] text-gray-400">
                ${calculateTotal().toFixed(2)}
              </p>
            </div>
            <div className="flex gap-5">
              <span>Sale</span>
              <p className="text-[15px] text-gray-400">0%</p>
            </div>
            <div className="flex gap-5">
              <span>Total</span>
              <p className="text-[15px] text-colorMain font-medium">
                ${calculateTotal().toFixed(2)}
              </p>
            </div>
            <div className="flex items-center justify-center">
              <button
                disabled={carts.length === 0}
                className="px-5 bg-colorMain text-white font-medium hover:opacity-85 rounded py-2"
              >
                Check Out
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
