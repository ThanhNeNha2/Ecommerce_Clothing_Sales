import React, { useEffect, useState } from "react";
import "./UpdatePromotion.scss";
import { useMutation, useQuery } from "@tanstack/react-query";
import { parseISO, isAfter, isBefore, startOfDay, format } from "date-fns";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { apiCustom } from "../../../custom/customApi";

const UpdatePromotion = () => {
  // Quản lý thông tin mã giảm giá
  const [promotionInfo, setPromotionInfo] = useState({
    code: "",
    maxUses: 0,
    start_date: "",
    description: "",
    end_date: "",
    discount_value: 0,
    discount_type: "percentage",
  });

  const { id } = useParams();

  // Lấy dữ liệu mã giảm giá từ API
  const { isLoading, data, error } = useQuery({
    queryKey: ["singlePromotion", id],
    queryFn: () => apiCustom.get(`/promotions/${id}`).then((res) => res.data),
  });

  // Cập nhật promotionInfo khi dữ liệu từ API được tải
  useEffect(() => {
    if (data) {
      const promotionData = data.promotion || data; // Kiểm tra cấu trúc dữ liệu từ API
      setPromotionInfo({
        code: promotionData?.code || "",
        description: promotionData?.description || "",
        maxUses: promotionData?.maxUses || 0,
        start_date: promotionData?.start_date
          ? format(new Date(promotionData.start_date), "yyyy-MM-dd")
          : "",
        end_date: promotionData?.end_date
          ? format(new Date(promotionData.end_date), "yyyy-MM-dd")
          : "",
        discount_value: promotionData?.discount_value || 0,
        discount_type: promotionData?.discount_type || "percentage",
      });
    }
  }, [data]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
    field: string
  ) => {
    setPromotionInfo((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  // API UPDATE
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: (info: any) => {
      return apiCustom.put(`/promotions/${id}`, info);
    },
    onSuccess: () => {
      toast.success("🎉 Mã giảm giá đã được cập nhật thành công!");
      navigate("/promotions");
    },
    onError: (error: any) => {
      toast.error(
        `🚨 Lỗi khi cập nhật mã giảm giá: ${
          error.response?.data?.message || "Vui lòng thử lại!"
        }`
      );
    },
  });

  // Xác nhận cập nhật mã giảm giá
  const handleConfirm = () => {
    const {
      code,
      maxUses,
      start_date,
      end_date,
      description,
      discount_value,
      discount_type,
    } = promotionInfo;

    // Kiểm tra thông tin bắt buộc
    if (
      !code.trim() ||
      !maxUses ||
      !start_date ||
      !end_date ||
      !description ||
      !discount_value ||
      !discount_type
    ) {
      toast.error("⚠️ Vui lòng điền đầy đủ thông tin tất cả các trường!");
      return;
    }

    // Kiểm tra mã giảm giá
    if (!/^[A-Z0-9]+$/.test(code.trim())) {
      toast.error(
        "⚠️ Mã giảm giá chỉ được chứa chữ cái in hoa và số, không có khoảng trắng hoặc ký tự đặc biệt!"
      );
      return;
    }

    // Kiểm tra số lượng
    if (maxUses <= 0) {
      toast.error("⚠️ Số lượng phải lớn hơn 0!");
      return;
    }

    // Kiểm tra giá trị giảm giá
    if (discount_value <= 0) {
      toast.error("⚠️ Giá trị giảm giá phải lớn hơn 0!");
      return;
    }
    if (discount_type === "percentage" && discount_value > 100) {
      toast.error("⚠️ Giá trị giảm giá không được lớn hơn 100%!");
      return;
    }

    // Giả sử start_date và end_date là chuỗi từ date picker (YYYY-MM-DD)
    const startDate = parseISO(start_date);
    const endDate = parseISO(end_date);
    const today = startOfDay(new Date()); // Lấy đầu ngày hôm nay (15/05/2025)

    if (
      !startDate ||
      !endDate ||
      isNaN(startDate.getTime()) ||
      isNaN(endDate.getTime())
    ) {
      toast.error("⚠️ Ngày không hợp lệ!");
      return;
    }

    if (isAfter(startDate, endDate)) {
      toast.error("⚠️ Ngày bắt đầu phải nhỏ hơn hoặc bằng ngày kết thúc!");
      return;
    }

    if (isBefore(endDate, today)) {
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

  // Định dạng ngày hiện tại (15/05/2025) thành YYYY-MM-DD để đặt giá trị min cho input date
  const todayFormatted = format(new Date(), "yyyy-MM-dd");

  // Hiển thị trạng thái loading hoặc lỗi
  if (isLoading) {
    return <div className="add-promotion">Đang tải dữ liệu...</div>;
  }

  if (error || !data) {
    return (
      <div className="add-promotion">
        Lỗi khi tải dữ liệu mã giảm giá:{" "}
        {(error as Error)?.message || "Không tìm thấy mã giảm giá!"}
      </div>
    );
  }

  return (
    <div className="add-promotion">
      <div className="content">
        <h2>Cập Nhật Mã Giảm Giá</h2>
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
              value={promotionInfo.maxUses || ""}
              onChange={(e) => handleChange(e, "maxUses")}
              min="1"
            />
          </div>
          <div className="item">
            <label>Description</label>
            <textarea
              placeholder="Nhập mô tả mã có thể sử dụng"
              value={promotionInfo.description || ""}
              onChange={(e) => handleChange(e, "description")}
              rows={4}
              className="w-full p-2 border rounded resize-none"
            ></textarea>
          </div>
          <div className="item">
            <label>Ngày Bắt Đầu</label>
            <input
              type="date"
              value={promotionInfo.start_date}
              onChange={(e) => handleChange(e, "start_date")}
              min={todayFormatted}
            />
          </div>
          <div className="item">
            <label>Ngày Kết Thúc</label>
            <input
              type="date"
              value={promotionInfo.end_date}
              onChange={(e) => handleChange(e, "end_date")}
              min={promotionInfo.start_date || todayFormatted}
            />
          </div>
          <div className="item">
            <label>Giá Trị Giảm Giá</label>
            <input
              type="number"
              placeholder={
                promotionInfo.discount_type === "percentage"
                  ? "Nhập phần trăm giảm (VD: 10 cho 10%)"
                  : "Nhập số tiền giảm (VD: 100000 cho 100.000 VNĐ)"
              }
              value={promotionInfo.discount_value || ""}
              onChange={(e) => handleChange(e, "discount_value")}
              min="1"
              max={
                promotionInfo.discount_type === "percentage" ? "100" : undefined
              }
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

export default UpdatePromotion;
