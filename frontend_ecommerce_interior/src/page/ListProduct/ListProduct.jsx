import React from "react";
import Header from "../../components/Header/Header";
import CoverImg from "../../components/Cover/CoverImg";
import Products from "../../components/Products/Products";
import Quality from "../../components/Quality/Quality";
import Footer from "../../components/Footer/Footer";
import { IoList } from "react-icons/io5";
import { TbGridDots } from "react-icons/tb";
import { CgScreenWide } from "react-icons/cg";

const ListProduct = () => {
  return (
    <div>
      <Header />
      <CoverImg namePage={"Shop"} />
      <div
        className="px-6 sm:px-10 md:px-20 pb-6 mb-10"
        style={{ background: "#F9F1E7" }}
      >
        {/* Top Section */}
        <div className="w-full h-16 flex items-center justify-between border-b border-gray-200">
          {/* Left Side */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 text-gray-700 hover:text-gray-900">
                <IoList className="text-xl" />
                <span className="font-poppins font-medium">Filter</span>
              </button>
              <div className="flex items-center gap-3 text-gray-700">
                <TbGridDots className="text-xl" />
                <CgScreenWide className="text-xl" />
              </div>
            </div>
            <hr className="h-8 border-l border-gray-300 mx-4" />
            <span className="font-poppins text-sm text-gray-600">
              Showing 1-16 of 32 results
            </span>
          </div>
          {/* Right Side */}
          <div className="flex items-center gap-4">
            <select className="border border-gray-300 px-3 py-1.5 rounded-md font-poppins font-medium text-gray-700 hover:bg-gray-50">
              <option>16 per page</option>
              <option>32 per page</option>
              <option>48 per page</option>
            </select>
            <select className="border border-gray-300 px-3 py-1.5 rounded-md font-poppins font-medium text-gray-700 hover:bg-gray-50">
              <option>Default</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Newest</option>
            </select>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-6">
          <div className="flex flex-col items-center py-3">
            <span className="font-poppins font-medium text-lg text-gray-800">
              Find Your Style
            </span>
          </div>
          <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
            <div className="flex flex-col">
              <span className="text-sm text-gray-600">Category</span>
              <select className="border border-gray-300 py-1.5 px-3 rounded-md text-sm text-gray-700 hover:bg-gray-50">
                <option value="">All</option>
                <option value="">T-Shirts</option>
                <option value="">Dresses</option>
                <option value="">Jeans</option>
              </select>
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-gray-600">Size</span>
              <select className="border border-gray-300 py-1.5 px-3 rounded-md text-sm text-gray-700 hover:bg-gray-50">
                <option value="">All</option>
                <option value="">S</option>
                <option value="">M</option>
                <option value="">L</option>
                <option value="">XL</option>
              </select>
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-gray-600">Color</span>
              <select className="border border-gray-300 py-1.5 px-3 rounded-md text-sm text-gray-700 hover:bg-gray-50">
                <option value="">All</option>
                <option value="">Black</option>
                <option value="">White</option>
                <option value="">Blue</option>
              </select>
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-gray-600">Min Price</span>
              <input
                type="number"
                placeholder="Rp 0"
                className="border border-gray-300 py-1.5 px-3 rounded-md text-sm text-gray-700 hover:bg-gray-50"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-gray-600">Max Price</span>
              <input
                type="number"
                placeholder="Rp 1000000"
                className="border border-gray-300 py-1.5 px-3 rounded-md text-sm text-gray-700 hover:bg-gray-50"
              />
            </div>
            <div className="flex items-end">
              <button className="px-6 py-2 bg-[#B88E2F] text-white font-medium rounded-md hover:bg-[#a47926] transition-colors duration-200">
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
      <Products value={16} />
      <Quality />
      <Footer />
    </div>
  );
};

export default ListProduct;
