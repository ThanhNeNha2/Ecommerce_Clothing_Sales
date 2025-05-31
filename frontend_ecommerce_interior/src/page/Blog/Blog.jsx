import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import CoverImg from "../../components/Cover/CoverImg";
import Quality from "../../components/Quality/Quality";
import Footer from "../../components/Footer/Footer";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import { getAllBlog } from "../../services/api";
import { FaUser, FaTag } from "react-icons/fa";
import { BsCalendar2DateFill } from "react-icons/bs";
import { IoSearchSharp } from "react-icons/io5";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { instance } from "../../Custom/Axios/AxiosCustom";

const Blog = () => {
  dayjs.extend(utc);
  dayjs.extend(timezone);
  const [items, setItems] = useState([]);
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 4;
  const mainCategory = JSON.parse(localStorage.getItem("mainCategory"));
  const [listProducts, setListProducts] = useState([]);

  useEffect(() => {
    const fetchAllBlog = async () => {
      try {
        setLoading(true);
        const res = await getAllBlog();
        setItems(res.data.blogs || []);
      } catch (err) {
        console.error("Lỗi khi lấy danh sách blog:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAllBlog();
  }, []);

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    setCurrentItems(items.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(items.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, items]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    setItemOffset(newOffset);
  };
  const getAllProduct = async () => {
    try {
      setLoading(true);
      // const res = await instance.get(`/product?limit=${8}`);
      const res = await instance.get(
        `/product?limit=${8}&mainCategory=${mainCategory}`
      );

      setListProducts(res.data.products);
    } catch (err) {
      console.error("Lỗi khi lấy sản phẩm:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllProduct();
  }, []);

  if (loading) return <div className="px-[200px] py-5">Đang tải...</div>;

  return (
    <div>
      <Header />
      <CoverImg namePage="Blog" />
      <div className="px-[200px] pt-16 flex gap-10 flex-wrap">
        <div className="flex-[4] flex justify-center flex-col gap-20">
          {currentItems.length > 0 ? (
            currentItems.map((item, index) => (
              <Link key={index} to={`/DetailBlog/${item.id}`}>
                <div className="flex flex-col gap-3 w-full cursor-pointer group">
                  <div className="flex justify-center bg-red-50 w-full rounded">
                    <img
                      src={item.imgMainBlog}
                      alt={item.titleBlog || "Blog image"}
                      className="w-full h-[400px] rounded object-top object-cover"
                    />
                  </div>
                  <div className="flex gap-5 text-sm">
                    <div className="flex items-center gap-1 text-gray-500">
                      <FaUser /> Admin
                    </div>
                    <div className="flex items-center gap-1 text-gray-500">
                      <BsCalendar2DateFill />{" "}
                      {dayjs(item.createdAt)
                        .tz("Asia/Ho_Chi_Minh")
                        .format("DD/MM/YYYY HH:mm")}
                    </div>
                    <div className="flex items-center gap-1 text-gray-500">
                      <FaTag /> {item.category || "Wood"}
                    </div>
                  </div>
                  <h1 className="font-poppins font-semibold text-xl group-hover:text-blue-400">
                    {item.titleBlog}
                  </h1>
                  <span className="text-sm text-gray-400">
                    {item.descripShort}
                  </span>
                  <div>
                    <Link
                      to={`/DetailBlog/${item.id}`}
                      className="relative inline-block font-medium cursor-pointer after:content-[''] after:absolute after:left-0 after:bottom-[-2px] after:w-full after:h-[2px] after:bg-black hover:text-blue-400"
                    >
                      Chi tiết
                    </Link>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="text-center py-10">Không có bài viết nào</div>
          )}
          <div className="flex justify-center">
            <ReactPaginate
              nextLabel="Sau"
              onPageChange={handlePageClick}
              pageRangeDisplayed={3}
              marginPagesDisplayed={2}
              pageCount={pageCount}
              previousLabel="Trước"
              pageClassName="page-item"
              pageLinkClassName="page-link"
              previousClassName="page-item"
              previousLinkClassName="page-link"
              nextClassName="page-item"
              nextLinkClassName="page-link"
              breakLabel="..."
              breakClassName="page-item"
              breakLinkClassName="page-link"
              containerClassName="pagination flex gap-2 py-4"
              activeClassName="bg-blue-500 text-white"
              renderOnZeroPageCount={null}
            />
          </div>
        </div>
        <div className="flex-[2] flex flex-col  min-w-[250px]">
          <div className="relative">
            <input
              type="text"
              className="w-full border py-1 rounded pr-10"
              placeholder="Search..."
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-800 cursor-pointer h-[90%] flex justify-center items-center">
              <IoSearchSharp />
            </div>
          </div>

          <div className="flex flex-col gap-3 mt-16">
            <h3 className="font-poppins font-medium text-xl text-gray-900">
              Sản phẩm liên quan gần đây
            </h3>

            {listProducts && listProducts.length > 0 ? (
              <ul className="w-full flex flex-col gap-3" role="list">
                {listProducts.map((product, index) => {
                  // Kiểm tra dữ liệu product hợp lệ
                  if (!product) return null;

                  const productId =
                    product.id || product._id || `product-${index}`;
                  const productName =
                    product.nameProduct ||
                    product.name ||
                    "Sản phẩm không có tên";
                  const productImage =
                    product.image_url?.[0] ||
                    product.image ||
                    "/placeholder-image.jpg";
                  const productPrice =
                    product.salePrice || product.price || "Liên hệ";

                  return (
                    <li key={productId} className="w-full">
                      <Link
                        to={`/SingleProduct/${productId}`}
                        className="block w-full border border-gray-200 rounded-lg p-4 hover:shadow-md hover:border-gray-300 transition-all duration-200 bg-white text-inherit no-underline"
                      >
                        <div className="flex gap-4">
                          <div className="w-[100px] h-[100px] flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden border border-gray-100">
                            <img
                              src={productImage}
                              alt={productName}
                              className="h-full w-full object-cover object-center"
                              loading="lazy"
                              onError={(e) => {
                                e.target.src = "/placeholder-image.jpg";
                                e.target.alt = "Hình ảnh không khả dụng";
                              }}
                            />
                          </div>

                          <div className="flex-1 min-w-0 flex flex-col justify-center">
                            <h4 className="text-gray-900 font-medium text-base line-clamp-2 mb-2 hover:text-blue-600 transition-colors">
                              {productName}
                            </h4>
                            <p className="text-lg text-blue-600 font-semibold">
                              {typeof productPrice === "number"
                                ? `${productPrice.toLocaleString("vi-VN")} VNĐ`
                                : productPrice}
                            </p>
                          </div>
                        </div>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <div className="w-full py-8 text-center text-gray-500">
                <p>Không có sản phẩm liên quan nào</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <Quality />
      <Footer />
    </div>
  );
};

export default Blog;
