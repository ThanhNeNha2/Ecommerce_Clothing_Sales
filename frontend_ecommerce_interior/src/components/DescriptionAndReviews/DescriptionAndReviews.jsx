import React, { useState } from "react";
import { RiInstagramFill } from "react-icons/ri";
import { BsTwitter } from "react-icons/bs";
import { FaFacebook } from "react-icons/fa";

const DescriptionAndReviews = ({ description }) => {
  const [activeTab, setActiveTab] = useState("Description");

  const renderContent = () => {
    switch (activeTab) {
      case "Description":
        return description ? (
          <div
            className="prose max-w-full overflow-auto contentBlog"
            dangerouslySetInnerHTML={{ __html: description }}
          />
        ) : (
          <p className="text-gray-500">Không có mô tả</p>
        );
      case "Additional Information":
        return (
          <div className="text-gray-500 leading-7">
            <p>Đây là thông tin bổ sung về sản phẩm.</p>
            <ul className="list-disc pl-5 mt-2">
              <li>Chất liệu: Cotton, Polyester</li>
              <li>Kích thước: S, M, L</li>
              <li>Xuất xứ: Việt Nam</li>
              <li>Hướng dẫn bảo quản: Giặt máy ở nhiệt độ dưới 30°C</li>
            </ul>
          </div>
        );
      case "Reviews":
        return (
          <div className="text-gray-500 leading-7">
            <p className="mb-4">Đánh giá từ khách hàng (5 đánh giá):</p>
            <div className="flex flex-col gap-4">
              <div className="border-b pb-2">
                <div className="flex items-center gap-2">
                  <span className="font-medium">Nguyen Van A</span>
                  <span className="text-yellow-500">★★★★★</span>
                </div>
                <p className="text-sm mt-1">
                  Sản phẩm rất đẹp, chất lượng tốt! Giao hàng nhanh.
                </p>
                <p className="text-xs text-gray-400">Ngày 10/05/2025</p>
              </div>
              <div className="border-b pb-2">
                <div className="flex items-center gap-2">
                  <span className="font-medium">Tran Thi B</span>
                  <span className="text-yellow-500">★★★★☆</span>
                </div>
                <p className="text-sm mt-1">
                  Hài lòng, nhưng kích thước hơi nhỏ so với mong đợi.
                </p>
                <p className="text-xs text-gray-400">Ngày 08/05/2025</p>
              </div>
            </div>
            <button className="mt-4 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
              Xem thêm đánh giá
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="mt-[30px] px-[130px] flex flex-col gap-5">
      <div className="flex gap-5 justify-center">
        <button
          className={`font-poppins font-medium text-[20px] ${
            activeTab === "Description" ? "text-black" : "text-gray-400"
          } hover:text-black transition-colors`}
          onClick={() => setActiveTab("Description")}
        >
          Description
        </button>
        <button
          className={`font-poppins font-medium text-[20px] ${
            activeTab === "Additional Information"
              ? "text-black"
              : "text-gray-400"
          } hover:text-black transition-colors`}
          onClick={() => setActiveTab("Additional Information")}
        >
          Additional Information
        </button>
        <button
          className={`font-poppins font-medium text-[20px] ${
            activeTab === "Reviews" ? "text-black" : "text-gray-400"
          } hover:text-black transition-colors`}
          onClick={() => setActiveTab("Reviews")}
        >
          Reviews [5]
        </button>
      </div>
      <div className="leading-7 px-28 text-gray-500">{renderContent()}</div>
    </div>
  );
};

export default DescriptionAndReviews;
