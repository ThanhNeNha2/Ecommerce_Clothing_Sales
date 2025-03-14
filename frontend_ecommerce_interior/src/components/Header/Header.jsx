import React, { useState } from "react";
import logo from "../../../public/Logo/Meubel House_Logos-05 (1).png";
import { FaHeart, FaRegHeart, FaUserAlt, FaUserEdit } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { productsFavourite } from "../../services/fakeApi";
import { FiShoppingCart } from "react-icons/fi";
import { Link } from "react-router-dom";
import { TbLogout } from "react-icons/tb";
const Header = () => {
  const [checkShow, setCheckShow] = useState({
    openUser: false,
    openFavourite: false,
  });
  const handleCheckOpen = (value) => {
    if (value === "favourite") {
      setCheckShow((pev) => ({
        openFavourite: !checkShow.openFavourite,
        openUser: false,
      }));
    }
    if (value === "user") {
      setCheckShow((pev) => ({
        openFavourite: false,
        openUser: !checkShow.openUser,
      }));
    }
  };
  const [checkValue, setCheckValue] = useState(0);

  //  Chia Trang

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Số lượng sản phẩm trên mỗi trang

  // Tính tổng số trang
  const totalPages = Math.ceil(productsFavourite.length / itemsPerPage);

  // Xác định vị trí bắt đầu và kết thúc của sản phẩm cần hiển thị
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  console.log("check diem bat dau ", startIndex);
  console.log("check diem ket thuc  ", endIndex);

  // Lọc danh sách sản phẩm hiển thị trên trang hiện tại
  const displayedProducts = productsFavourite.slice(startIndex, endIndex);

  return (
    <div className=" flex justify-between items-center h-[95px] 2xl:h-[60px] bg-gray-50 px-14 fixed z-50 w-full ">
      {/* item 1  */}
      <Link to={"/"}>
        <div className=" flex items-center gap-1 ">
          <div className="flex items-center">
            <img src={logo} alt="" />
          </div>
          <span className="text-black font-montserrat font-bold text-[32px] 2xl:text-[26px]">
            Furniro
          </span>
        </div>
      </Link>

      {/* item 2  */}
      <div className="flex items-center gap-[160px] 2xl:gap-[75px] pr-12">
        {/* -- */}
        <div>
          <ul className="flex items-center gap-[75px] 2xl:gap-[60px]">
            <Link to={"/"}>
              <li className="text-lg font-medium hover:text-gray-400">Home </li>
            </Link>
            <Link to={"/ListProduct"}>
              <li className="text-lg font-medium hover:text-gray-400">Shop</li>
            </Link>
            <Link to={"/blog"}>
              <li className="text-lg font-medium hover:text-gray-400">About</li>
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
            <li className=" relative ">
              <div
                className="hover:text-gray-400 text-[25px] 2xl:text-[18px]"
                onClick={() => handleCheckOpen("user")}
              >
                <FaUserAlt />
              </div>
              {checkShow.openUser && (
                <div className="absolute bg-gray-100 top-[39px] left-[-70px] w-[200px] h-auto">
                  <Link to={"/ProfileUser"}>
                    {" "}
                    <button
                      className="w-full py-2 flex justify-center items-center gap-2 hover:bg-red-300 "
                      // style={{ background: "red" }}
                    >
                      Profile <FaUserEdit />
                    </button>
                  </Link>
                  <button className="w-full py-2 flex justify-center items-center gap-2 hover:bg-red-300 ">
                    Logout <TbLogout />
                  </button>
                </div>
              )}
            </li>
            <Link to={"/ListProduct"}>
              <li className="text-[25px] 2xl:text-[18px] hover:text-gray-400">
                <IoSearch />
              </li>
            </Link>
            {/* Yêu Thích  */}
            <li className="relative">
              <div
                className="text-[25px] 2xl:text-[18px] hover:text-gray-400"
                onClick={() => handleCheckOpen("favourite")}
              >
                <FaRegHeart />
              </div>
              {checkShow.openFavourite && (
                <div className="absolute bg-gray-100 top-[39px] left-[-150px] w-[320px] h-[543px] pt-5  flex flex-col justify-between  ">
                  <div>
                    <div className="flex items-center justify-between mb-3 px-5 h-auto">
                      <span className="font-poppins font-medium text-lg">
                        Products Favourite
                      </span>
                      <span>
                        <FaRegHeart />
                      </span>
                    </div>
                    <hr />
                    <div className="mt-2 flex flex-col justify-between  ">
                      <div>
                        {displayedProducts.map((product, i) => (
                          <div
                            key={i}
                            className="flex justify-between items-center px-5 hover:bg-gray-300 py-2"
                          >
                            <div className="w-[70px] h-[70px]">
                              <img
                                src={product.imgProduct}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex flex-col">
                              <span>{product.productName}</span>
                              <span className="text-sm font-normal">
                                Giá: {product.salePrice} VNĐ
                              </span>
                            </div>
                            <div>
                              <span
                                className="text-red-500 cursor-pointer hover:text-red-400"
                                title="Xóa khỏi danh sách"
                              >
                                <FaHeart />
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  {/*  Phần chia trang  */}
                  <div className=" py-3 flex justify-center  ">
                    {Array.from({ length: totalPages }).map((_, index) => (
                      <div
                        key={index}
                        className={`p-1 ${
                          currentPage === index + 1
                            ? "border border-colorMain rounded-full"
                            : ""
                        }`}
                        onClick={() => setCurrentPage(index + 1)}
                      >
                        <div
                          className={`w-[10px] h-[10px] rounded-full ${
                            currentPage === index + 1
                              ? "bg-colorMain"
                              : "bg-gray-400"
                          }`}
                        ></div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
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
