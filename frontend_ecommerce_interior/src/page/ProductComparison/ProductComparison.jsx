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
        {/* Chi tiet san pham  */}
        <div className="flex flex-col">
          {/* 1 */}
          <div className="flex border-t ">
            <div className="  w-[calc(100%/4)] px-7 pt-7 pb-4  border-r  ">
              <span className="font-poppins font-medium text-lg">General</span>
            </div>
            <div className="  w-[calc(100%/4)] p-7  border-r">
              <span className="hidden">General</span>
            </div>
            <div className="  w-[calc(100%/4)] p-7   border-r">
              <span className="hidden">General</span>
            </div>
            <div className="  w-[calc(100%/4)] p-7  hidden">
              <span>General</span>
            </div>
          </div>
          {/* 2 */}
          <div className="flex">
            <div className="  w-[calc(100%/4)] px-7 py-3 border-r">
              <span>Sales Package</span>
            </div>
            <div className="  w-[calc(100%/4)] px-7 py-3 border-r ">
              <span>1 sectional sofa</span>
            </div>
            <div className="  w-[calc(100%/4)] px-7 py-3  border-r">
              <span>1 Three Seater, 2 Single Seater</span>
            </div>
            <div className="  w-[calc(100%/4)] px-7 py-3  ">
              <span>...</span>
            </div>
          </div>
          {/*  */}
          <div className="flex">
            <div className="  w-[calc(100%/4)] px-7 py-3 border-r">
              <span>Secondary Material</span>
            </div>
            <div className="  w-[calc(100%/4)] px-7 py-3  border-r">
              <span>Solid Wood</span>
            </div>
            <div className="  w-[calc(100%/4)] px-7 py-3 border-r ">
              <span>Solid Wood</span>
            </div>
            <div className="  w-[calc(100%/4)] px-7 py-3  ">
              <span>...</span>
            </div>
          </div>
          {/* 3 */}
          <div className="flex">
            <div className="  w-[calc(100%/4)] px-7 py-3 border-r">
              <span>Configuration</span>
            </div>
            <div className="  w-[calc(100%/4)] px-7 py-3  border-r">
              <span>TFCBLIGRBL6SRHS</span>
            </div>
            <div className="  w-[calc(100%/4)] px-7 py-3 border-r ">
              <span>DTUBLIGRBL568</span>
            </div>
            <div className="  w-[calc(100%/4)] px-7 py-3  ">
              <span>...</span>
            </div>
          </div>
          {/* 4 */}
          <div className="flex">
            <div className="  w-[calc(100%/4)] px-7 py-3 border-r">
              <span>Configuration</span>
            </div>
            <div className="  w-[calc(100%/4)] px-7 py-3  border-r">
              <span>L-shaped</span>
            </div>
            <div className="  w-[calc(100%/4)] px-7 py-3 border-r ">
              <span>L-shaped</span>
            </div>
            <div className="  w-[calc(100%/4)] px-7 py-3  ">
              <span>...</span>
            </div>
          </div>

          {/* 5 */}
          <div className="flex">
            <div className="  w-[calc(100%/4)] px-7 py-3 border-r">
              <span>Upholstery Material</span>
            </div>
            <div className="  w-[calc(100%/4)] px-7 py-3  border-r">
              <span>Fabric + Cotton</span>
            </div>
            <div className="  w-[calc(100%/4)] px-7 py-3 border-r ">
              <span>Fabric + Cotton</span>
            </div>
            <div className="  w-[calc(100%/4)] px-7 py-3  ">
              <span>...</span>
            </div>
          </div>

          {/* 6 */}
          <div className="flex ">
            <div className="  w-[calc(100%/4)] px-7 py-3 border-r">
              <span className="   m-auto">Upholstery Color</span>
            </div>
            <div className="  w-[calc(100%/4)] px-7 py-3  border-r">
              <span>Bright Grey & Lion</span>
            </div>
            <div className="  w-[calc(100%/4)] px-7 py-3 border-r ">
              <span>Bright Grey & Lion</span>
            </div>
            <div className="  w-[calc(100%/4)] px-7 py-3  ">
              <span>...</span>
            </div>
          </div>

          {/* ****  VER 2 **** */}

          {/* 1 */}
          <div className="flex  ">
            <div className="  w-[calc(100%/4)] px-7 pt-16 pb-4 border-r  ">
              <span className="font-poppins font-medium text-xl">Product</span>
            </div>
            <div className="  w-[calc(100%/4)] p-7  border-r">
              <span className="hidden">General</span>
            </div>
            <div className="  w-[calc(100%/4)] p-7   border-r">
              <span className="hidden">General</span>
            </div>
            <div className="  w-[calc(100%/4)] p-7  hidden">
              <span>General</span>
            </div>
          </div>
          {/* 2 */}
          <div className="flex">
            <div className="  w-[calc(100%/4)] px-7 py-3 border-r">
              <span>Filling Material</span>
            </div>
            <div className="  w-[calc(100%/4)] px-7 py-3 border-r ">
              <span>Foam</span>
            </div>
            <div className="  w-[calc(100%/4)] px-7 py-3  border-r">
              <span>Matter</span>
            </div>
            <div className="  w-[calc(100%/4)] px-7 py-3  ">
              <span>...</span>
            </div>
          </div>
          {/* 3 */}
          <div className="flex">
            <div className="  w-[calc(100%/4)] px-7 py-3 border-r">
              <span>Finish Type</span>
            </div>
            <div className="  w-[calc(100%/4)] px-7 py-3  border-r">
              <span>Bright Grey & Lion</span>
            </div>
            <div className="  w-[calc(100%/4)] px-7 py-3 border-r ">
              <span>Bright Grey & Lion</span>
            </div>
            <div className="  w-[calc(100%/4)] px-7 py-3  ">
              <span>...</span>
            </div>
          </div>
          {/* 4 */}
          <div className="flex">
            <div className="  w-[calc(100%/4)] px-7 py-3 border-r">
              <span>Adjustable Headrest</span>
            </div>
            <div className="  w-[calc(100%/4)] px-7 py-3  border-r">
              <span>No</span>
            </div>
            <div className="  w-[calc(100%/4)] px-7 py-3 border-r ">
              <span>Yes</span>
            </div>
            <div className="  w-[calc(100%/4)] px-7 py-3  ">
              <span>...</span>
            </div>
          </div>
          {/* 5 */}
          <div className="flex">
            <div className="  w-[calc(100%/4)] px-7 py-3 border-r">
              <span>Maximum Load Capacity</span>
            </div>
            <div className="  w-[calc(100%/4)] px-7 py-3  border-r">
              <span>280 KG</span>
            </div>
            <div className="  w-[calc(100%/4)] px-7 py-3 border-r ">
              <span>280 KG</span>
            </div>
            <div className="  w-[calc(100%/4)] px-7 py-3  ">
              <span>...</span>
            </div>
          </div>
          {/* 6 */}
          <div className="flex">
            <div className="  w-[calc(100%/4)] px-7 py-3 border-r">
              <span>Origin of Manufacture</span>
            </div>
            <div className="  w-[calc(100%/4)] px-7 py-3  border-r">
              <span>India</span>
            </div>
            <div className="  w-[calc(100%/4)] px-7 py-3 border-r ">
              <span>India</span>
            </div>
            <div className="  w-[calc(100%/4)] px-7 py-3  ">
              <span>...</span>
            </div>
          </div>

          {/* ****  VER 3 **** */}

          {/* 1 */}
          <div className="flex  ">
            <div className="  w-[calc(100%/4)] px-7 pt-16 pb-4 border-r  ">
              <span className="font-poppins font-medium text-xl">
                Dimensions
              </span>
            </div>
            <div className="  w-[calc(100%/4)] p-7  border-r">
              <span className="hidden">General</span>
            </div>
            <div className="  w-[calc(100%/4)] p-7   border-r">
              <span className="hidden">General</span>
            </div>
            <div className="  w-[calc(100%/4)] p-7  hidden">
              <span>General</span>
            </div>
          </div>
          {/* 2 */}
          <div className="flex">
            <div className="  w-[calc(100%/4)] px-7 py-3 border-r">
              <span>Width</span>
            </div>
            <div className="  w-[calc(100%/4)] px-7 py-3 border-r ">
              <span>265.32 cm</span>
            </div>
            <div className="  w-[calc(100%/4)] px-7 py-3  border-r">
              <span>265.32 cm</span>
            </div>
            <div className="  w-[calc(100%/4)] px-7 py-3  ">
              <span>...</span>
            </div>
          </div>
          {/* 3 */}
          <div className="flex">
            <div className="  w-[calc(100%/4)] px-7 py-3 border-r">
              <span>Hight</span>
            </div>
            <div className="  w-[calc(100%/4)] px-7 py-3  border-r">
              <span>65 cm</span>
            </div>
            <div className="  w-[calc(100%/4)] px-7 py-3 border-r ">
              <span>65 cm</span>
            </div>
            <div className="  w-[calc(100%/4)] px-7 py-3  ">
              <span>...</span>
            </div>
          </div>
          {/* 4 */}
          <div className="flex">
            <div className="  w-[calc(100%/4)] px-7 py-3 border-r">
              <span>Depth</span>
            </div>
            <div className="  w-[calc(100%/4)] px-7 py-3  border-r">
              <span>167.76 cm</span>
            </div>
            <div className="  w-[calc(100%/4)] px-7 py-3 border-r ">
              <span>167.76 cm</span>
            </div>
            <div className="  w-[calc(100%/4)] px-7 py-3  ">
              <span>...</span>
            </div>
          </div>
          {/* 5 */}
          <div className="flex">
            <div className="  w-[calc(100%/4)] px-7 py-3 border-r">
              <span>Weight</span>
            </div>
            <div className="  w-[calc(100%/4)] px-7 py-3  border-r">
              <span>65 KG</span>
            </div>
            <div className="  w-[calc(100%/4)] px-7 py-3 border-r ">
              <span>65 KG</span>
            </div>
            <div className="  w-[calc(100%/4)] px-7 py-3  ">
              <span>...</span>
            </div>
          </div>
          {/* 6 */}
          <div className="flex">
            <div className="  w-[calc(100%/4)] px-7 py-3 border-r">
              <span>Seat Height</span>
            </div>
            <div className="  w-[calc(100%/4)] px-7 py-3  border-r">
              <span>41.52 cm</span>
            </div>
            <div className="  w-[calc(100%/4)] px-7 py-3 border-r ">
              <span>41.52 cm</span>
            </div>
            <div className="  w-[calc(100%/4)] px-7 py-3  ">
              <span>...</span>
            </div>
          </div>
          {/* 7 */}
          <div className="flex">
            <div className="  w-[calc(100%/4)] px-7 py-3 border-r">
              <span>Leg Height</span>
            </div>
            <div className="  w-[calc(100%/4)] px-7 py-3  border-r">
              <span>5.46 cm</span>
            </div>
            <div className="  w-[calc(100%/4)] px-7 py-3 border-r ">
              <span>5.46 cm</span>
            </div>
            <div className="  w-[calc(100%/4)] px-7 py-3  ">
              <span>...</span>
            </div>
          </div>

          {/* ****  VER 3 **** */}

          {/* 1 */}
          <div className="flex  ">
            <div className="  w-[calc(100%/4)] px-7 pt-16 pb-4 border-r  ">
              <span className="font-poppins font-medium text-xl">Warranty</span>
            </div>
            <div className="  w-[calc(100%/4)] p-7  border-r">
              <span className="hidden">General</span>
            </div>
            <div className="  w-[calc(100%/4)] p-7   border-r">
              <span className="hidden">General</span>
            </div>
            <div className="  w-[calc(100%/4)] p-7  hidden">
              <span>General</span>
            </div>
          </div>
          {/* 2 */}
          <div className="flex">
            <div className="  w-[calc(100%/4)] px-7 py-3 border-r">
              <span>Warranty Summary</span>
            </div>
            <div className="  w-[calc(100%/4)] px-7 py-3 border-r ">
              <span>1 Year Manufacturing Warranty</span>
            </div>
            <div className="  w-[calc(100%/4)] px-7 py-3  border-r">
              <span>1 Year Manufacturing Warranty</span>
            </div>
            <div className="  w-[calc(100%/4)] px-7 py-3  ">
              <span>...</span>
            </div>
          </div>
          {/* 3 */}
          <div className="flex">
            <div className="  w-[calc(100%/4)] px-7 py-3 border-r">
              <span>Warranty Service Type</span>
            </div>
            <div className="  w-[calc(100%/4)] px-7 py-3  border-r">
              <span>For Warranty Claims or Any Product Related </span>
            </div>
            <div className="  w-[calc(100%/4)] px-7 py-3 border-r ">
              <span>
                For Warranty Claims or Any Product Related Issues Please Email
                at support@xyz.com
              </span>
            </div>
            <div className="  w-[calc(100%/4)] px-7 py-3  ">
              <span>...</span>
            </div>
          </div>
          {/* 4 */}
          <div className="flex">
            <div className="  w-[calc(100%/4)] px-7 py-3 border-r">
              <span>Covered in Warranty</span>
            </div>
            <div className="  w-[calc(100%/4)] px-7 py-3  border-r">
              <span>Warranty Against Manufacturing Defect</span>
            </div>
            <div className="  w-[calc(100%/4)] px-7 py-3 border-r ">
              <span>
                Warranty of the product is limited to manufacturing defects
                only.
              </span>
            </div>
            <div className="  w-[calc(100%/4)] px-7 py-3  ">
              <span>...</span>
            </div>
          </div>
          {/* 5 */}
          <div className="flex">
            <div className="  w-[calc(100%/4)] px-7 py-3 border-r">
              <span>Not Covered in Warranty</span>
            </div>
            <div className="  w-[calc(100%/4)] px-7 py-3  border-r">
              <span>
                The Warranty Does Not Cover Damages Due To Usage Of The Product
                Beyond Its Intended Use And Wear & Tear In The Natural Course Of
                Product Usage.
              </span>
            </div>
            <div className="  w-[calc(100%/4)] px-7 py-3 border-r ">
              <span>
                The Warranty Does Not Cover Damages Due To Usage Of The Product
                Beyond Its Intended Use And Wear & Tear In The Natural Course Of
                Product Usage.
              </span>
            </div>
            <div className="  w-[calc(100%/4)] px-7 py-3  ">
              <span>...</span>
            </div>
          </div>
          {/* 6 */}
          <div className="flex">
            <div className="  w-[calc(100%/4)] px-7 py-3 border-r">
              <span>Domestic Warranty</span>
            </div>
            <div className="  w-[calc(100%/4)] px-7 py-3  border-r">
              <span>1 Year</span>
            </div>
            <div className="  w-[calc(100%/4)] px-7 py-3 border-r ">
              <span>3 Months</span>
            </div>
            <div className="  w-[calc(100%/4)] px-7 py-3  ">
              <span>...</span>
            </div>
          </div>
          {/* 6 */}
          <div className="flex">
            <div className="  w-[calc(100%/4)] px-7 py-3 border-r">
              <span hidden>Domestic Warranty</span>
            </div>
            <div className="  w-[calc(100%/4)] px-7 py-3  border-r ">
              <button className="py-2 px-5 bg-colorMain text-white">
                Add To Cart{" "}
              </button>
            </div>
            <div className="  w-[calc(100%/4)] px-7 py-3  border-r ">
              <button className="py-2 px-5 bg-colorMain text-white">
                Add To Cart{" "}
              </button>
            </div>
            <div className="  w-[calc(100%/4)] px-7 py-3  ">
              <span></span>
            </div>
          </div>
        </div>
      </div>
      <Quality />
      <Footer />
    </div>
  );
};

export default ProductComparison;
