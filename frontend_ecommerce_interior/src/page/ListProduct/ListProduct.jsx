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
      <div className="px-[150px] pb-7 mb-10" style={{ background: "#F9F1E7" }}>
        {/* tren */}
        <div className=" w-full h-[65px] flex items-center justify-between ">
          {/* trai */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <div className="text-xl">
                  <IoList />
                </div>
                <span className="font-poppins font-medium">Filter</span>
              </div>
              <div className="text-xl flex items-center gap-3">
                <TbGridDots />
                <CgScreenWide />
              </div>
            </div>
            <hr className="h-10   border" />
            <span>Showing 1{"-"}16 of 32 results</span>
          </div>
          {/* trai */}
          <div className="flex items-center gap-3">
            <span className="font-poppins font-medium">Filter</span>
            <button className="px-4 py-2 bg-white">16</button>
            <span className="font-poppins font-medium">Short By</span>
            <button className="px-4 py-2 bg-white">Default</button>
          </div>
        </div>
        {/* duoi */}
        <div>
          <div className="flex flex-col  items-center py-3 ">
            <span className="font-poppins font-medium text-xl">
              Search item{" "}
            </span>
          </div>
          <div className="flex  justify-center gap-5">
            <div className="flex flex-col">
              <span>Type</span>
              <select className="border border-gray-400 py-[5px] px-3 rounded">
                <option value="">Sofa</option>
                <option value="">Bàn gỗ </option>
              </select>
            </div>
            <div className="flex flex-col">
              <span> Min Price</span>
              <input
                type="text"
                className="border border-gray-400 py-[5px] px-3 rounded"
              />
            </div>
            <div className="flex flex-col">
              <span> Max Price</span>
              <input
                type="text"
                className="border border-gray-400 py-[5px] px-3 rounded"
              />
            </div>
            <div className="flex items-end justify-center ">
              <button className="px-5 py-2 bg-colorMain text-white font-medium hover:opacity-90">
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
