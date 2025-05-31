import React from "react";
import { FaShippingFast, FaUsers } from "react-icons/fa";
import { GiTrophyCup } from "react-icons/gi";
import { TbMedal2 } from "react-icons/tb";

const Quality = () => {
  return (
    <div
      className="mt-7  px-[100px]  py-[30px] flex justify-around mb-5 "
      style={{ background: "#FAF3EA" }}
    >
      <div className="flex gap-3 items-center">
        <div className="text-[40px]">
          <GiTrophyCup />
        </div>
        <div className="flex flex-col ">
          <div className="text-[20px] font-semibold ">Chất lượng cao</div>
          <div>Tạo nên từ nguyên liệu hàng đầu</div>
        </div>
      </div>
      <div className="flex gap-3 items-center ">
        <div className="text-[40px]">
          <TbMedal2 />
        </div>
        <div className="flex flex-col ">
          <div className="text-[20px] font-semibold ">Bảo hành</div>
          <div>Trên 2 năm</div>
        </div>
      </div>
      <div className="flex gap-3 items-center ">
        <div className="text-[40px]">
          <FaShippingFast />
        </div>
        <div className="flex flex-col ">
          <div className="text-[20px] font-semibold ">Miễn phí giao hàng</div>
          <div>Cho đơn hàng từ 100.000 VNĐ</div>
        </div>
      </div>
      <div className="flex gap-3 items-center ">
        <div className="text-[40px]">
          <FaUsers />
        </div>
        <div className="flex flex-col ">
          <div className="text-[20px] font-semibold ">Hỗ trợ 24/7</div>
          <div>Hỗ trợ tận tâm</div>
        </div>
      </div>
    </div>
  );
};

export default Quality;
