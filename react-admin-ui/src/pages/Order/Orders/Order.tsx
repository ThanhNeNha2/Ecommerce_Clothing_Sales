import React, { useState, useEffect } from "react";
import "./order.scss";

const Order = () => {
  const [activeFilter, setActiveFilter] = useState<any>("all");
  const [filteredOrders, setFilteredOrders] = useState<any>([]);

  const ordersData = [
    {
      _id: "68303ce818d78f30f037d6c0",
      user_id: "68199ed7dfe2631008c16e94",
      order_items: [
        {
          product_id: {
            _id: "681f7a7ad3b861a9798069da",
            nameProduct: "Áo thun nam",
            salePrice: 180000,
            mainCategory: "Topwear",
            subCategory: ["T-Shirt", "Sweater", "Jacket"],
            image_url: [
              "https://i.pinimg.com/736x/6d/e5/a3/6de5a3c0eee32dad6c1c273a92f79932.jpg",
            ],
          },
          size_id: { _id: "681b33349dfe7219f417031a", name: "S" },
          quantity: 1,
          price: 180000,
        },
      ],
      final_amount: 100000,
      promotion_id: {
        _id: "682efa6597c49030c8e59dc4",
        code: "HAHA",
        discount_type: "fixed",
        discount_value: 100,
      },
      status: "pending",
      payment_method: "card",
      payment_status: "pending",
      shipping_address: "123 Đường ABC, Quận 1, TP.HCM",
      notes: "Giao hàng vào buổi sáng",
      createdAt: "2025-05-23T09:16:24.971Z",
    },
    {
      _id: "6830aed94993698cf073298e",
      user_id: "68199ed7dfe2631008c16e94",
      order_items: [
        {
          product_id: {
            _id: "68204dcb32e9abcfb542852d",
            nameProduct:
              "DAZZI BRAND solid form Babytee T-shirt💖Women's bodycon long-sleeved t-shirt with 4-way stretch ribbed elastic A01",
            salePrice: 180,
            mainCategory: "Topwear",
            subCategory: ["T-Shirt", "Shirt"],
            image_url: [
              "https://res.cloudinary.com/dqgn2mwuw/image/upload/v1746947526/WebSite-ecommerce-interior/WebSite-ecommerce-interior-product/d7rkz8fpcafizxawyqot.webp",
            ],
          },
          size_id: { _id: "681b33349dfe7219f4170319", name: "XS" },
          quantity: 1,
          price: 180,
        },
        {
          product_id: {
            _id: "682052ce32e9abcfb5428558",
            nameProduct:
              "DAZZI women's plain straight pants, wide leg wrinkled wind pants, high waisted long wide leg straight pants with elastic waistband, high quality products",
            salePrice: 212.5,
            mainCategory: "Bottomwear",
            subCategory: ["Trousers", "Skirt"],
            image_url: [
              "https://res.cloudinary.com/dqgn2mwuw/image/upload/v1746948809/WebSite-ecommerce-interior/WebSite-ecommerce-interior-product/ymxzwlrqog8f0svxhfbk.webp",
            ],
          },
          size_id: { _id: "681b33349dfe7219f4170323", name: "32" },
          quantity: 1,
          price: 212.5,
        },
      ],
      final_amount: 292.5,
      promotion_id: {
        _id: "682efa6597c49030c8e59dc4",
        code: "HAHA",
        discount_type: "fixed",
        discount_value: 100,
      },
      status: "pending",
      payment_method: "cash",
      payment_status: "pending",
      shipping_address: "xã nghĩa thắng",
      notes: "đừng có giao buổi trưa nha",
      createdAt: "2025-05-23T17:22:33.959Z",
    },
    {
      _id: "6830b0264993698cf07329cd",
      user_id: "68199ed7dfe2631008c16e94",
      order_items: [
        {
          product_id: {
            _id: "68204dcb32e9abcfb542852d",
            nameProduct:
              "DAZZI BRAND solid form Babytee T-shirt💖Women's bodycon long-sleeved t-shirt with 4-way stretch ribbed elastic A01",
            salePrice: 180,
            mainCategory: "Topwear",
            subCategory: ["T-Shirt", "Shirt"],
            image_url: [
              "https://res.cloudinary.com/dqgn2mwuw/image/upload/v1746947526/WebSite-ecommerce-interior/WebSite-ecommerce-interior-product/d7rkz8fpcafizxawyqot.webp",
            ],
          },
          size_id: { _id: "681b33349dfe7219f4170319", name: "XS" },
          quantity: 1,
          price: 180,
        },
        {
          product_id: {
            _id: "6820c1a31be7665f0a7c2e34",
            nameProduct: "Hat Accessories 3",
            salePrice: 293637,
            mainCategory: "Accessories",
            subCategory: ["Hat"],
            image_url: [
              "https://i.pinimg.com/736x/09/a8/4b/09a84b2931d51baf3c2ff52a4d027c5e.jpg",
            ],
          },
          size_id: { _id: "681b33349dfe7219f4170319", name: "XS" },
          quantity: 1,
          price: 293637,
        },
      ],
      final_amount: 293717,
      promotion_id: {
        _id: "682efa6597c49030c8e59dc4",
        code: "HAHA",
        discount_type: "fixed",
        discount_value: 100,
      },
      status: "confirmed",
      payment_method: "cash",
      payment_status: "pending",
      shipping_address: "xã nghĩa thắng",
      notes: "tôi tên thanh",
      createdAt: "2025-05-23T17:28:06.677Z",
    },
  ];

  const formatCurrency = (amount: any) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  const formatDate = (dateString: any) => {
    return new Date(dateString).toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const truncateText = (text: any, maxLength: any) => {
    if (!text || text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  const filterOrders = (status: any) => {
    setActiveFilter(status);
    if (status === "all") {
      setFilteredOrders(ordersData);
    } else {
      setFilteredOrders(ordersData.filter((order) => order.status === status));
    }
  };

  const getOrderStats = () => {
    const totalOrders = ordersData.length;
    const pendingOrders = ordersData.filter(
      (order) => order.status === "pending"
    ).length;
    const confirmedOrders = ordersData.filter(
      (order) => order.status === "confirmed"
    ).length;

    return { totalOrders, pendingOrders, confirmedOrders };
  };

  const handleViewOrder = (orderId: any) => {
    alert(`Xem chi tiết đơn hàng: ${orderId}`);
  };

  const handleEditOrder = (orderId: any) => {
    alert(`Chỉnh sửa đơn hàng: ${orderId}`);
  };

  const renderOrderItems = (items: any) => {
    return items.map((item: any, index: any) => (
      <div key={index} className="item">
        <img
          src={item.product_id.image_url[0]}
          alt={item.product_id.nameProduct}
          className="item-image"
          onError={(e: any) => {
            e.target.src = "https://via.placeholder.com/40x40?text=No+Image";
          }}
        />
        <div className="item-info">
          <div className="item-name">
            {truncateText(item.product_id.nameProduct, 50)}
          </div>
          <div className="item-details">
            Size: {item.size_id.name} | SL: {item.quantity} |{" "}
            {formatCurrency(item.price)}
          </div>
        </div>
      </div>
    ));
  };

  const EmptyState = () => (
    <tr>
      <td colSpan={9}>
        <div className="empty-state">
          <div className="empty-icon">
            <i className="fas fa-inbox"></i>
          </div>
          <h3>Không có đơn hàng nào</h3>
          <p>Hiện tại chưa có đơn hàng nào được tạo</p>
        </div>
      </td>
    </tr>
  );

  useEffect(() => {
    setFilteredOrders(ordersData);
  }, []);

  const stats = getOrderStats();

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>
          <i className="fas fa-shopping-cart"></i> Quản lý đơn hàng
        </h1>
        <p>Theo dõi và quản lý tất cả đơn hàng của khách hàng</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card total">
          <div className="stat-header total">
            <div className="stat-icon">
              <i className="fas fa-shopping-bag"></i>
            </div>
          </div>
          <div className="stat-value">{stats.totalOrders}</div>
          <div className="stat-label">Tổng đơn hàng</div>
        </div>

        <div className="stat-card pending">
          <div className="stat-header pending">
            <div className="stat-icon">
              <i className="fas fa-clock"></i>
            </div>
          </div>
          <div className="stat-value">{stats.pendingOrders}</div>
          <div className="stat-label">Đang chờ xử lý</div>
        </div>

        <div className="stat-card confirmed">
          <div className="stat-header confirmed">
            <div className="stat-icon">
              <i className="fas fa-check-circle"></i>
            </div>
          </div>
          <div className="stat-value">{stats.confirmedOrders}</div>
          <div className="stat-label">Đã xác nhận</div>
        </div>
      </div>

      <div className="orders-section">
        <div className="section-header">
          <h2>
            <i className="fas fa-list"></i> Danh sách đơn hàng
          </h2>
          <div className="filter-buttons">
            <button
              className={`filter-btn ${activeFilter === "all" ? "active" : ""}`}
              onClick={() => filterOrders("all")}
            >
              Tất cả
            </button>
            <button
              className={`filter-btn ${
                activeFilter === "pending" ? "active" : ""
              }`}
              onClick={() => filterOrders("pending")}
            >
              Chờ xử lý
            </button>
            <button
              className={`filter-btn ${
                activeFilter === "confirmed" ? "active" : ""
              }`}
              onClick={() => filterOrders("confirmed")}
            >
              Đã xác nhận
            </button>
          </div>
        </div>

        <div className="orders-container">
          <table className="orders-table">
            <thead>
              <tr>
                <th>Mã đơn hàng</th>
                <th>Sản phẩm</th>
                <th>Trạng thái</th>
                <th>Thanh toán</th>
                <th>Tổng tiền</th>
                <th>Ngày đặt</th>
                <th>Địa chỉ</th>
                <th>Ghi chú</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.length === 0 ? (
                <EmptyState />
              ) : (
                filteredOrders.map((order: any) => (
                  <tr key={order._id}>
                    <td>
                      <div className="order-id">
                        {order._id.substring(0, 8)}...
                      </div>
                    </td>
                    <td>
                      <div className="order-items">
                        {renderOrderItems(order.order_items)}
                      </div>
                    </td>
                    <td>
                      <span className={`status-badge ${order.status}`}>
                        {order.status === "pending"
                          ? "Chờ xử lý"
                          : "Đã xác nhận"}
                      </span>
                    </td>
                    <td>
                      <span className={`payment-badge ${order.payment_method}`}>
                        {order.payment_method === "cash" ? "Tiền mặt" : "Thẻ"}
                      </span>
                      <div className="payment-status">
                        {order.payment_status === "pending"
                          ? "Chưa thanh toán"
                          : "Đã thanh toán"}
                      </div>
                    </td>
                    <td>
                      <div className="amount">
                        {formatCurrency(order.final_amount)}
                      </div>
                      {order.promotion_id && (
                        <div className="discount-info">
                          Giảm: {order.promotion_id.code} (-
                          {formatCurrency(order.promotion_id.discount_value)})
                        </div>
                      )}
                    </td>
                    <td>
                      <div className="order-date">
                        {formatDate(order.createdAt)}
                      </div>
                    </td>
                    <td>
                      <div className="order-address">
                        {truncateText(order.shipping_address, 30)}
                      </div>
                    </td>
                    <td>
                      <div className="order-notes">
                        {truncateText(order.notes || "Không có ghi chú", 25)}
                      </div>
                    </td>
                    <td>
                      <div className="action-buttons">
                        <button
                          className="action-btn view-btn"
                          onClick={() => handleViewOrder(order._id)}
                        >
                          <i className="fas fa-eye"></i> Xem
                        </button>
                        <button
                          className="action-btn edit-btn"
                          onClick={() => handleEditOrder(order._id)}
                        >
                          <i className="fas fa-edit"></i> Sửa
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Order;
