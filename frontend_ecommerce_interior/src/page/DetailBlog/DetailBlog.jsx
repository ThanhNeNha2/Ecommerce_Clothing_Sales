import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import { MdKeyboardArrowRight } from "react-icons/md";
import { signBlog } from "../../services/fakeApi";
import { BsCalendar2DateFill } from "react-icons/bs";
import { Link, useParams } from "react-router-dom";
import { getBlogById } from "../../services/api";

const DetailBlog = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAllBlog = async () => {
    try {
      setLoading(true);
      const res = await getBlogById(id);
      console.log("check thông tin của blog lẻ ", res.data);
      if (res.data && res.data.blog) {
        setBlog(res.data.blog);
      } else {
        throw new Error("Không tìm thấy blog");
      }
    } catch (err) {
      console.error("Lỗi khi lấy blog:", err);
      setError("Không thể tải blog. Vui lòng thử lại sau.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchAllBlog();
  }, [id]);

  console.log("check thong tin setblog ", blog);

  if (loading) return <div className="px-[170px] py-5">Đang tải...</div>;
  if (error) return <div className="px-[170px] py-5 text-red-500">{error}</div>;
  if (!blog) return <div className="px-[170px] py-5">Không tìm thấy blog</div>;

  return (
    <div className="flex flex-col">
      <Header />
      <div
        className="flex h-[55px] mt-[60px] items-center px-[130px] gap-3"
        style={{ background: "#F9F1E7" }}
      >
        <Link to="/">
          <div className="flex items-center">
            <span>Home</span> <MdKeyboardArrowRight />
          </div>
        </Link>
        <Link to="/blog">
          <div className="flex items-center">
            <span>Blog</span> <MdKeyboardArrowRight />
          </div>
        </Link>
        <div>
          <span className="font-medium">{blog.title || "Blog Chi Tiết"}</span>
        </div>
      </div>
      {/* Cụm thông tin */}
      <div className="px-[170px] mt-5 flex flex-wrap">
        {/* Cụm Trái */}
        <div className="flex-[2] rounded border px-3 py-3 min-w-[300px]">
          <div className="py-3 flex justify-center mb-3">
            <span className="font-poppins font-semibold text-xl">
              Sản phẩm gợi ý
            </span>
          </div>
          {/* sp (hardcoded for now, replace with dynamic data if available) */}
          <div className="flex flex-col gap-3">
            <div className="flex flex-col items-center gap-2 cursor-pointer hover:text-blue-300">
              <div>
                <img
                  src="https://images.pexels.com/photos/15533645/pexels-photo-15533645/free-photo-of-dining-room-interior.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="Suggested Product"
                  className="w-full h-auto object-cover"
                />
              </div>
              <span className="font-medium">Ghế Sofa Giường kéo SG01</span>
              <span className="text-orange-400 font-medium">9.800.000đ</span>
            </div>
            <hr />
            <div className="flex flex-col items-center gap-2 cursor-pointer hover:text-blue-300">
              <div>
                <img
                  src="https://images.pexels.com/photos/15533645/pexels-photo-15533645/free-photo-of-dining-room-interior.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="Suggested Product"
                  className="w-full h-auto object-cover"
                />
              </div>
              <span className="font-medium">Ghế Sofa Giường kéo SG01</span>
              <span className="text-orange-400 font-medium">9.800.000đ</span>
            </div>
          </div>
        </div>
        {/* Cụm phải */}
        <div className="flex-[5] px-3 py-1 flex flex-col gap-2 min-w-[500px]">
          {blog.description && (
            <div
              className="prose max-w-full overflow-auto contentBlog"
              dangerouslySetInnerHTML={{ __html: blog.description }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailBlog;
