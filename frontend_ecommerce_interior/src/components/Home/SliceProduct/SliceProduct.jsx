import React, { useRef, useState } from "react";
import { GoArrowRight } from "react-icons/go";
import { MdOutlineChevronLeft, MdOutlineChevronRight } from "react-icons/md";

const SliceProduct = () => {
  const sliderRef = useRef(null);
  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -380, behavior: "smooth" });
    }
    if (checkValue <= 4) {
      setCheckValue(checkValue - 1);
    }
  };
  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 380, behavior: "smooth" });
    }
    if (checkValue >= 0) {
      setCheckValue(checkValue + 1);
    }
  };
  const [checkValue, setCheckValue] = useState(1);
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
              <button className="px-3 py-3 bg-colorMain text-white">
                <GoArrowRight />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="relative w-[calc(100%/3)] py-7  overflow-hidden">
        {/* Nút Trái */}
        <button
          onClick={scrollLeft}
          className={`absolute left-3 top-1/2 -translate-y-1/2 bg-white text-3xl text-colorMain px-1 py-1 rounded-full hover:bg-gray-100 z-10 ${
            checkValue === 1 ? "hidden" : ""
          }`}
        >
          <MdOutlineChevronLeft />
        </button>
        {/* Container chứa ảnh */}
        <div
          ref={sliderRef}
          className="w-full h-[90%]   flex gap-3 overflow-hidden scroll-smooth"
        >
          <div className="w-[364px] h-full shrink-0">
            <img
              src="https://images.pexels.com/photos/707579/pexels-photo-707579.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
          <div className="w-[364px] h-full shrink-0">
            <img
              src="https://images.pexels.com/photos/707579/pexels-photo-707579.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
          <div className="w-[364px] h-full shrink-0">
            <img
              src="https://images.pexels.com/photos/707579/pexels-photo-707579.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Nút phải */}
        <button
          onClick={scrollRight}
          className={`absolute right-3 top-1/2 -translate-y-1/2 bg-white text-3xl text-colorMain px-1 py-1 rounded-full hover:bg-gray-100 z-10 ${
            checkValue === 4 ? "hidden" : ""
          }`}
        >
          <MdOutlineChevronRight />
        </button>
        <div className="  mt-3 flex gap-2">
          <div
            className={`p-1 ${
              checkValue === 1 ? " border border-colorMain rounded-full" : ""
            }`}
          >
            <div
              className={`w-[10px] h-[10px] rounded-full  ${
                checkValue === 1 ? " bg-colorMain" : "bg-gray-400"
              }`}
            ></div>
          </div>
          <div
            className={`p-1 ${
              checkValue === 2 ? " border border-colorMain rounded-full" : ""
            }`}
          >
            <div
              className={`w-[10px] h-[10px] rounded-full  ${
                checkValue === 2 ? " bg-colorMain" : "bg-gray-400"
              }`}
            ></div>
          </div>
          <div
            className={`p-1 ${
              checkValue === 3 ? " border border-colorMain rounded-full" : ""
            }`}
          >
            <div
              className={`w-[10px] h-[10px] rounded-full  ${
                checkValue === 3 ? " bg-colorMain" : "bg-gray-400"
              }`}
            ></div>
          </div>
          <div
            className={`p-1 ${
              checkValue === 4 ? " border border-colorMain rounded-full" : ""
            }`}
          >
            <div
              className={`w-[10px] h-[10px] rounded-full  ${
                checkValue === 4 ? " bg-colorMain" : "bg-gray-400"
              }`}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SliceProduct;
