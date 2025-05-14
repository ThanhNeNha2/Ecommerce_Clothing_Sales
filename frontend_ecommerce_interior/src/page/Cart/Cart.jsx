import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import CoverImg from "../../components/Cover/CoverImg";
import { FaTrash } from "react-icons/fa";
import Quality from "../../components/Quality/Quality";
import Footer from "../../components/Footer/Footer";
import { cart } from "../../services/fakeApi";
import { deleteCartByUserId, getCartByUserId } from "../../services/api";
import { useMutation, useQuery, useQueryClient } from "react-query";

const Cart = () => {
  const queryClient = useQueryClient();

  // Quản lý giỏ hàng với số lượng
  const [cartItems, setCartItems] = useState(
    cart.map((item) => ({
      ...item,
      quantity: 1, // Khởi tạo số lượng mặc định là 1
    }))
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Tăng số lượng sản phẩm
  const increaseQuantity = (index) => {
    const updatedCart = [...cartItems];
    updatedCart[index].quantity += 1;
    setCartItems(updatedCart);
  };

  // Giảm số lượng sản phẩm
  const decreaseQuantity = (index) => {
    const updatedCart = [...cartItems];
    if (updatedCart[index].quantity > 1) {
      updatedCart[index].quantity -= 1;
      setCartItems(updatedCart);
    }
  };

  // Tính tổng giá
  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.salePrice * item.quantity,
      0
    );
  };

  const user = JSON.parse(localStorage.getItem("user"));

  const {
    data: carts,
    isLoading,
    isError,
    error,
  } = useQuery(
    ["cart", user._id], // key nên chứa user_id để cache phân biệt giữa người dùng
    () => getCartByUserId(user._id).then((res) => res.data.cart), // callback function để fetch
    {
      enabled: !!user?._id, // chỉ chạy khi có user_id
    }
    // callback function để fetch
  );
  // Mutation để xóa
  const deleteMutation = useMutation({
    mutationFn: (id) => deleteCartByUserId(id),
    onSuccess: () => {
      // Sau khi xóa thành công, refetch lại giỏ hàng
      queryClient.invalidateQueries(["cart", user._id]);
    },
    onError: (error) => {
      console.error("Lỗi khi xóa:", error.message);
    },
  });

  // Hàm xử lý xóa
  const handleDelete = async (id) => {
    deleteMutation.mutate(id);
  };

  if (isLoading) return <div>Đang tải giỏ hàng...</div>;
  if (isError) return <div>Lỗi: {error.message}</div>;

  if (isLoading) return <div>Đang tải giỏ hàng...</div>;
  if (isError) return <div>Lỗi: {error.message}</div>;

  return (
    <div className="">
      <Header />
      <CoverImg namePage="Cart" />
      <div className="flex gap-3 h-auto mt-5 px-[130px]">
        <div className="w-[65%]">
          {/* Header giỏ hàng */}
          <div
            className="flex items-center px-5 justify-between py-2 mb-3"
            style={{ background: "#F9F1E7" }}
          >
            <span className="text-lg font-semibold">Shopping Cart</span>
            <p>
              {carts.length} item{carts.length !== 1 ? "s" : ""}
            </p>
          </div>
          {/* Danh sách sản phẩm */}
          {carts.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between px-5 py-3 border-b"
            >
              <div className="w-[100px] h-[100px] rounded">
                <img
                  src={item.product.image_url[0]} // Lấy ảnh đầu tiên
                  alt={item.product.nameProduct}
                  className="w-full h-full object-cover rounded"
                />
              </div>
              <span className="w-[200px] font-medium">
                {item.product.nameProduct.length > 30
                  ? item.product.nameProduct.substring(0, 30) + "..."
                  : item.product.nameProduct}
              </span>
              <span>${item.product.salePrice}</span>
              <div className="flex items-center">
                <button
                  className="border border-gray-400 px-3 py-[2px] rounded-l"
                  onClick={() => decreaseQuantity(index)}
                >
                  -
                </button>
                <span className="border border-gray-400 px-3 py-[2px]">
                  {item.quantity}
                </span>
                <button
                  className="border border-gray-400 px-3 py-[2px] rounded-r"
                  onClick={() => increaseQuantity(index)}
                >
                  +
                </button>
              </div>
              <span>${item.product.salePrice * item.quantity}</span>
              <button
                onClick={() => {
                  handleDelete(item.id);
                }}
              >
                <FaTrash className="text-red-500" />
              </button>
            </div>
          ))}
        </div>
        <div
          className="flex-1 flex flex-col gap-3 items-center justify-center w-full h-[300px]"
          style={{ background: "#F9F1E7" }}
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
              <p className="text-[15px] text-colorMain">
                ${calculateTotal().toFixed(2)}
              </p>
            </div>
            <div className="flex items-center justify-center">
              <button className="px-5 bg-colorMain text-white font-medium hover:opacity-85 rounded py-2">
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
