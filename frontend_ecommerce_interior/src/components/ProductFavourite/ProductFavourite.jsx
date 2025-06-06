import React from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { deleteProductToWishlist, getAllWishlist } from "../../services/api";
import { Link } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "react-query";

const ProductFavourite = () => {
  const queryClient = useQueryClient();
  const user = JSON.parse(localStorage.getItem("user"));
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = React.useState(1);

  // Lấy danh sách wishlist từ API
  const {
    data: wishlist = [],
    isLoading,
    isError,
    error,
  } = useQuery(
    ["wishlist", user?._id],
    () => getAllWishlist(user._id).then((res) => res.data.wishlist || []),
    {
      enabled: !!user?._id,
      staleTime: 5 * 60 * 1000, // Dữ liệu giữ trong 5 phút trước khi refetch
    }
  );

  // Mutation để xóa sản phẩm khỏi wishlist
  const deleteMutation = useMutation({
    mutationFn: ({ user_id, productId }) =>
      deleteProductToWishlist(user_id, productId),
    onSuccess: () => {
      queryClient.invalidateQueries(["wishlist", user?._id]);
    },
    onError: (error) => {
      console.error("Error deleting product from wishlist:", error);
    },
  });

  // Tính toán phân trang
  const totalPages = Math.ceil((wishlist || []).length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedProducts = wishlist.slice(startIndex, endIndex);

  // Xử lý xóa sản phẩm
  const handleDeleteWishlist = (user_id, productId) => {
    deleteMutation.mutate({ user_id, productId });
  };

  if (isLoading)
    return (
      <div className="text-center py-4">Đang tải danh sách yêu thích...</div>
    );
  if (isError)
    return (
      <div className="text-center py-4 text-red-500">Lỗi: {error.message}</div>
    );

  return (
    <div className="absolute bg-gray-100 top-[40px] left-[-150px] w-[320px] h-[543px] flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-3 mt-2 px-5 h-auto">
          <span className="font-poppins font-medium text-lg">
            Sản phẩm yêu thích
          </span>
          <span>
            <FaRegHeart />
          </span>
        </div>
        <hr />
        <div className="mt-2 flex flex-col justify-between">
          <div>
            {displayedProducts.length === 0 ? (
              <div className="text-center py-4 text-gray-500">
                Không có sản phẩm yêu thích.
              </div>
            ) : (
              displayedProducts.map((product, i) => (
                <div
                  key={product.product.id} // Sử dụng product.id thay vì index
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
                      Price: {product.product.salePrice.toLocaleString("vi-VN")}{" "}
                      VNĐ
                    </span>
                  </div>
                  <div>
                    <span
                      className="text-red-500 cursor-pointer hover:text-red-400"
                      title="Xóa khỏi danh sách"
                      onClick={() =>
                        handleDeleteWishlist(user._id, product.product.id)
                      }
                    >
                      <FaHeart />
                    </span>
                  </div>
                </div>
              ))
            )}
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
