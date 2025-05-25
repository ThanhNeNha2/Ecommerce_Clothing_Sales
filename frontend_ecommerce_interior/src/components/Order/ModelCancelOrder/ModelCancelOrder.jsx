import React from "react";
import { cancelOrder } from "../../../services/api";
import { useMutation, useQueryClient } from "react-query";

const ModelCancelOrder = ({
  selectedOrder,
  setSelectedOrder,
  getStatusBadge,
  formatDate,
  getPaymentStatusBadge,
  formatCurrency,
}) => {
  const queryClient = useQueryClient();
  const cancelOrderMutation = useMutation({
    mutationFn: (id) => cancelOrder(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["orders"]);
      setSelectedOrder(null);
    },
    onError: (error) => {
      console.error("Lỗi khi hủy đơn:", error.message);
    },
  });

  const handleConfirmCancelOrder = () => {
    cancelOrderMutation.mutate(selectedOrder._id);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">
              Mã đơn hàng muốn hủy #{selectedOrder._id.slice(-8)}
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

            <div className="flex justify-end gap-3 mt-4">
              <button
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
                onClick={() => setSelectedOrder(null)}
              >
                Hủy bỏ
              </button>
              <button
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                onClick={handleConfirmCancelOrder}
              >
                Xác nhận
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModelCancelOrder;
