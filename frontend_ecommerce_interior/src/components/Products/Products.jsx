import React, { useEffect, useState } from "react";
import { IoHeartOutline, IoShareSocial } from "react-icons/io5";
import { RiArrowLeftRightLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import { instance } from "../../Custom/Axios/AxiosCustom";

const Products = ({ listProducts }) => {
  return (
    <div className="flex flex-wrap justify-center px-6 sm:px-10 md:px-20 gap-6 py-8 bg-gray-50">
      {listProducts.map((product, i) => (
        <div
          key={i}
          className="group relative w-full sm:w-[calc(25%-18px)] md:w-[calc(25%-24px)] h-[450px] rounded-lg shadow-md overflow-hidden bg-white transition-all duration-300 hover:shadow-xl"
          aria-label={`Sản phẩm: ${product.nameProduct}`}
        >
          <div className="h-[70%] relative">
            {product.image_url?.[0] ? (
              <img
                src={product.image_url[0]}
                alt={product.nameProduct}
                className="w-full h-full object-cover rounded-t-lg"
              />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center rounded-t-lg">
                Không có hình ảnh
              </div>
            )}
            <div
              className={`absolute top-4 right-4 w-10 h-10 ${
                product.salePercentage && product.salePercentage !== "New"
                  ? "bg-red-500"
                  : "bg-green-500"
              } rounded-full flex justify-center items-center text-white text-xs font-medium`}
            >
              {product.salePercentage && product.salePercentage !== "New"
                ? `${product.salePercentage}%`
                : "New"}
            </div>
          </div>
          <div className="flex flex-col p-3 h-[30%] justify-between">
            <div>
              <span className="font-poppins text-base font-semibold text-gray-900 line-clamp-2">
                {product.nameProduct}
              </span>
              <div className="flex flex-wrap gap-2 mt-1">
                {product.subCategory.map((item, index) => (
                  <span
                    key={index}
                    className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-sm"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 mt-2">
                <span className="font-poppins font-semibold text-base text-gray-800">
                  ${product.salePrice || "N/A"}
                </span>
                <del className="text-sm font-medium text-gray-400">
                  ${product.originalPrice || "N/A"}
                </del>
              </div>
              <span className="font-semibold">
                For: {product.gender || "N/A"}
              </span>
            </div>
          </div>

          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-black/50 rounded-lg flex flex-col justify-center items-center gap-6 opacity-0 group-hover:!opacity-100 transition-opacity duration-300 z-[5]">
            <div className="flex gap-3">
              <button
                className="bg-white py-2 px-4 font-poppins font-medium rounded-lg hover:bg-gray-200 text-yellow-600"
                aria-label="Thêm vào giỏ hàng"
                onClick={() =>
                  console.log(`Thêm ${product.nameProduct} vào giỏ hàng`)
                }
              >
                Add to Cart
              </button>
              <Link to={`/SingleProduct/${product.id}`}>
                <button
                  className="bg-white py-2 px-4 font-poppins font-medium rounded-lg hover:bg-gray-200 text-yellow-600"
                  aria-label={`Xem chi tiết ${product.nameProduct}`}
                >
                  Show Detail
                </button>
              </Link>
            </div>
            <div className="flex gap-6 text-white">
              <div
                className="flex items-center gap-1 hover:text-gray-200 cursor-pointer"
                aria-label="Chia sẻ sản phẩm"
                onClick={() => console.log(`Chia sẻ ${product.nameProduct}`)}
              >
                <IoShareSocial />
                <span className="font-poppins font-medium text-sm">Share</span>
              </div>
              <div
                className="flex items-center gap-1 hover:text-gray-200 cursor-pointer"
                aria-label="So sánh sản phẩm"
                onClick={() => console.log(`So sánh ${product.nameProduct}`)}
              >
                <RiArrowLeftRightLine />
                <span className="font-poppins font-medium text-sm">
                  Compare
                </span>
              </div>
              <div
                className="flex items-center gap-1 hover:text-gray-200 cursor-pointer"
                aria-label="Yêu thích sản phẩm"
                onClick={() => console.log(`Yêu thích ${product.nameProduct}`)}
              >
                <IoHeartOutline />
                <span className="font-poppins font-medium text-sm">Love</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Products;
