import React from "react";
import { FaAngleRight } from "react-icons/fa";
import logo from "../../../public/Logo/Meubel House_Logos-05 (1).png";

const CoverImg = ({ namePage }) => {
  return (
    <div className="relative pt-[60px]">
      {/* Ảnh nền */}
      <img
        src="https://images.pexels.com/photos/2062427/pexels-photo-2062427.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        alt=""
        className="h-[250px] w-full object-cover"
      />

      {/* Overlay màu trắng mờ */}
      <div className="absolute inset-0 bg-white/50"></div>

      {/* Nội dung trên ảnh */}
      <div className="absolute top-1/2 left-1/2 flex flex-col items-center justify-center gap-2 -translate-x-1/2 -translate-y-1/2">
        <img src={logo} alt="" />
        <span className="text-4xl font-medium ">{namePage}</span>
        <div className="flex items-center gap-2">
          <span className="font-medium">Home</span>
          <FaAngleRight />
          <p>{namePage}</p>
        </div>
      </div>
    </div>
  );
};

export default CoverImg;
