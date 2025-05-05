import React from "react";
import { listProducts } from "../../services/fakeApi";
import { IoHeartOutline, IoShareSocial } from "react-icons/io5";
import { RiArrowLeftRightLine } from "react-icons/ri";
import { Link } from "react-router-dom";

const Products = ({ value }) => {
  return (
    <div className="flex flex-wrap justify-center px-6 sm:px-10 md:px-20 gap-6 py-8 bg-gray-50">
      {listProducts.slice(0, value).map((product, i) => (
        <div
          key={i}
          className="w-full sm:w-[calc(25%-18px)] md:w-[calc(25%-24px)] h-[450px] rounded-lg shadow-md overflow-hidden bg-white transition-all duration-300 hover:shadow-xl group relative"
        >
          <div className="h-[70%] relative">
            <img
              src={product.imgItem}
              alt={product.productName}
              className="w-full h-full object-cover rounded-t-lg"
            />
            <div
              className={`absolute top-4 right-4 w-10 h-10 ${
                product.salePercentage !== "New" ? "bg-red-500" : "bg-green-500"
              } rounded-full flex justify-center items-center text-white text-xs font-medium`}
            >
              {product.salePercentage}
            </div>
          </div>
          <div className="flex flex-col p-4 h-[30%] justify-between">
            <div>
              <span className="font-poppins text-lg font-semibold text-gray-900">
                {product.productName}
              </span>
              <p className="text-gray-600 text-sm mt-1">Stylish cafe chair</p>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <span className="font-poppins font-semibold text-base text-gray-800">
                Rp {product.salePrice}
              </span>
              <del className="text-sm font-medium text-gray-400">
                Rp {product.originalPrice}
              </del>
            </div>
          </div>
          <div className="absolute inset-0 bg-black/50 rounded-lg flex flex-col justify-center items-center gap-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="flex gap-3">
              <button className="bg-white py-2 px-4 font-poppins font-medium rounded-lg hover:bg-gray-200 text-yellow-600">
                Add to Cart
              </button>
              <Link to="/SingleProduct">
                <button className="bg-white py-2 px-4 font-poppins font-medium rounded-lg hover:bg-gray-200 text-yellow-600">
                  Show Detail
                </button>
              </Link>
            </div>
            <div className="flex gap-6 text-white">
              <div className="flex items-center gap-1 hover:text-gray-200 cursor-pointer">
                <IoShareSocial />
                <span className="font-poppins font-medium text-sm">Share</span>
              </div>
              <div className="flex items-center gap-1 hover:text-gray-200 cursor-pointer">
                <RiArrowLeftRightLine />
                <span className="font-poppins font-medium text-sm">
                  Compare
                </span>
              </div>
              <div className="flex items-center gap-1 hover:text-gray-200 cursor-pointer">
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
