import React, { useEffect, useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { deleteProductToWishlist, getAllWishlist } from "../../services/api";
import { Link } from "react-router-dom";

const ProductFavourite = () => {
  // CHIA TRANG
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Số lượng sản phẩm trên mỗi trang
  const [totalPages, setTotalPages] = useState(1); // Khởi tạo totalPages
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const [wishlist, setWishlist] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  const fetchWishlist = async () => {
    try {
      const response = await getAllWishlist(user._id);
      setWishlist(response.data.wishlist || []); // Đảm bảo wishlist không phải undefined
      // Tính lại totalPages dựa trên độ dài của wishlist
      const newTotalPages = Math.ceil(
        (response.data.wishlist || []).length / itemsPerPage
      );
      setTotalPages(newTotalPages);
      console.log("response", response.data);
    } catch (error) {
      console.error("Error fetching wishlist:", error);
    }
  };
  useEffect(() => {
    if (user && user._id) {
      fetchWishlist();
    }
  }, []);

  // Lấy danh sách sản phẩm hiển thị dựa trên trang hiện tại
  const displayedProducts = wishlist.slice(startIndex, endIndex);
  const HanleDeleteWishlist = async (user_id, productId) => {
    try {
      const response = await deleteProductToWishlist(user_id, productId);
      if (response.idCode === 0) {
        // Cập nhật lại danh sách wishlist sau khi xóa
        await fetchWishlist();
      }
    } catch (error) {
      console.error("Error deleting product from wishlist:", error);
    }
  };
  return (
    <div className="absolute bg-gray-100 top-[40px] left-[-150px] w-[320px] h-[543px] flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-3 mt-2 px-5 h-auto">
          <span className="font-poppins font-medium text-lg">
            Products Favourite
          </span>
          <span>
            <FaRegHeart />
          </span>
        </div>
        <hr />
        <div className="mt-2 flex flex-col justify-between">
          <div>
            {displayedProducts.map((product, i) => (
              <div
                key={i}
                className="flex justify-between items-center px-4 hover:bg-gray-300 py-2 cursor-pointer"
              >
                <div className="w-[80px] h-[70px]">
                  <Link to={`/SingleProduct/${product.product.id}`}>
                    <img
                      src={product.product.image_url[0]}
                      className="w-full h-full object-cover"
                      alt={product.product.nameProduct}
                    />
                  </Link>
                </div>
                <div className="flex flex-col">
                  <Link to={`/SingleProduct/${product.product.id}`}>
                    <span className="font-medium mb-2">
                      {product.product.nameProduct.slice(0, 18) + "..."}
                    </span>
                  </Link>
                  <span className="text-sm font-normal">
                    Price: {product.product.salePrice} $
                  </span>
                </div>

                <div>
                  <span
                    className="text-red-500 cursor-pointer hover:text-red-400"
                    title="Xóa khỏi danh sách"
                    onClick={() => {
                      HanleDeleteWishlist(product.user_id, product.product.id);
                    }}
                  >
                    <FaHeart />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Phần chia trang */}
      <div className="py-3 flex justify-center">
        {Array.from({ length: totalPages }).map((_, index) => (
          <div
            key={index}
            className={`p-1 ${
              currentPage === index + 1
                ? "border border-colorMain rounded-full"
                : ""
            }`}
            onClick={() => setCurrentPage(index + 1)}
          >
            <div
              className={`w-[10px] h-[10px] rounded-full ${
                currentPage === index + 1 ? "bg-colorMain" : "bg-gray-400"
              }`}
            ></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductFavourite;
