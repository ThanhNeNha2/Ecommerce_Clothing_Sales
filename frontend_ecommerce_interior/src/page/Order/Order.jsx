import React, { useEffect, useState } from "react";
import {
  Search,
  Filter,
  Eye,
  Package,
  Calendar,
  MapPin,
  CreditCard,
  Tag,
  Trash2,
} from "lucide-react";
import Header from "../../components/Header/Header";

import { getAllOder } from "../../services/api";
import ModelDetailOrder from "../../components/Order/ModelDetailOrder/ModelDetailOrder";
import ModelCancelOrder from "../../components/Order/ModelCancelOrder/ModelCancelOrder";
import { useQuery } from "react-query";

const Order = () => {
  // Sample data based on your structure

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [cancelOrder, setCancelOrder] = useState(null);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["orders"],
    queryFn: getAllOder,
  });

  const orders = data?.orders || []; // Gán lại tên biến là 'orders'

  if (isLoading) return <p>Đang tải dữ liệu...</p>;
  if (isError) return <p>Lỗi: {error.message}</p>;

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

  // màu sắc cho trạng thái đơn hàng status
  const getStatusBadge = (status) => {
    const statusColors = {
      pending: "bg-yellow-100 text-yellow-800",
      confirmed: "bg-blue-100 text-blue-800",
      shipped: "bg-purple-100 text-purple-800",
      delivered: "bg-green-100 text-green-800",
      cancelled: "bg-red-100 text-red-800",
      completed: "bg-emerald-100 text-emerald-800",
    };
    return (
      <span
        className={`px-3 py-1 rounded-full text-xs font-medium ${
          statusColors[status] || "bg-gray-100 text-gray-800"
        }`}
      >
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  // màu sắc cho thanh toán
  const getPaymentStatusBadge = (status) => {
    const statusColors = {
      pending: "bg-orange-100 text-orange-800",
      completed: "bg-green-100 text-green-800",
      failed: "bg-red-100 text-red-800",
    };

    return (
      <span
        className={`px-2 py-1 rounded text-xs font-medium ${
          statusColors[status] || "bg-gray-100 text-gray-800"
        }`}
      >
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.shipping_address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.order_items.some((item) =>
        item.product_id.nameProduct
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      );
    const matchesStatus =
      statusFilter === "all" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 p-6 pt-16">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                  <Package className="text-blue-600" />
                  Quản lý đơn hàng
                </h1>
                <p className="text-gray-600 mt-1">
                  Theo dõi và quản lý tất cả đơn hàng
                </p>
              </div>
              <div className="mt-4 sm:mt-0">
                <span className="text-sm text-gray-500">
                  Tổng cộng:{" "}
                  <span className="font-semibold text-gray-900">
                    {orders.length}
                  </span>{" "}
                  đơn hàng
                </span>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Tìm kiếm theo ID đơn hàng, địa chỉ, sản phẩm..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              {/* Status Filter */}
              <div className="lg:w-48">
                <div className="relative">
                  <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <select
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                  >
                    <option value="all">Tất cả trạng thái</option>
                    <option value="pending">Chờ xử lý</option>
                    <option value="confirmed">Đã xác nhận</option>
                    <option value="shipped">Đang giao</option>
                    <option value="delivered">Đã giao</option>
                    <option value="cancelled">Đã hủy</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Orders Table */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Đơn hàng
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Sản phẩm
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Trạng thái
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Thanh toán
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tổng tiền
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Ngày tạo
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Hành động
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredOrders.map((order) => (
                    <tr key={order._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            #{order._id.slice(-8)}
                          </div>
                          <div className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                            <MapPin className="w-3 h-3" />
                            {order.shipping_address.slice(0, 30)}...
                          </div>
                          {order.notes && (
                            <div className="text-xs text-blue-600 mt-1">
                              📝 {order.notes}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-start gap-3">
                          <img
                            src={order.order_items[0].product_id.image_url[0]}
                            alt={order.order_items[0].product_id.nameProduct}
                            className="w-12 h-12 rounded-lg object-cover"
                          />
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {order.order_items[0].product_id.nameProduct}
                            </div>
                            <div className="text-sm text-gray-500">
                              Size: {order.order_items[0].size_id.name} | SL:{" "}
                              {order.order_items[0].quantity}
                            </div>
                            {order.order_items.length > 1 && (
                              <div className="text-xs text-blue-600">
                                +{order.order_items.length - 1} sản phẩm khác
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStatusBadge(order.status)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="space-y-1">
                          <div className="flex items-center gap-1 text-sm">
                            <CreditCard className="w-3 h-3" />
                            {order.payment_method === "card"
                              ? "Thẻ"
                              : order.payment_method === "bank_transfer"
                              ? "Chuyển khoản"
                              : "COD"}
                          </div>
                          {getPaymentStatusBadge(order.payment_status)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {formatCurrency(order.final_amount)}
                          </div>
                          {order.promotion_id && (
                            <div className="flex items-center gap-1 text-xs text-green-600">
                              <Tag className="w-3 h-3" />
                              {order.promotion_id.code}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-1 text-sm text-gray-500">
                          <Calendar className="w-3 h-3" />
                          {formatDate(order.createdAt)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => setSelectedOrder(order)}
                            className="text-blue-600 hover:text-blue-900 p-1"
                            title="Xem chi tiết"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setCancelOrder(order)}
                            className="text-gray-600 hover:text-gray-900 p-1"
                            title="Hủy đơn"
                          >
                            <Trash2 className="w-4 h-4 text-red-500" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredOrders.length === 0 && (
              <div className="text-center py-12">
                <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">Không tìm thấy đơn hàng nào</p>
              </div>
            )}
          </div>

          {/* Order Detail Modal */}
          {selectedOrder && (
            <ModelDetailOrder
              selectedOrder={selectedOrder}
              setSelectedOrder={setSelectedOrder}
              getStatusBadge={getStatusBadge}
              formatCurrency={formatCurrency}
              formatDate={formatDate}
              getPaymentStatusBadge={getPaymentStatusBadge}
            />
          )}
          {cancelOrder && (
            <ModelCancelOrder
              selectedOrder={cancelOrder}
              setSelectedOrder={setCancelOrder}
              getStatusBadge={getStatusBadge}
              formatCurrency={formatCurrency}
              formatDate={formatDate}
              getPaymentStatusBadge={getPaymentStatusBadge}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Order;
