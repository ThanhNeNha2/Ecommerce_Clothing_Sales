import React from "react";

const SliceProduct = () => {
  return (
    <div
      className="pl-16 bg-red-500 flex h-[600px] "
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
      <div className="w-[calc(100%/3)] bg-red-300">kkk</div>
      <div className="w-[calc(100%/3)] bg-green-400">kkk</div>
    </div>
  );
};

export default SliceProduct;
