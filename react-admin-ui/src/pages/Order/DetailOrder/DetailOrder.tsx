import React, { useEffect, useState } from "react";
import "./DetailOrder.scss";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { apiCustom } from "../../../custom/customApi";

const DetailOrder = () => {
  const { id } = useParams();
  const [singleOrder, setSingleOrder] = useState(null);

  const { isLoading, data, error } = useQuery({
    queryKey: [`order${id}`],
    queryFn: () => apiCustom.get(`/orders/${id}`).then((res) => res.data),
  });
  console.log("check data ", data);

  useEffect(() => {
    if (data?.order) {
      setSingleOrder(data.order);
    }
  }, [data]);
  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "delivered":
        return "status-delivered";
      case "pending":
        return "status-pending";
      case "processing":
        return "status-processing";
      case "cancelled":
        return "status-cancelled";
      default:
        return "status-default";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "delivered":
        return "Đã giao hàng";
      case "pending":
        return "Chờ xử lý";
      case "processing":
        return "Đang xử lý";
      case "cancelled":
        return "Đã hủy";
      default:
        return status;
    }
  };

  const getPaymentStatusText = (status: any) => {
    switch (status) {
      case "completed":
        return "Đã thanh toán";
      case "pending":
        return "Chờ thanh toán";
      case "failed":
        return "Thanh toán thất bại";
      default:
        return status;
    }
  };

  const getPaymentMethodText = (method) => {
    switch (method) {
      case "cash":
        return "Tiền mặt";
      case "card":
        return "Thẻ tín dụng";
      case "bank_transfer":
        return "Chuyển khoản";
      default:
        return method;
    }
  };

  const calculateSubtotal = () => {
    return singleOrder?.order_items?.reduce(
      (total, item) => total + item.price,
      0
    );
  };

  return (
    <div className="detail-order">
      <div className="detail-order__container">
        {/* Header */}
        <div className="detail-order__header">
          <h1 className="detail-order__title">Chi tiết đơn hàng</h1>
          <div className="detail-order__order-id">
            Mã đơn hàng: <span>#{singleOrder?._id || "N/A"}</span>
          </div>
        </div>

        {/* Order Status & Info */}
        <div className="detail-order__status-section">
          <div className="detail-order__status-card">
            <div className="status-info">
              <h3>Trạng thái đơn hàng</h3>
              <span
                className={`status-badge ${getStatusClass(
                  singleOrder?.status
                )}`}
              >
                {getStatusText(singleOrder?.status)}
              </span>
            </div>
            <div className="payment-info">
              <h3>Thanh toán</h3>
              <div className="payment-details">
                <span className="payment-method">
                  {getPaymentMethodText(singleOrder?.payment_method)}
                </span>
                <span
                  className={`payment-status ${
                    singleOrder?.payment_status === "completed"
                      ? "completed"
                      : "pending"
                  }`}
                >
                  {getPaymentStatusText(singleOrder?.payment_status)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Order Items */}
        <div className="detail-order__items-section">
          <h2 className="section-title">Sản phẩm đã đặt</h2>
          <div className="items-list">
            {singleOrder?.order_items?.map((item, index) => (
              <div key={item?._id} className="item-card">
                <div className="item-image">
                  <img
                    src={item.product_id.image_url[0]}
                    alt={item.product_id.nameProduct}
                    onError={(e) => {
                      e.target.src =
                        "https://via.placeholder.com/150x150?text=No+Image";
                    }}
                  />
                </div>
                <div className="item-details">
                  <h3 className="item-name">{item.product_id.nameProduct}</h3>
                  <div className="item-meta">
                    <span className="item-category">
                      {item.product_id.mainCategory} -{" "}
                      {item.product_id.subCategory.join(", ")}
                    </span>
                    <span className="item-size">Size: {item.size_id.name}</span>
                  </div>
                  <div className="item-pricing">
                    <span className="item-quantity">
                      Số lượng: {item.quantity}
                    </span>
                    <span className="item-price">
                      {formatPrice(item.price)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className="detail-order__summary-section">
          <h2 className="section-title">Tổng kết đơn hàng</h2>
          <div className="summary-card">
            <div className="summary-row">
              <span>Tổng tiền hàng:</span>
              <span>{formatPrice(calculateSubtotal())}</span>
            </div>
            {singleOrder?.promotion_id && (
              <div className="summary-row promotion">
                <span>Mã giảm giá ({singleOrder?.promotion_id.code}):</span>
                <span className="discount">
                  -{formatPrice(singleOrder?.promotion_id.discount_value)}
                </span>
              </div>
            )}
            <div className="summary-row total">
              <span>Tổng cộng:</span>
              <span>{formatPrice(singleOrder?.final_amount)}</span>
            </div>
          </div>
        </div>

        {/* Shipping & Additional Info */}
        <div className="detail-order__info-section">
          <div className="info-grid">
            <div className="info-card">
              <h3>Địa chỉ giao hàng</h3>
              <p>{singleOrder?.shipping_address}</p>
            </div>
            <div className="info-card">
              <h3>Ghi chú</h3>
              <p>{singleOrder?.notes || "Không có ghi chú"}</p>
            </div>
          </div>
        </div>

        {/* Order Timeline */}
        <div className="detail-order__timeline-section">
          <h2 className="section-title">Thời gian</h2>
          <div className="timeline-card">
            <div className="timeline-item">
              <span className="timeline-label">Ngày đặt hàng:</span>
              <span className="timeline-value">
                {formatDate(singleOrder?.createdAt)}
              </span>
            </div>
            <div className="timeline-item">
              <span className="timeline-label">Cập nhật lần cuối:</span>
              <span className="timeline-value">
                {formatDate(singleOrder?.updatedAt)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailOrder;
