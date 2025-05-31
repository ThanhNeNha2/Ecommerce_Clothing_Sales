import React from "react";

const Footer = () => {
  return (
    <div className="border-t border-gray-200">
      <div className="py-10 mx-[150px] flex gap-20 border-b border-gray-200">
        <div className="flex flex-col gap-10">
          <h1 className="font-poppins font-bold text-[20px]">TRENDORY.</h1>
          <span className="text-[16px]  text-gray-400">
            400 University Drive Suite 200 Coral Gables, FL 33134 USA
          </span>
        </div>
        <div>
          <ul className="flex flex-col gap-10">
            <li className="font-poppins font-medium text-[16px] text-gray-400">
              Liên kết
            </li>
            <li className="font-poppins font-medium text-[16px]">Trang chủ</li>
            <li className="font-poppins font-medium text-[16px]">Cửa hàng</li>
            <li className="font-poppins font-medium text-[16px]">Giới thiệu</li>
            <li className="font-poppins font-medium text-[16px]">Liên hệ</li>
          </ul>
        </div>
        <div>
          <ul className="flex flex-col gap-10">
            <li className="font-poppins font-medium text-[16px] text-gray-400">
              Hỗ trợ
            </li>
            <li className="font-poppins font-medium text-[16px]">
              Phương thức thanh toán
            </li>
            <li className="font-poppins font-medium text-[16px]">
              Chính sách đổi trả
            </li>
            <li className="font-poppins font-medium text-[16px]">
              Chính sách bảo mật
            </li>
          </ul>
        </div>
        <div className="flex flex-col gap-10">
          <span className="font-poppins font-medium text-[16px] text-gray-400">
            Nhận tin
          </span>
          <div className="flex">
            <input
              type="text"
              className="py-1 px-2 ring-1 ring-gray-300"
              placeholder="Nhập email của bạn"
            />
            <button className="py-1 px-2 text-sm font-medium bg-gray-300 ring-1 ring-gray-300">
              ĐĂNG KÝ
            </button>
          </div>
        </div>
      </div>
      <div className="mx-[150px] py-5">
        <span className="text-[16px]">2025 trendory. Đã đăng ký bản quyền</span>
      </div>
    </div>
  );
};

export default Footer;
