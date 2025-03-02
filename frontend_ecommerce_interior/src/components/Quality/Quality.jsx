import React from "react";
import { FaShippingFast, FaUsers } from "react-icons/fa";
import { GiTrophyCup } from "react-icons/gi";
import { TbMedal2 } from "react-icons/tb";

const Quality = () => {
  return (
    <div
      className="mt-7  px-[100px]  py-[30px] flex justify-around mb-5 "
      style={{ background: "#FAF3EA" }}
    >
      <div className="flex gap-3 items-center">
        <div className="text-[40px]">
          <GiTrophyCup />
        </div>
        <div className="flex flex-col ">
          <div className="text-[20px] font-semibold ">High Quality</div>
          <div>crafted from top materials</div>
        </div>
      </div>
      <div className="flex gap-3 items-center ">
        <div className="text-[40px]">
          <TbMedal2 />
        </div>
        <div className="flex flex-col ">
          <div className="text-[20px] font-semibold ">Warranty Protection</div>
          <div>Over 2 years</div>
        </div>
      </div>
      <div className="flex gap-3 items-center ">
        <div className="text-[40px]">
          <FaShippingFast />
        </div>
        <div className="flex flex-col ">
          <div className="text-[20px] font-semibold ">Free Shipping</div>
          <div>Order over 150 $</div>
        </div>
      </div>{" "}
      <div className="flex gap-3 items-center ">
        <div className="text-[40px]">
          <FaUsers />
        </div>
        <div className="flex flex-col ">
          <div className="text-[20px] font-semibold ">24 / 7 Support</div>
          <div>Dedicated support</div>
        </div>
      </div>
    </div>
  );
};

export default Quality;
