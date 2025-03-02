import React from "react";
import Header from "../../components/Header/Header";
import CoverImg from "../../components/Cover/CoverImg";
import Quality from "../../components/Quality/Quality";
import Footer from "../../components/Footer/Footer";
import { IoStar, IoStarHalf } from "react-icons/io5";

const ProductComparison = () => {
  const provinces = [
    "An Giang",
    "Bà Rịa - Vũng Tàu",
    "Bắc Giang",
    "Bắc Kạn",
    "Bạc Liêu",
    "Bắc Ninh",
    "Bến Tre",
    "Bình Định",
    "Bình Dương",
    "Bình Phước",
    "Bình Thuận",
    "Cà Mau",
    "Cần Thơ",
    "Cao Bằng",
    "Đà Nẵng",
    "Đắk Lắk",
    "Đắk Nông",
    "Điện Biên",
    "Đồng Nai",
    "Đồng Tháp",
    "Gia Lai",
    "Hà Giang",
    "Hà Nam",
    "Hà Nội",
    "Hà Tĩnh",
    "Hải Dương",
    "Hải Phòng",
    "Hậu Giang",
    "Hòa Bình",
    "Hưng Yên",
    "Khánh Hòa",
    "Kiên Giang",
    "Kon Tum",
    "Lai Châu",
    "Lâm Đồng",
    "Lạng Sơn",
    "Lào Cai",
    "Long An",
    "Nam Định",
    "Nghệ An",
    "Ninh Bình",
    "Ninh Thuận",
    "Phú Thọ",
    "Phú Yên",
    "Quảng Bình",
    "Quảng Nam",
    "Quảng Ngãi",
    "Quảng Ninh",
    "Quảng Trị",
    "Sóc Trăng",
    "Sơn La",
    "Tây Ninh",
    "Thái Bình",
    "Thái Nguyên",
    "Thanh Hóa",
    "Thừa Thiên Huế",
    "Tiền Giang",
    "TP. Hồ Chí Minh",
    "Trà Vinh",
    "Tuyên Quang",
    "Vĩnh Long",
    "Vĩnh Phúc",
    "Yên Bái",
  ];
  return (
    <div>
      <Header />
      <CoverImg namePage={"Product Comparison"} />
      <div className="px-[70px] mt-10">
        {/* ở trên  */}
        <div className="flex">
          {/* dong chu  */}
          <div className="  w-[calc(100%/4)] p-7 flex flex-col gap-3">
            <span className="font-poppins font-medium text-2xl">
              Go to Product page for more Products
            </span>
            <span className="underline text-underline-offset-[10px]">
              View More
            </span>
          </div>
          {/* anh san pham */}
          <div className="  w-[calc(100%/4)]  p-7">
            <div className="w-full h-[200px] rounded">
              <img
                src="https://images.pexels.com/photos/8581013/pexels-photo-8581013.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt=""
                className="w-full h-full object-cover object-bottom rounded"
              />
            </div>
            <div className=" flex-1 flex flex-col gap-1">
              <span className="font-poppins text-[22px] font-medium">
                Asgaard sofa
              </span>
              <p className="font-poppins text-[15px] text-gray-400">
                {" "}
                Rs. 250,000.00
              </p>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1 text-yellow-500 text-[14px]">
                  <IoStar />
                  <IoStar />
                  <IoStar />
                  <IoStar />
                  <IoStarHalf />
                </div>
                <div className="border border-gray-300 h-[20px]"></div>
                <span className="text-[12px] text-gray-400">
                  5 Customer Review
                </span>
              </div>
            </div>
          </div>
          {/* anh san pham */}
          <div className="  w-[calc(100%/4)]  p-7">
            <div className="w-full h-[200px] rounded">
              <img
                src="https://images.pexels.com/photos/8581013/pexels-photo-8581013.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt=""
                className="w-full h-full object-cover object-bottom rounded"
              />
            </div>
            <div className=" flex-1 flex flex-col gap-1">
              <span className="font-poppins text-[22px] font-medium">
                Asgaard sofa
              </span>
              <p className="font-poppins text-[15px] text-gray-400">
                {" "}
                Rs. 250,000.00
              </p>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1 text-yellow-500 text-[14px]">
                  <IoStar />
                  <IoStar />
                  <IoStar />
                  <IoStar />
                  <IoStarHalf />
                </div>
                <div className="border border-gray-300 h-[20px]"></div>
                <span className="text-[12px] text-gray-400">
                  5 Customer Review
                </span>
              </div>
            </div>
          </div>
          {/* select san pham  */}
          <div className="  w-[calc(100%/4)] p-7 flex flex-col gap-3">
            <span className="font-poppins font-medium text-xl">
              Add A Product
            </span>

            <select className="  w-[70%] py-[6px] bg-colorMain border-none text-white font-medium px-3 rounded">
              <option value="">Choose a Product</option>
              {provinces.map((province) => (
                <option key={province} value={province}>
                  {province}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <Quality />
      <Footer />
    </div>
  );
};

export default ProductComparison;
