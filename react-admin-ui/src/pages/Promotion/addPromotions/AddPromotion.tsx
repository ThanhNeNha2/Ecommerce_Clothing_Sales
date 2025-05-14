import React, { useState } from "react";
import "./AddPromotion.scss";
import { useMutation } from "@tanstack/react-query";

import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { apiCustom } from "../../../custom/customApi";

const AddPromotion = () => {
  // Quản lý thông tin mã giảm giá
  const [promotionInfo, setPromotionInfo] = useState({
    code: "",
    quantity: 0,
    start_date: "",
    end_date: "",
    discount_value: 0,
    discount_type: "percentage",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    field: string
  ) => {
    setPromotionInfo((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  // API CREATE
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: (info: any) => {
      return apiCustom.post("/promotion", info);
    },
    onSuccess: () => {
      toast.success("🎉 Mã giảm giá đã được tạo thành công!");
      navigate("/promotions");
    },
    onError: (error) => {
      toast.error("🚨 Lỗi khi tạo mã giảm giá. Vui lòng thử lại!");
    },
  });

  // Xác nhận tạo mã giảm giá
  const handleConfirm = () => {
    const {
      code,
      quantity,
      start_date,
      end_date,
      discount_value,
      discount_type,
    } = promotionInfo;

    // Kiểm tra thông tin bắt buộc
    if (
      !code.trim() ||
      !quantity ||
      !start_date ||
      !end_date ||
      !discount_value ||
      !discount_type
    ) {
      toast.error("⚠️ Vui lòng điền đầy đủ thông tin tất cả các trường!");
      return;
    }

    // Kiểm tra ngày hợp lệ
    const startDate = new Date(start_date);
    const endDate = new Date(end_date);
    const today = new Date();
    if (startDate > endDate) {
      toast.error("⚠️ Ngày bắt đầu phải nhỏ hơn ngày kết thúc!");
      return;
    }
    if (endDate < today) {
      toast.error("⚠️ Ngày kết thúc không được nhỏ hơn ngày hiện tại!");
      return;
    }

    // Gửi dữ liệu
    mutation.mutate({
      ...promotionInfo,
      start_date: startDate.toISOString(),
      end_date: endDate.toISOString(),
    });
  };

  return (
    <div className="add-promotion">
      <div className="content">
        <h2>Thêm Mã Giảm Giá Mới</h2>
        <hr />
        <div className="form">
          <div className="item">
            <label>Mã Giảm Giá</label>
            <input
              type="text"
              placeholder="Nhập mã giảm giá (VD: SUMMER2025)"
              value={promotionInfo.code}
              onChange={(e) => handleChange(e, "code")}
            />
          </div>
          <div className="item">
            <label>Số Lượng</label>
            <input
              type="number"
              placeholder="Nhập số lượng mã có thể sử dụng"
              value={promotionInfo.quantity}
              onChange={(e) => handleChange(e, "quantity")}
            />
          </div>
          <div className="item">
            <label>Ngày Bắt Đầu</label>
            <input
              type="date"
              value={promotionInfo.start_date}
              onChange={(e) => handleChange(e, "start_date")}
            />
          </div>
          <div className="item">
            <label>Ngày Kết Thúc</label>
            <input
              type="date"
              value={promotionInfo.end_date}
              onChange={(e) => handleChange(e, "end_date")}
            />
          </div>
          <div className="item">
            <label>Giá Trị Giảm Giá</label>
            <input
              type="number"
              placeholder="Nhập giá trị giảm giá (VD: 10 cho 10% hoặc 100000 cho 100.000 VNĐ)"
              value={promotionInfo.discount_value}
              onChange={(e) => handleChange(e, "discount_value")}
            />
          </div>
          <div className="item">
            <label>Loại Giảm Giá</label>
            <select
              value={promotionInfo.discount_type}
              onChange={(e) => handleChange(e, "discount_type")}
            >
              <option value="percentage">Phần trăm (%)</option>
              <option value="fixed">Cố định (VNĐ)</option>
            </select>
          </div>
          <div className="btn">
            <button onClick={handleConfirm}>Xác Nhận</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPromotion;
