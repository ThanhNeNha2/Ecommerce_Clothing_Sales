import React, { useState } from "react";
import logo from "../../../public/Logo/logoweb.png";
import { FaRegHeart, FaUserAlt, FaUserEdit } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { FiShoppingCart } from "react-icons/fi";
import { Link } from "react-router-dom";
import { TbLogin, TbLogout } from "react-icons/tb";
import { MdAssignmentInd } from "react-icons/md";
import ProductFavourite from "../ProductFavourite/ProductFavourite";

const Header = () => {
  const [checkShow, setCheckShow] = useState({
    openUser: false,
    openFavourite: false,
  });

  const handleCheckOpen = (value) => {
    if (value === "favourite") {
      setCheckShow((prev) => ({
        openFavourite: !checkShow.openFavourite,
        openUser: false,
      }));
    }
    if (value === "user") {
      setCheckShow((prev) => ({
        openFavourite: false,
        openUser: !checkShow.openUser,
      }));
    }
  };

  // Kiểm tra trạng thái đăng nhập từ localStorage
  const isAuthenticated = () => {
    const accessToken = localStorage.getItem("accessToken");
    const user = localStorage.getItem("user");
    return accessToken && user; // Trả về true nếu đã đăng nhập
  };

  // Hàm xử lý đăng xuất
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    // Chuyển hướng về trang chủ hoặc trang đăng nhập sau khi đăng xuất
    window.location.href = "/login";
  };

  return (
    <div className="flex justify-between items-center h-[95px] 2xl:h-[60px] bg-gray-50 px-14 fixed z-40 w-full">
      {/* item 1 */}
      <Link to={"/"}>
        <div className="flex items-center gap-1">
          <div className="flex items-center w-[150px] h-[120px]">
            <img src={logo} alt="" className="w-full h-full object-cover" />
          </div>
        </div>
      </Link>

      {/* item 2 */}
      <div className="flex items-center gap-[160px] 2xl:gap-[75px] pr-12">
        {/* -- */}
        <div>
          <ul className="flex items-center gap-[75px] 2xl:gap-[60px]">
            <Link to={"/"}>
              <li className="text-lg font-medium hover:text-gray-400">Home</li>
            </Link>
            <Link to={"/ListProduct"}>
              <li className="text-lg font-medium hover:text-gray-400">Shop</li>
            </Link>
            <Link to={"/blog"}>
              <li className="text-lg font-medium hover:text-gray-400">Blog</li>
            </Link>
            <Link to={"/Contact"}>
              <li className="text-lg font-medium hover:text-gray-400">
                Contact
              </li>
            </Link>
          </ul>
        </div>
        {/* -- */}
        <div>
          <ul className="flex items-center gap-12 2xl:gap-[30px]">
            {/* User */}
            <li className="relative">
              <div
                className="hover:text-gray-400 text-[25px] 2xl:text-[18px]"
                onClick={() => handleCheckOpen("user")}
              >
                <FaUserAlt />
              </div>
              {checkShow.openUser && (
                // Cụm 1
                <div className="absolute bg-gray-100 top-[39px] left-[-70px] w-[200px] h-auto">
                  <Link to={isAuthenticated() ? "/ProfileUser" : "/login"}>
                    <button className="w-full py-2 flex justify-center items-center gap-2 hover:bg-red-300 font-medium font-poppins">
                      {isAuthenticated() ? (
                        <>
                          Profile <FaUserEdit />
                        </>
                      ) : (
                        <>
                          Login <TbLogin />
                        </>
                      )}
                    </button>
                  </Link>
                  {/* Cụm 2 */}
                  {isAuthenticated() ? (
                    <button
                      className="w-full py-2 flex justify-center items-center gap-2 hover:bg-red-300 font-medium font-poppins"
                      onClick={handleLogout}
                    >
                      Logout <TbLogout />
                    </button>
                  ) : (
                    <Link to="/register">
                      <button className="w-full py-2 flex justify-center items-center gap-2 hover:bg-red-300 font-medium font-poppins">
                        Register <MdAssignmentInd />
                      </button>
                    </Link>
                  )}
                </div>
              )}
            </li>
            <Link to={"/ListProduct"}>
              <li className="text-[25px] 2xl:text-[18px] hover:text-gray-400">
                <IoSearch />
              </li>
            </Link>
            {/* Yêu Thích */}
            <li className="relative">
              <div
                className="text-[25px] 2xl:text-[18px] hover:text-gray-400"
                onClick={() => handleCheckOpen("favourite")}
              >
                <FaRegHeart />
              </div>
              {checkShow.openFavourite && <ProductFavourite />}
            </li>
            <Link to={"/cart"}>
              <li className="text-[25px] 2xl:text-[18px] hover:text-gray-400">
                <FiShoppingCart />
              </li>
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
