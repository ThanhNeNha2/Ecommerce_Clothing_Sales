import React, { useState } from "react";

import { IoStar, IoStarHalf } from "react-icons/io5";

import { SingleItem } from "../../services/fakeApi";
import SlideImgSingleProduct from "../SingleProduct_IMG/SlideImgSingleProduct";
import DescriptionAndReviews from "../DescriptionAndReviews/DescriptionAndReviews";

const DetailProduct = () => {
  // Map size objects to size names and include stock
  const sizeData = SingleItem.sizes.map((size, index) => {
    const sizeMap = { 0: "S", 1: "M", 2: "L" }; // Placeholder mapping
    return {
      name: sizeMap[index] || size.size_id,
      stock: size.stock,
    };
  });

  const [selectedSize, setSelectedSize] = useState(sizeData[0]?.name || "");
  const [isOpen, setIsOpen] = useState(false); // State for lightbox
  const [valueAddCart, setValueAddCart] = useState(1);

  // Get stock for the selected size
  const selectedStock =
    sizeData.find((size) => size.name === selectedSize)?.stock || 0;

  return (
    <div className="">
      {/* Images and Product Info */}
      <div className="flex mt-[30px] px-[130px]">
        {/* Images */}
        <div className="flex gap-3 h-[500px] w-[48%]">
          {/* Thumbnail Images */}
          <div className="flex flex-col gap-3 w-[20%] h-full">
            {SingleItem.image_url
              .filter((_, index) => index !== 0)
              .map((item, index) => (
                <div key={index} className="w-full h-[100px] rounded">
                  <img
                    src={item}
                    alt=""
                    className="w-full h-full object-cover rounded"
                    onClick={() => setIsOpen(true)} // Open lightbox
                  />
                </div>
              ))}
          </div>
          <div hidden>
            <SlideImgSingleProduct
              images={SingleItem.image_url}
              setIsOpen={setIsOpen}
              isOpen={isOpen}
            />
          </div>
          {/* Main Image */}
          <div className="flex-1 rounded">
            <img
              src={SingleItem.image_url[0]}
              alt=""
              className="w-[90%] h-full object-cover rounded"
              onClick={() => setIsOpen(true)} // Open lightbox
            />
          </div>
        </div>
        {/* Product Details */}
        <div className="flex-1 flex flex-col gap-3">
          <span className="font-poppins text-[28px] font-medium">
            {SingleItem.nameProduct}
          </span>
          <p className="font-poppins text-[18px]">
            <span className="text-red-500 font-semibold mr-2">
              ${SingleItem.salePrice}
            </span>
            <del className="text-gray-400">${SingleItem.originalPrice}</del>
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
          <span>{SingleItem.description}</span>
          <ul className="flex flex-col justify-center gap-3">
            <li className="flex">
              <span className="w-[15%]">Gender</span>
              <p>: {SingleItem.gender}</p>
            </li>
            <li className="flex">
              <span className="w-[15%]">Category</span>
              <p className="ml-2">: {SingleItem.mainCategory}</p>
            </li>
            <li className="flex">
              <span className="w-[15%]">Tags</span>
              <p className="ml-2">: {SingleItem.subCategory.join(", ")}</p>
            </li>
            <li className="flex">
              <span className="w-[15%]">Stock</span>
              <p className="ml-2">
                : {selectedStock} (Size {selectedSize})
              </p>
            </li>
          </ul>
          {/* Size Selection */}
          <div className="flex flex-col gap-2">
            <span className="text-[15px] text-gray-400">Size</span>
            <div className="flex gap-3">
              {sizeData.map((size) => (
                <button
                  key={size.name}
                  className={`w-[30px] h-[30px] text-[14px] rounded transition-all 
                    ${
                      selectedSize === size.name
                        ? "bg-colorMain text-white"
                        : "text-black"
                    }`}
                  style={{
                    background: selectedSize === size.name ? "" : "#F9F1E7",
                  }}
                  onClick={() => setSelectedSize(size.name)}
                >
                  {size.name}
                </button>
              ))}
            </div>
          </div>
          {/* Quantity and Buttons */}
          <div className="flex items-center gap-3">
            <div className="flex items-center">
              <button
                className={`border border-gray-400 px-3 py-[2px] rounded-l ${
                  valueAddCart === 1 ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={valueAddCart === 1}
                onClick={() => setValueAddCart(valueAddCart - 1)}
              >
                -
              </button>
              <span className="border border-gray-400 px-3 py-[2px]">
                {valueAddCart}
              </span>
              <button
                className="border border-gray-400 px-3 py-[2px] rounded-r"
                onClick={() => setValueAddCart(valueAddCart + 1)}
              >
                +
              </button>
            </div>
            <button
              className="px-3 py-[5px] text-black rounded text-[14px] hover:opacity-80"
              style={{ background: "#FFCC99" }}
            >
              Add To Cart
            </button>
            <button
              className="px-3 py-[5px] text-black rounded text-[14px] hover:opacity-80"
              style={{ background: "#FFCC99" }}
            >
              + Compare
            </button>
          </div>
        </div>
      </div>
      <hr className="my-7" />
      {/* Description and Reviews */}
      <DescriptionAndReviews />
    </div>
  );
};

export default DetailProduct;
