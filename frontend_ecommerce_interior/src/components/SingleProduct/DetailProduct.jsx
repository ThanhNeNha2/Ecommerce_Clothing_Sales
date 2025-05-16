import React, { useEffect, useState } from "react";
import { IoStar, IoStarHalf } from "react-icons/io5";
import SlideImgSingleProduct from "../SingleProduct_IMG/SlideImgSingleProduct";
import DescriptionAndReviews from "../DescriptionAndReviews/DescriptionAndReviews";
import { useParams } from "react-router-dom";
import {
  addProductToCart,
  addProductToWishlist,
  getProductById,
} from "../../services/api";
import { notification } from "antd";

const DetailProduct = () => {
  const { id } = useParams();
  const [singleItem, setSingleItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [valueAddCart, setValueAddCart] = useState(1);
  const user = JSON.parse(localStorage.getItem("user"));

  const fetchSingleProduct = async () => {
    try {
      setLoading(true);
      const res = await getProductById(id);

      setSingleItem(res.data.product || null);
      if (res.data.product?.sizes?.length > 0) {
        const sizeMap = { 0: "S", 1: "M", 2: "L" };
        const sizeData = res.data.product.sizes.map((size, index) => {
          const sizeName =
            sizeMap[index] ||
            (typeof size.size_id === "object"
              ? size.size_id.name
              : size.size_id);
          return {
            name: sizeName || "N/A",
            stock: size.stock,
          };
        });
        setSelectedSize(sizeData[0]?.name || "");
      }
    } catch (err) {
      console.error("Lỗi khi lấy sản phẩm:", err);
      setError("Không thể tải sản phẩm. Vui lòng thử lại sau.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSingleProduct();
  }, [id]);

  if (loading) return <div className="px-[130px] py-5">Đang tải...</div>;
  if (error) return <div className="px-[130px] py-5 text-red-500">{error}</div>;
  if (!singleItem)
    return <div className="px-[130px] py-5">Không tìm thấy sản phẩm</div>;

  const sizeData =
    singleItem.sizes?.map((size, index) => {
      const sizeMap = { 0: "S", 1: "M", 2: "L" };
      const sizeName =
        sizeMap[index] ||
        (typeof size.size_id === "object" ? size.size_id.name : size.size_id);
      return {
        name: sizeName || "N/A",
        stock: size.stock,
      };
    }) || [];

  const selectedStock =
    sizeData.find((size) => size.name === selectedSize)?.stock || 0;

  const handleAddCart = async (user_id, product_id) => {
    try {
      const res = await addProductToCart(user_id, product_id);
      if (res.status === 201) {
        notification.success({
          message: "Thêm sản phẩm vào giỏ hàng thành công",
        });
      }
    } catch (error) {
      console.log("Error adding product to cart:", error);
    }
  };

  const handleAddWishlist = async (user_id, product_id) => {
    const res = await addProductToWishlist(user_id, product_id);

    if (res.status === 201) {
      notification.success({
        message: "Thêm sản phẩm vào danh sách yêu thích thành công",
      });
    }
    if (res.status === 409) {
      notification.success({
        message: "Sản phẩm đã có trong danh sách yêu thích",
      });
    }
  };

  return (
    <div className="">
      <div className="flex mt-[30px] px-[130px] flex-wrap gap-5">
        <div className="flex gap-3 h-[500px] w-[48%] min-w-[300px]">
          <div className="flex flex-col gap-3 w-[20%] h-full">
            {singleItem.image_url?.length > 1 &&
              singleItem.image_url
                .filter((_, index) => index !== 0)
                .map((item, index) => (
                  <div key={index} className="w-full h-[100px] rounded">
                    <img
                      src={item}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover rounded cursor-pointer"
                      onClick={() => setIsOpen(true)}
                    />
                  </div>
                ))}
          </div>
          <div hidden>
            <SlideImgSingleProduct
              images={singleItem.image_url || []}
              setIsOpen={setIsOpen}
              isOpen={isOpen}
            />
          </div>
          <div className="flex-1 rounded">
            {singleItem.image_url?.[0] ? (
              <img
                src={singleItem.image_url[0]}
                alt={singleItem.nameProduct || "Product image"}
                className="w-[90%] h-full object-cover rounded cursor-pointer"
                onClick={() => setIsOpen(true)}
              />
            ) : (
              <div className="w-[90%] h-full bg-gray-200 flex items-center justify-center rounded">
                No Image Available
              </div>
            )}
          </div>
        </div>
        <div className="flex-1 flex flex-col gap-3 min-w-[300px]">
          <span className="font-poppins text-[28px] font-medium">
            {singleItem.nameProduct || "Tên sản phẩm"}
          </span>
          <p className="font-poppins text-[18px]">
            <span className="text-red-500 font-semibold mr-2">
              ${singleItem.salePrice || "N/A"}
            </span>
            <del className="text-gray-400">
              ${singleItem.originalPrice || "N/A"}
            </del>
          </p>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 text-yellow-500">
              <IoStar />
              <IoStar />
              <IoStar />
              <IoStar />
              <IoStarHalf />
            </div>
            <div className="border border-gray-300 h-[20px]"></div>
            <span className="text-[14px] text-gray-400">5 Customer Review</span>
          </div>
          <span>{singleItem.descriptionShort || "Không có mô tả"}</span>
          <ul className="flex flex-col justify-center gap-3">
            <li className="flex">
              <span className="w-[15%]">Gender</span>
              <p>: {singleItem.gender || "N/A"}</p>
            </li>
            <li className="flex">
              <span className="w-[15%]">Category</span>
              <p className="ml-2">: {singleItem.mainCategory || "N/A"}</p>
            </li>
            <li className="flex">
              <span className="w-[15%]">Tags</span>
              <p className="ml-2">
                : {singleItem.subCategory?.join(", ") || "N/A"}
              </p>
            </li>
            <li className="flex">
              <span className="w-[15%]">Stock</span>
              <p className="ml-2">
                : {selectedStock} (Size {selectedSize})
              </p>
            </li>
          </ul>
          <div className="flex flex-col gap-2">
            <span className="text-[15px] text-gray-400">Size</span>
            <div className="flex gap-3">
              {sizeData.length > 0 ? (
                sizeData.map((size) => (
                  <button
                    key={size.name}
                    className={`w-[30px] h-[30px] text-[14px] rounded transition-all ${
                      selectedSize === size.name
                        ? "bg-colorMain text-white"
                        : "text-black"
                    }`}
                    style={{
                      background: selectedSize === size.name ? "" : "#F9F1E7",
                    }}
                    onClick={() => setSelectedSize(size.name)}
                    aria-label={`Select size ${size.name}`}
                  >
                    {typeof size.name === "string" ? size.name : "N/A"}
                  </button>
                ))
              ) : (
                <span className="text-gray-400">Không có kích thước</span>
              )}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center">
              <button
                className={`border border-gray-400 px-3 py-[2px] rounded-l ${
                  valueAddCart === 1 ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={valueAddCart === 1}
                onClick={() => setValueAddCart(valueAddCart - 1)}
                aria-label="Decrease quantity"
              >
                -
              </button>
              <span className="border border-gray-400 px-3 py-[2px]">
                {valueAddCart}
              </span>
              <button
                className={`border border-gray-400 px-3 py-[2px] rounded-r ${
                  valueAddCart >= selectedStock
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
                disabled={valueAddCart >= selectedStock}
                onClick={() => setValueAddCart(valueAddCart + 1)}
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
            <button
              className="px-3 py-[5px] text-black rounded text-[14px] hover:opacity-80"
              style={{ background: "#FFCC99" }}
              onClick={() => {
                handleAddCart(user._id, singleItem._id);
              }}
              aria-label="Add to cart"
            >
              Add To Cart
            </button>
            <button
              className="px-3 py-[5px] text-black rounded text-[14px] hover:opacity-80"
              style={{ background: "#FFCC99" }}
              onClick={() => handleAddWishlist(user._id, singleItem._id)}
              aria-label="Compare product"
            >
              Add Favourite
            </button>
          </div>
        </div>
      </div>
      <hr className="my-7" />
      <DescriptionAndReviews description={singleItem.description} />
    </div>
  );
};

export default DetailProduct;
