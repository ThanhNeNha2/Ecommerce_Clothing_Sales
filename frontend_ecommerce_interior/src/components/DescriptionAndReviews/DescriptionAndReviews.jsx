import React, { useEffect, useState } from "react";
import { RiInstagramFill } from "react-icons/ri";
import { BsThreeDotsVertical, BsTwitter } from "react-icons/bs";
import { FaFacebook } from "react-icons/fa";
import { useParams } from "react-router-dom";
import {
  addReview,
  deleteReview,
  getAllReview,
  getReviewById,
  updateReview,
} from "../../services/api";
import { notification } from "antd";

const DescriptionAndReviews = ({ description, quantityReview }) => {
  const [activeTab, setActiveTab] = useState("Description");
  const [comment, setComment] = useState("");
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(1); // New state for star rating
  const [activeMenuId, setActiveMenuId] = useState(null); // Track which review has open menu
  const [isCheckUpdate, setIsCheckUpdate] = useState(false); // Track if update is needed
  const [isCheckDelete, setIsCheckDelete] = useState(false); // Track if delete is needed
  const [user_idUpdate, setUser_idUpdate] = useState(null); // Track user ID for update
  const [idReview, setIdReview] = useState(null); // Track review ID for update
  const { id } = useParams();

  const user = JSON.parse(localStorage.getItem("user"));

  // Hàm gọi API để lấy danh sách đánh giá
  const fetchReviews = async () => {
    const response = await getAllReview(id);
    if (response.status === 200) {
      setReviews(response.data.reviews);
    }
  };

  // Tạo một mảng số sao
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className="text-yellow-500">
        {i < rating ? "★" : "☆"}
      </span>
    ));
  };

  // Hàm tạo  đánh giá
  const createReview = async (e) => {
    e.preventDefault();
    if (user) {
      const res = await addReview(user._id, id, comment, rating);

      if (res.status === 201) {
        setComment("");
        setRating(0); // Reset rating after submission
        fetchReviews(); // Fetch reviews again to update the list
      }
      if (res.status === 400) {
        notification.error({
          message: "Thông báo ",
          description: "Bạn đã đánh giá sản phẩm này trước đó! ",
        });
      }
      return;
    }
  };

  // Hàm xử lý menu cho từng bình luận
  const toggleMenu = (reviewId) => {
    setActiveMenuId(activeMenuId === reviewId ? null : reviewId);
  };

  // UPDATE REVIEW
  // Hàm get review by id
  const fetchReviewsById = async (info) => {
    try {
      const response = await getReviewById(info._id, info.user_id._id);
      if (response.status === 200) {
        setComment(response.data.review.comment);
        setRating(response.data.review.rating);
        setUser_idUpdate(response.data.review.user_id._id);
        setIdReview(response.data.review._id);
        setIsCheckUpdate(true);
      }
    } catch (error) {
      notification.error({
        message: "Thông báo ",
        description: "Không thể sửa đánh giá người khác! ",
      });
    }
  };
  const handleUpdate = (reviewId) => {
    fetchReviewsById(reviewId);
    setActiveMenuId(null);
  };

  const handleCancel = () => {
    setComment("");
    setRating(0);
    setIsCheckUpdate(false);
  };

  // hàm update đánh giá API
  const handleUpdateReview = async (e) => {
    e.preventDefault();
    const res = await updateReview(idReview, user_idUpdate, rating, comment);

    if (res.status === 200) {
      setComment("");
      setRating(0);
      setIsCheckUpdate(false);
      fetchReviews(); // Fetch reviews again to update the list
    }
  };
  // Đóng menu khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (activeMenuId && !event.target.closest(".menu-container")) {
        setActiveMenuId(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [activeMenuId]);

  //  DELETE  REVIEW
  const fetchReviewsByIdDelete = async (info) => {
    try {
      const response = await getReviewById(info._id, info.user_id._id);
      if (response.status === 200) {
        setUser_idUpdate(response.data.review.user_id._id);
        setIdReview(response.data.review._id);
        setIsCheckDelete(true);
      }
    } catch (error) {
      notification.error({
        message: "Thông báo ",
        description: "Không thể xóa đánh giá người khác! ",
      });
    }
  };
  const handleDelete = (reviewId) => {
    fetchReviewsByIdDelete(reviewId);
    setActiveMenuId(null);
  };
  const handleDeleteReview = async () => {
    const res = await deleteReview(idReview, user_idUpdate);
    if (res.status === 200) {
      setIsCheckDelete(false);
      fetchReviews(); // Fetch reviews again to update the list
    }
  };
  useEffect(() => {
    if (activeTab === "Reviews") {
      fetchReviews();
    }
  }, [activeTab, id]);

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
            <p className="mb-4">
              Đánh giá từ khách hàng ({reviews.length} đánh giá):
            </p>
            <div className="flex flex-col gap-4">
              {reviews.map((review) => (
                <div
                  key={review._id}
                  className="flex justify-between items-center border-b pb-2"
                >
                  <div className="">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">
                        {" "}
                        {review.user_id?.username}
                      </span>
                      <span className="text-yellow-500">
                        {renderStars(review.rating)}
                      </span>
                    </div>
                    <p className="text-sm mt-1 mb-[3px]">{review.comment}</p>
                    <p className="text-xs text-gray-400">
                      {new Date(review.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                  <div className="relative menu-container">
                    <div
                      className="cursor-pointer w-5 h-5"
                      onClick={() => toggleMenu(review._id)}
                    >
                      <BsThreeDotsVertical />
                    </div>
                    {activeMenuId === review._id && (
                      <div className="absolute right-0 top-6 bg-white shadow-md rounded-md py-1 z-10 min-w-[120px]">
                        <button
                          className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
                          onClick={() => handleUpdate(review)}
                        >
                          Cập nhật
                        </button>
                        <button
                          className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-500 text-sm"
                          onClick={() => handleDelete(review)}
                        >
                          Xóa
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <button className="mt-4 px-4 py-1 bg-gray-200 rounded hover:bg-gray-300">
              Xem thêm đánh giá
            </button>
            <div className="mt-8 border-t border-gray-200 pt-6 bg-gray-50 rounded-lg shadow-sm p-6">
              <form
                className="flex flex-col gap-4"
                onSubmit={isCheckUpdate ? handleUpdateReview : createReview}
              >
                {/* Số sao đánh giá */}
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-gray-700">
                    Đánh giá:
                  </span>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)} // Update rating state on click
                        className={`text-2xl transition-colors duration-200 ${
                          star <= rating ? "text-yellow-400" : "text-gray-300"
                        } hover:text-yellow-300 focus:outline-none`}
                      >
                        ★
                      </button>
                    ))}
                  </div>
                </div>

                {/* Bình luận */}
                <textarea
                  placeholder="Viết bình luận của bạn..."
                  className="border border-gray-300 px-4 py-3 rounded-lg text-sm resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow duration-200 bg-white shadow-sm"
                  rows={5}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  required
                />

                {/* Nút gửi */}

                {isCheckUpdate ? (
                  <div className="self-end flex gap-3">
                    <button
                      onClick={() => handleCancel()}
                      className="self-end bg-gray-600 text-white px-6 py-2 rounded-lg font-medium text-sm hover:bg-gray-700 active:bg-gray-800 transition-colors duration-200 shadow-md"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="self-end bg-green-600 text-white px-6 py-2 rounded-lg font-medium text-sm hover:bg-green-700 active:bg-green-800 transition-colors duration-200 shadow-md"
                    >
                      Cập nhật đánh giá
                    </button>
                  </div>
                ) : (
                  <button
                    type="submit"
                    className="self-end bg-green-600 text-white px-6 py-2 rounded-lg font-medium text-sm hover:bg-green-700 active:bg-green-800 transition-colors duration-200 shadow-md"
                  >
                    Gửi đánh giá
                  </button>
                )}
              </form>
            </div>
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
          Reviews [{quantityReview}]
        </button>
      </div>
      {isCheckDelete && (
        <div className="fixed inset-0  flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Xác nhận xóa bình luận
            </h2>
            <p className="text-sm text-gray-600 mb-6">
              Bạn có chắc chắn muốn xóa bình luận này không? Hành động này không
              thể hoàn tác.
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setIsCheckDelete(false)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
              >
                Hủy
              </button>
              <button
                onClick={handleDeleteReview}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
              >
                Xóa
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="leading-7 px-28 text-gray-500">{renderContent()}</div>
    </div>
  );
};

export default DescriptionAndReviews;
