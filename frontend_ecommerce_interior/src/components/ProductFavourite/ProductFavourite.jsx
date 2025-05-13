import React, { useEffect, useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { deleteProductToWishlist, getAllWishlist } from "../../services/api";

const ProductFavourite = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [totalPages, setTotalPages] = useState(1);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const [wishlist, setWishlist] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  const fetchWishlist = async () => {
    try {
      const response = await getAllWishlist(user._id);
      const wishlistData = response.data.wishlist || [];
      setWishlist(wishlistData);
      const newTotalPages = Math.ceil(wishlistData.length / itemsPerPage);
      setTotalPages(newTotalPages);
      console.log("Wishlist fetched:", wishlistData);
    } catch (error) {
      console.error("Error fetching wishlist:", error);
    }
  };

  useEffect(() => {
    if (user && user._id) {
      fetchWishlist();
    }
  }, [user]); // Add user as dependency to handle changes

  const handleDeleteWishlist = async (user_id, productId) => {
    try {
      const response = await deleteProductToWishlist(user_id, productId);
      if (response.idCode === 0) {
        // Optimistically update the wishlist state
        setWishlist((prevWishlist) =>
          prevWishlist.filter((item) => item.product.id !== productId)
        );
        // Recalculate total pages
        const newTotalPages = Math.ceil((wishlist.length - 1) / itemsPerPage);
        setTotalPages(newTotalPages);

        // Fetch the latest wishlist to ensure sync with backend
        await fetchWishlist();
      }
    } catch (error) {
      console.error("Error deleting product from wishlist:", error);
      // Optionally revert optimistic update or show error to user
    }
  };

  const displayedProducts = wishlist.slice(startIndex, endIndex);

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
                key={product.product.id} // Use unique product ID
                className="flex justify-between items-center px-4 hover:bg-gray-300 py-2 cursor-pointer"
              >
                <div className="w-[70px] h-[70px]">
                  <img
                    src={product.product.image_url[0]}
                    className="w-full h-full object-cover"
                    alt={product.product.nameProduct}
                  />
                </div>
                <div className="flex flex-col">
                  <span className="font-medium mb-2">
                    {product.product.nameProduct.slice(0, 18) + "..."}
                  </span>
                  <span className="text-sm font-normal">
                    Price: {product.product.salePrice} $
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
            ))}
          </div>
        </div>
      </div>

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
