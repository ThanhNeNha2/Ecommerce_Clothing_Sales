import React, { useEffect } from "react";
import Header from "../../components/Header/Header";
import CoverImg from "../../components/Cover/CoverImg";
import { FaTrash } from "react-icons/fa";
import Quality from "../../components/Quality/Quality";
import Footer from "../../components/Footer/Footer";

const Cart = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="">
      <Header />
      <CoverImg namePage="Cart" />
      <div className="flex gap-3 h-60 mt-5  px-[130px]">
        <div className="w-[65%]">
          {/*  */}
          <div
            className="flex items-center px-5 justify-between py-2 mb-3 "
            style={{ background: "#F9F1E7" }}
          >
            <span className="text-lg font-semibold"> Shopping Cart </span>
            <p>1 item</p>
          </div>
          {/*  */}
          <div className="flex items-center justify-between px-5">
            <div className="w-[100px] h-[100px] rounded">
              <img
                src="https://images.pexels.com/photos/2343468/pexels-photo-2343468.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt=""
                className="w-full h-full object-cover rounded"
              />
            </div>
            <span>Asgaard sofa</span>
            <span>Rs. 250,000.00 </span>
            <div className=" flex items-center ">
              <button className="border border-gray-400 px-3 py-[2px] rounded-l">
                -
              </button>
              <span className="border border-gray-400 px-3 py-[2px]">1</span>
              <button className="border border-gray-400 px-3 py-[2px] rounded-r">
                +
              </button>
            </div>
            <span>Rs. 250,000.00 </span>
            <button>
              <FaTrash />
            </button>
          </div>
        </div>
        <div
          className="flex-1 flex flex-col gap-3 items-center justify-center w-full"
          style={{ background: "#F9F1E7" }}
        >
          <span className="font-poppins font-semibold text-[22px]">
            Cart Totals
          </span>
          <div className="border border-gray-300 w-[400px]"></div>

          <div className="flex flex-col gap-3">
            <div className="flex gap-5">
              <span>Subtotal</span>

              <p className=" text-[15px] text-gray-400">Rs. 250,000.00</p>
            </div>
            <div className="flex gap-5">
              <span>Sale</span>

              <p className=" text-[15px] text-gray-400">0%</p>
            </div>
            <div className="flex gap-5">
              <span>Total</span>
              <p className=" text-[15px] text-colorMain">Rs. 250,000.00</p>
            </div>
            <div className="  flex items-center justify-center">
              <button className="px-5 bg-colorMain text-white font-medium hover:opacity-85 rounded py-2">
                Check Out
              </button>
            </div>
          </div>
        </div>
      </div>
      <Quality />
      <Footer />
    </div>
  );
};

export default Cart;
