import React from "react";
import Header from "../../components/Header/Header";
import { MdKeyboardArrowRight } from "react-icons/md";
import { signBlog } from "../../services/fakeApi";
import { BsCalendar2DateFill } from "react-icons/bs";

const DetailBlog = () => {
  return (
    <div className="flex flex-col">
      <Header />
      <div
        className="flex h-[55px] mt-[60px] items-center px-[130px] gap-3"
        style={{
          background: "#F9F1E7",
        }}
      >
        <div className="flex items-center">
          <span>Home</span> <MdKeyboardArrowRight />
        </div>

        <div className="flex items-center">
          <span>Shop</span> <MdKeyboardArrowRight />
        </div>
        <div>
          <span className="font-medium">Asgaard sofa</span>
        </div>
      </div>
      {/*  cụm thông tin   */}
      <div className=" px-[170px] mt-5 flex">
        {/* Cụm Trái */}
        <div className="flex-[2] rounded border px-3 py-3">
          <div className="py-3 flex justify-center mb-3">
            <span className=" font-poppins font-semibold text-xl  ">
              Sản phẩm gợi ý{" "}
            </span>
          </div>
          <div className="flex flex-col gap-3">
            <div className=" flex flex-col items-center gap-2">
              <div>
                <img
                  src="https://images.pexels.com/photos/15533645/pexels-photo-15533645/free-photo-of-dining-room-interior.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt=""
                />
              </div>
              <span className=" font-medium">Ghế Sofa Giường kéo SG01</span>
              <span className="text-orange-400 font-medium">9.800.000đ</span>
            </div>
            <hr />
            <div className=" flex flex-col items-center gap-2">
              <div>
                <img
                  src="https://images.pexels.com/photos/15533645/pexels-photo-15533645/free-photo-of-dining-room-interior.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt=""
                />
              </div>
              <span className=" font-medium">Ghế Sofa Giường kéo SG01</span>
              <span className="text-orange-400 font-medium">9.800.000đ</span>
            </div>
          </div>
        </div>
        {/* Cụm phải */}
        <div className="flex-[5] px-3 py-1 flex flex-col gap-2">
          <h1 className="font-poppins font-semibold text-2xl">
            {signBlog.titleBlog}
          </h1>
          <div className="flex items-center gap-1 text-gray-500">
            <BsCalendar2DateFill /> Ngày đăng: {signBlog.postDate}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailBlog;
