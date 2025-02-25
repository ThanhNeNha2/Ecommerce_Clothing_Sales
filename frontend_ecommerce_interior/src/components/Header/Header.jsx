import React from "react";
import logo from "../../../public/Logo/Meubel House_Logos-05 (1).png";
import { FaRegHeart, FaUserAlt } from "react-icons/fa";
import { IoSearchOutline } from "react-icons/io5";

import { FiShoppingCart } from "react-icons/fi";
const Header = () => {
  return (
    <div className=" flex justify-between items-center h-[95px] 2xl:h-[65px]  bg-white px-14 fixed z-50 w-full ">
      {/* item 1  */}
      <div className=" flex items-center gap-1 ">
        <div className="flex items-center">
          <img src={logo} alt="" />
        </div>
        <span className="text-black font-montserrat font-bold text-[32px] 2xl:text-[26px]">
          Furniro
        </span>
      </div>

      {/* item 2  */}
      <div className="flex items-center gap-[160px] 2xl:gap-[75px] pr-12">
        {/* -- */}
        <div>
          <ul className="flex items-center gap-[75px] 2xl:gap-[60px]">
            <li className="text-lg font-medium">Home </li>
            <li className="text-lg font-medium">Shop</li>
            <li className="text-lg font-medium">About</li>
            <li className="text-lg font-medium">Contact</li>
          </ul>
        </div>
        {/* -- */}
        <div>
          <ul className="flex items-center gap-12 2xl:gap-[30px]">
            <li className="text-[25px] 2xl:text-[18px] ">
              <FaUserAlt />
            </li>
            <li className="text-[25px] 2xl:text-[18px] ">
              <IoSearchOutline />
            </li>
            <li className="text-[25px] 2xl:text-[18px] ">
              <FaRegHeart />
            </li>
            <li className="text-[25px] 2xl:text-[18px] ">
              <FiShoppingCart />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
