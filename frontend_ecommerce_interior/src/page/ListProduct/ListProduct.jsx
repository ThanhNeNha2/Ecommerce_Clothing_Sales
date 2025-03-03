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
      <div>
        {/* tren */}
        <div
          className=" w-full h-[65px] flex items-center justify-between px-[150px] mb-10"
          style={{ background: "#F9F1E7" }}
        >
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
      </div>
      <Products value={16} />
      <Quality />
      <Footer />
    </div>
  );
};

export default ListProduct;
