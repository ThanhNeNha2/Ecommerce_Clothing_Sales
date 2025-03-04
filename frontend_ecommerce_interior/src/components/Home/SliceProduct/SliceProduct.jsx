import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { GoArrowRight } from "react-icons/go";

const SliceProduct = () => {
  return (
    <div
      className="pl-16 bg-red-500 flex h-[600px] mt-16 "
      style={{ background: "#FCF8F3" }}
    >
      <div className="w-[calc(100%/3)] flex flex-col pr-8 gap-3 items-center justify-center">
        <div>
          <span className="font-poppins font-bold text-[32px] leading-[120%]">
            50+ Beautiful rooms inspiration
          </span>
          <p>
            Our designer already made a lot of beautiful prototipe of rooms that
            inspire you
          </p>
        </div>
        <div className="w-full">
          <button className="px-5 py-2 bg-colorMain font-poppins font-medium text-white">
            Explore More
          </button>
        </div>
      </div>
      <div className="w-[calc(100%/3)]   p-7">
        <div className="w-full h-full relative">
          <img
            src="https://images.pexels.com/photos/1034584/pexels-photo-1034584.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt=""
            className="w-full h-full object-cover"
          />
          <div className=" absolute bottom-5 left-5 w-[100%] h-[120px] flex items-end">
            <div className="bg-white/70 w-[55%] h-full p-7 flex flex-col justify-center gap-3">
              <span>01 --- Bed Room</span>
              <p className="font-poppins font-semibold text-2xl">Inner Peace</p>
            </div>

            <div>
              {" "}
              <button className="px-3 py-3 bg-colorMain text-white">
                <GoArrowRight />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="w-[calc(100%/3)] bg-green-400">kkk</div>
    </div>
  );
};

export default SliceProduct;
