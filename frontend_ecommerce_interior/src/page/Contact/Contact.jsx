import React from "react";
import CoverImg from "../../components/Cover/CoverImg";
import { IoLocation, IoTime } from "react-icons/io5";
import { FaPhone } from "react-icons/fa";
import Quality from "../../components/Quality/Quality";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";

const Contact = () => {
  return (
    <div>
      <Header />
      <CoverImg namePage={"Liên hệ"} />
      <div className="px-[300px] mb-16">
        <div className="flex flex-col gap-3 justify-center items-center mt-10 text-center">
          <span className="font-poppins font-semibold text-[25px]">
            Liên Hệ Với Chúng Tôi
          </span>
          <p className="w-[60%] text-gray-400">
            Để biết thêm thông tin về sản phẩm và dịch vụ của chúng tôi, vui
            lòng gửi email cho chúng tôi. Nhân viên của chúng tôi luôn sẵn sàng
            hỗ trợ bạn. Đừng ngần ngại!
          </p>
        </div>

        <div className="flex gap-16 mt-10">
          <div className="w-[30%] flex flex-col gap-10">
            {/* Địa chỉ */}
            <div className="flex gap-3">
              <div className="text-2xl">
                <IoLocation />
              </div>
              <div>
                <span className="font-poppins font-medium text-lg">
                  Địa chỉ
                </span>
                <p>236 5th SE Avenue, New York NY10000, Hoa Kỳ</p>
              </div>
            </div>
            {/* Điện thoại */}
            <div className="flex gap-3">
              <div className="text-2xl">
                <FaPhone />
              </div>
              <div>
                <span className="font-poppins font-medium text-lg">
                  Điện thoại
                </span>
                <p>Di động: +(84) 546-6789</p>
                <p>Hotline: +(84) 456-6789</p>
              </div>
            </div>
            {/* Thời gian làm việc */}
            <div className="flex gap-3">
              <div className="text-2xl">
                <IoTime />
              </div>
              <div>
                <span className="font-poppins font-medium text-lg">
                  Thời gian làm việc
                </span>
                <p>Thứ 2 - Thứ 6: 9:00 - 22:00</p>
                <p>Thứ 7 - Chủ nhật: 9:00 - 21:00</p>
              </div>
            </div>
          </div>

          <div className="flex-1 flex flex-col gap-5 ">
            <div className="flex flex-col gap-2 w-[100%]">
              <span>Họ và tên</span>
              <input
                type="text"
                name=""
                id=""
                className="border border-gray-400 py-[5px] rounded"
              />
            </div>
            <div className="flex flex-col gap-2 w-[100%]">
              <span>Địa chỉ Email</span>
              <input
                type="text"
                name=""
                id=""
                className="border border-gray-400 py-[5px] rounded"
              />
            </div>
            <div className="flex flex-col gap-2 w-[100%]">
              <span>Tiêu đề</span>
              <input
                type="text"
                name=""
                id=""
                className="border border-gray-400 py-[5px] rounded"
              />
            </div>
            <div className="flex flex-col gap-2 w-[100%]">
              <span>Nội dung</span>
              <textarea
                className="border border-gray-400 py-2 px-3 rounded resize-none"
                rows="4"
                placeholder="Nhập tin nhắn..."
              />
            </div>
            <div className="">
              <button className="px-10 py-[7px] bg-colorMain text-white rounded">
                Gửi
              </button>
            </div>
          </div>
        </div>
      </div>

      <Quality />
      <Footer />
    </div>
  );
};

export default Contact;
