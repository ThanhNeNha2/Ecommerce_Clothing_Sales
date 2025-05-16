import React, { useEffect, useState } from "react";
import { RiInstagramFill } from "react-icons/ri";
import { BsThreeDotsVertical, BsTwitter } from "react-icons/bs";
import { FaFacebook } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { addReview, getAllReview } from "../../services/api";

const DescriptionAndReviews = ({ description }) => {
  const [activeTab, setActiveTab] = useState("Description");
  const [comment, setComment] = useState("");
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0); // New state for star rating
  const [showMenu, setShowMenu] = useState(false);
  const { id } = useParams();

  const user = JSON.parse(localStorage.getItem("user"));

  // Hàm gọi API để lấy danh sách đánh giá
  const fetchReviews = async () => {
    const response = await getAllReview(id);
    if (response.status === 200) {
      setReviews(response.data.reviews);
    } else {
      console.error("Failed to fetch reviews");
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

  // Hàm tạo danh sách đánh giá
  const createReview = async (e) => {
    e.preventDefault();
    if (user) {
      const res = await addReview(user._id, id, comment, rating);
      if (res.status === 201) {
        setComment("");
        setRating(0); // Reset rating after submission
        fetchReviews(); // Fetch reviews again to update the list
      }
      return;
    }
  };

  // Hàm xử lý sự kiện click bên ngoài để đóng menu
  const toggleMenu = () => {
    setShowMenu((prev) => !prev);
  };

  const handleDelete = () => {
    console.log("Xóa đánh giá");
    setShowMenu(false);
  };

  const handleUpdate = () => {
    console.log("Cập nhật đánh giá");
    setShowMenu(false);
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
                  key={review.id}
                  className="flex justify-between items-center border-b pb-2"
                >
                  <div className="">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">
                        {review.user_id.username}
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
                  <div className="relative inline-block text-left">
                    <div
                      className="cursor-pointer w-5 h-5"
                      onClick={toggleMenu}
                    >
                      <BsThreeDotsVertical />
                    </div>

                    {showMenu && (
                      <div className="absolute right-0 mt-2 w-28 bg-white border rounded shadow z-10">
                        <button
                          onClick={handleUpdate}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Update
                        </button>
                        <button
                          onClick={handleDelete}
                          className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-100"
                        >
                          Delete
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
              <form className="flex flex-col gap-4" onSubmit={createReview}>
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
                <button
                  type="submit"
                  className="self-end bg-green-600 text-white px-6 py-2 rounded-lg font-medium text-sm hover:bg-green-700 active:bg-green-800 transition-colors duration-200 shadow-md"
                >
                  Gửi đánh giá
                </button>
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
          Reviews [5]
        </button>
      </div>
      <div className="leading-7 px-28 text-gray-500">{renderContent()}</div>
    </div>
  );
};

export default DescriptionAndReviews;
