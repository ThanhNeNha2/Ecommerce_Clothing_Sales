import React from "react";

const ModelDetailOrder = ({
  selectedOrder,
  setSelectedOrder,
  getStatusBadge,
  formatDate,
  getPaymentStatusBadge,
  formatCurrency,
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">
              Chi tiết đơn hàng #{selectedOrder._id.slice(-8)}
            </h2>
            <button
              onClick={() => setSelectedOrder(null)}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>

          <div className="space-y-6">
            {/* Order Info */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-medium text-gray-900 mb-2">
                  Thông tin đơn hàng
                </h3>
                <div className="space-y-1 text-sm">
                  <div>ID: {selectedOrder._id}</div>
                  <div>Trạng thái: {getStatusBadge(selectedOrder.status)}</div>
                  <div>Ngày tạo: {formatDate(selectedOrder.createdAt)}</div>
                  <div>Cập nhật: {formatDate(selectedOrder.updatedAt)}</div>
                </div>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Thanh toán</h3>
                <div className="space-y-1 text-sm">
                  <div>Phương thức: {selectedOrder.payment_method}</div>
                  <div>
                    Trạng thái:{" "}
                    {getPaymentStatusBadge(selectedOrder.payment_status)}
                  </div>
                  <div>
                    Tổng tiền:{" "}
                    <span className="font-medium">
                      {formatCurrency(selectedOrder.final_amount)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Products */}
            <div>
              <h3 className="font-medium text-gray-900 mb-3">Sản phẩm</h3>
              <div className="space-y-3">
                {selectedOrder.order_items.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 p-3 border rounded-lg"
                  >
                    <img
                      src={item.product_id.image_url[0]}
                      alt={item.product_id.nameProduct}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <div className="font-medium">
                        {item.product_id.nameProduct}
                      </div>
                      <div className="text-sm text-gray-500">
                        Size: {item.size_id.name} | Số lượng: {item.quantity}
                      </div>
                      <div className="text-sm font-medium">
                        {formatCurrency(item.price)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Shipping */}
            <div>
              <h3 className="font-medium text-gray-900 mb-2">Giao hàng</h3>
              <div className="text-sm">
                <div className="mb-1">
                  Địa chỉ: {selectedOrder.shipping_address}
                </div>
                {selectedOrder.notes && (
                  <div>Ghi chú: {selectedOrder.notes}</div>
                )}
              </div>
            </div>

            {/* Promotion */}
            {selectedOrder.promotion_id && (
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Khuyến mãi</h3>
                <div className="text-sm">
                  <div>Mã: {selectedOrder.promotion_id.code}</div>
                  <div>Loại: {selectedOrder.promotion_id.discount_type}</div>
                  <div>
                    Giá trị: {selectedOrder.promotion_id.discount_value}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModelDetailOrder;
