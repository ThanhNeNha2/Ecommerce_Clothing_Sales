import React from "react";
import logo from "../../../public/Logo/Meubel House_Logos-05 (1).png";
import { FaRegHeart, FaUserAlt } from "react-icons/fa";
import { IoSearchOutline } from "react-icons/io5";
import { IoMdCart } from "react-icons/io";
import { FiShoppingCart } from "react-icons/fi";
const Header = () => {
  return (
    <div className=" flex justify-between items-center h-[95px] bg-red-300 px-14 ">
      {/* item 1  */}
      <div className=" flex items-center gap-1 ">
        <div>
          <img src={logo} alt="" />
        </div>
        <span className="text-black font-montserrat font-bold text-[32px]">
          Furniro
        </span>
      </div>

      {/* item 2  */}
      <div className="flex items-center gap-[160px] pr-12">
        {/* -- */}
        <div>
          <ul className="flex items-center gap-[75px]">
            <li className="text-lg font-medium">Home </li>
            <li className="text-lg font-medium">Shop</li>
            <li className="text-lg font-medium">About</li>
            <li className="text-lg font-medium">Contact</li>
          </ul>
        </div>
        {/* -- */}
        <div>
          <ul className="flex items-center gap-12">
            <li className="text-[25px] ">
              <FaUserAlt />
            </li>
            <li className="text-[25px] ">
              <IoSearchOutline />
            </li>
            <li className="text-[25px] ">
              <FaRegHeart />
            </li>
            <li className="text-[25px] ">
              <FiShoppingCart />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
