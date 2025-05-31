import React, { useEffect, useState, useCallback } from "react";
import Header from "../../components/Header/Header";
import { MdKeyboardArrowRight } from "react-icons/md";
import { Link, useParams } from "react-router-dom";
import { getBlogById } from "../../services/api";
import { instance } from "../../Custom/Axios/AxiosCustom";

const DetailBlog = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [listProducts, setListProducts] = useState([]);

  // Lấy mainCategory từ localStorage với xử lý lỗi
  const getMainCategory = useCallback(() => {
    try {
      const category = localStorage.getItem("mainCategory");
      return category ? JSON.parse(category) : null;
    } catch (err) {
      console.error("Lỗi khi đọc mainCategory từ localStorage:", err);
      return null;
    }
  }, []);

  const fetchAllBlog = useCallback(async () => {
    try {
      setLoading(true);
      const res = await getBlogById(id);

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
  }, [id]);

  const getAllProduct = useCallback(async () => {
    const mainCategory = getMainCategory();
    try {
      setLoading(true);
      const endpoint = mainCategory
        ? `/product?limit=${6}&mainCategory=${mainCategory}`
        : `/product?limit=${6}`;

      const res = await instance.get(endpoint);
      setListProducts(res.data.products || []);
    } catch (err) {
      console.error("Lỗi khi lấy sản phẩm:", err);
      setError("Không thể tải sản phẩm. Vui lòng thử lại sau.");
    } finally {
      setLoading(false);
    }
  }, [getMainCategory]);

  useEffect(() => {
    window.scrollTo(0, 0);

    // Sử dụng AbortController để hủy fetch khi component unmount
    const abortController = new AbortController();

    const fetchData = async () => {
      await Promise.all([fetchAllBlog(), getAllProduct()]);
    };

    fetchData();

    return () => {
      abortController.abort();
    };
  }, [fetchAllBlog, getAllProduct]);

  if (loading)
    return (
      <div className="container mx-auto px-4 md:px-8 lg:px-12 py-5">
        Đang tải...
      </div>
    );
  if (error)
    return (
      <div className="container mx-auto px-4 md:px-8 lg:px-12 py-5 text-red-500">
        {error}
      </div>
    );
  if (!blog)
    return (
      <div className="container mx-auto px-4 md:px-8 lg:px-12 py-5">
        Không tìm thấy blog
      </div>
    );

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
        <div className="truncate max-w-xs">
          <span className="font-medium">{blog.title || "Blog Chi Tiết"}</span>
        </div>
      </div>

      {/* Cụm thông tin */}
      <div className="container mx-auto px-[120px] md:px-8 lg:px-16 xl:px-[170px] mt-5 flex flex-col md:flex-row flex-wrap gap-6">
        {/* Cụm Trái - Suggested Products */}
        <div className="w-full md:w-1/3 lg:w-1/4 rounded border px-3 py-3">
          <div className="py-3 flex justify-center mb-3">
            <span className="font-poppins font-semibold text-xl">
              Sản phẩm liên quan
            </span>
          </div>

          {/* Danh sách sản phẩm */}
          {listProducts.length > 0 ? (
            <div className="flex flex-col gap-3">
              {listProducts.map((item, index) => (
                <div key={item._id || index} className="border-b-2">
                  <Link
                    to={`/SingleProduct/${item.id}`}
                    className="flex flex-col items-center gap-2 cursor-pointer hover:text-blue-300 mb-3"
                  >
                    <div className="w-full">
                      {item.image_url && item.image_url[0] && (
                        <img
                          src={item.image_url[0]}
                          alt={item.nameProduct || "Suggested Product"}
                          className="w-full h-auto object-cover"
                          loading="lazy"
                        />
                      )}
                    </div>
                    <span className="font-medium">{item.nameProduct}</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-orange-500 font-semibold text-lg">
                        ${item.salePrice}
                      </span>
                      <span className="text-gray-400 line-through text-sm">
                        ${item.originalPrice}
                      </span>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-gray-500 text-center py-4">
              Không có sản phẩm gợi ý
            </div>
          )}
        </div>

        {/* Cụm phải - Blog Content */}
        <div className="w-full md:w-3/5 lg:w-2/3 px-3 py-1 flex flex-col gap-2">
          {blog.description ? (
            <div
              className="prose max-w-full overflow-auto contentBlog"
              dangerouslySetInnerHTML={{ __html: blog.description }}
            />
          ) : (
            <div className="text-gray-500">Không có nội dung blog</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailBlog;
