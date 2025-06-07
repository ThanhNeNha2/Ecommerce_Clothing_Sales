import React, { useState, useEffect } from "react";
import "./order.scss";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiCustom } from "../../../custom/customApi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Order = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [IdUpdateState, setIdUpdateState] = useState("");
  const [stateUpdate, setStateUpdate] = useState("");
  const [searchParams, setSearchParams] = useState({
    orderId: "",
    userName: "",
    paymentMethod: "",
    startDate: "",
    endDate: "",
  });
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { isLoading, data, error } = useQuery({
    queryKey: ["allorders", activeFilter, searchParams],
    queryFn: () =>
      apiCustom
        .get("/ordersAdmin", {
          params: {
            status: activeFilter,
            ...searchParams,
          },
        })
        .then((res) => res.data),
  });

  const ordersData = data?.orders || [];

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const truncateText = (text, maxLength) => {
    if (!text || text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "delivered":
      case "completed":
        return "status-delivered";
      case "pending":
        return "status-pending";
      case "confirmed":
        return "status-confirmed";
      case "shipped":
        return "status-shipped";
      case "cancelled":
        return "status-cancelled";
      default:
        return "status-default";
    }
  };

  const filterOrders = (status) => {
    setActiveFilter(status);
  };

  const getOrderStats = () => {
    const totalOrders = ordersData.length;

    const pendingOrders = ordersData.filter(
      (order) => order.status === "pending"
    ).length;

    const confirmedOrders = ordersData.filter(
      (order) => order.status === "confirmed"
    ).length;

    const shippedOrders = ordersData.filter(
      (order) => order.status === "shipped"
    ).length;

    const deliveredOrders = ordersData.filter(
      (order) => order.status === "delivered"
    ).length;

    const cancelledOrders = ordersData.filter(
      (order) => order.status === "cancelled"
    ).length;

    const completedOrders = ordersData.filter(
      (order) => order.status === "completed"
    ).length;

    return {
      totalOrders,
      pendingOrders,
      confirmedOrders,
      shippedOrders,
      deliveredOrders,
      cancelledOrders,
      completedOrders,
    };
  };

  const handleViewOrder = (orderId) => {
    navigate(`/detailorders/${orderId}`);
  };

  const handleEditOrder = (orderId) => {
    setOpenUpdate(true);
    setIdUpdateState(orderId);
    const order = ordersData.find((o) => o._id === orderId);
    setStateUpdate(order?.status || "pending");
  };

  const mutation = useMutation({
    mutationFn: () => {
      return apiCustom.put(`/orders/${IdUpdateState}`, { status: stateUpdate });
    },
    onSuccess: () => {
      toast.success("🎉 Chỉnh sửa trạng thái đơn hàng thành công!");
      queryClient.invalidateQueries(["allorders"]);
      setOpenUpdate(false);
    },
    onError: (error) => {
      console.log("error", error);
      toast.error(
        `🚨 Lỗi khi cập nhật trạng thái: ${
          error.response?.data?.message || "Vui lòng thử lại!"
        }`
      );
    },
  });

  const handleConfirmUpdateOrder = async () => {
    mutation.mutate();
  };

  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    setSearchParams((prev) => ({ ...prev, [name]: value }));
  };

  const renderOrderItems = (items) => {
    return items.map((item, index) => (
      <div key={index} className="item">
        <img
          src={item.product_id.image_url[0]}
          alt={item.product_id.nameProduct}
          className="item-image"
          onError={(e) => {
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
  }, [ordersData]);

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

        <div className="stat-card shipped">
          <div className="stat-header shipped">
            <div className="stat-icon">
              <i className="fas fa-truck"></i>
            </div>
          </div>
          <div className="stat-value">{stats.shippedOrders}</div>
          <div className="stat-label">Đang giao</div>
        </div>

        <div className="stat-card delivered">
          <div className="stat-header delivered">
            <div className="stat-icon">
              <i className="fas fa-box-open"></i>
            </div>
          </div>
          <div className="stat-value">{stats.deliveredOrders}</div>
          <div className="stat-label">Đã giao</div>
        </div>

        <div className="stat-card cancelled">
          <div className="stat-header cancelled">
            <div className="stat-icon">
              <i className="fas fa-times-circle"></i>
            </div>
          </div>
          <div className="stat-value">{stats.cancelledOrders}</div>
          <div className="stat-label">Đã hủy</div>
        </div>

        <div className="stat-card completed">
          <div className="stat-header completed">
            <div className="stat-icon">
              <i className="fas fa-check-double"></i>
            </div>
          </div>
          <div className="stat-value">{stats.completedOrders}</div>
          <div className="stat-label">Hoàn tất</div>
        </div>
      </div>

      <div className="search-section">
        <h3>Tìm kiếm đơn hàng</h3>
        <div className="search-form">
          <input
            type="text"
            name="orderId"
            placeholder="Mã đơn hàng"
            value={searchParams.orderId}
            onChange={handleSearchChange}
          />
          {/* <input
            type="text"
            name="userName"
            placeholder="Tên khách hàng"
            value={searchParams.userName}
            onChange={handleSearchChange}
          /> */}
          <select
            name="paymentMethod"
            value={searchParams.paymentMethod}
            onChange={handleSearchChange}
          >
            <option value="">Phương thức thanh toán</option>
            <option value="cash">Tiền mặt</option>
            <option value="card">Thẻ</option>
            <option value="wallet">Ví điện tử</option>
            <option value="bank_transfer">Chuyển khoản</option>
          </select>
          <input
            type="date"
            name="startDate"
            value={searchParams.startDate}
            onChange={handleSearchChange}
          />
          <input
            type="date"
            name="endDate"
            value={searchParams.endDate}
            onChange={handleSearchChange}
          />
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
            <button
              className={`filter-btn ${
                activeFilter === "shipped" ? "active" : ""
              }`}
              onClick={() => filterOrders("shipped")}
            >
              Đang giao
            </button>
            <button
              className={`filter-btn ${
                activeFilter === "delivered" ? "active" : ""
              }`}
              onClick={() => filterOrders("delivered")}
            >
              Đã giao
            </button>
            <button
              className={`filter-btn ${
                activeFilter === "cancelled" ? "active" : ""
              }`}
              onClick={() => filterOrders("cancelled")}
            >
              Đã hủy
            </button>
            <button
              className={`filter-btn ${
                activeFilter === "completed" ? "active" : ""
              }`}
              onClick={() => filterOrders("completed")}
            >
              Hoàn tất
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
                filteredOrders.map((order) => (
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
                      {order._id === IdUpdateState && openUpdate ? (
                        <select
                          className="status-select"
                          value={stateUpdate}
                          onChange={(e) => setStateUpdate(e.target.value)}
                        >
                          <option value="pending">Đang chờ</option>
                          <option value="confirmed">Đã xác nhận</option>
                          <option value="shipped">Đang giao hàng</option>
                          <option value="delivered">Đã giao thành công</option>
                          <option value="cancelled">Đã hủy</option>
                          <option value="completed">Hoàn tất</option>
                        </select>
                      ) : (
                        <span
                          className={`status-badge ${getStatusClass(
                            order.status
                          )}`}
                        >
                          {order.status.charAt(0).toUpperCase() +
                            order.status.slice(1)}
                        </span>
                      )}
                      {order._id === IdUpdateState && openUpdate && (
                        <>
                          <button
                            className="cancelButton"
                            onClick={() => setOpenUpdate(false)}
                          >
                            Hủy
                          </button>
                          <button
                            className="saveButton"
                            onClick={handleConfirmUpdateOrder}
                          >
                            Lưu
                          </button>
                        </>
                      )}
                    </td>
                    <td>
                      <span className={`payment-badge ${order.payment_method}`}>
                        {order.payment_method === "cash"
                          ? "Tiền mặt"
                          : order.payment_method === "card"
                          ? "Thẻ"
                          : order.payment_method === "wallet"
                          ? "Ví điện tử"
                          : "Chuyển khoản"}
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
