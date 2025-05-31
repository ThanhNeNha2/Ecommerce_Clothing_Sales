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

const Blog = () => {
  dayjs.extend(utc);
  dayjs.extend(timezone);
  const [items, setItems] = useState([]);
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 4;

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
        <div className="flex-[2] flex flex-col gap-5 min-w-[250px]">
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
          <div className="flex flex-col gap-3">
            <span className="font-poppins font-medium text-xl">Categories</span>
            <ul className="w-[80%] px-5 flex flex-col gap-5">
              <li className="flex justify-between text-gray-400">
                <span>Crafts</span>
                <p>2</p>
              </li>
              <li className="flex justify-between text-gray-400">
                <span>Design</span>
                <p>8</p>
              </li>
              <li className="flex justify-between text-gray-400">
                <span>Handmade</span>
                <p>7</p>
              </li>
              <li className="flex justify-between text-gray-400">
                <span>Interior</span>
                <p>2</p>
              </li>
              <li className="flex justify-between text-gray-400">
                <span>Wood</span>
                <p>6</p>
              </li>
            </ul>
          </div>
          <div className="flex flex-col gap-3 mt-16">
            <span className="font-poppins font-medium text-xl">
              Recent Posts
            </span>
            <ul className="w-[100%] flex flex-col gap-5">
              <li className="flex gap-5 text-gray-400">
                <div className="w-[100px] h-[100px]">
                  <img
                    src="https://images.pexels.com/photos/8581013/pexels-photo-8581013.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                    alt="Recent post"
                    className="h-full w-full object-cover object-bottom"
                  />
                </div>
                <div className="p-1">
                  <span className="text-black">
                    Going all-in with millennial design
                  </span>
                  <p className="text-sm">03 Aug 2022</p>
                </div>
              </li>
              <li className="flex gap-5 text-gray-400">
                <div className="w-[100px] h-[100px]">
                  <img
                    src="https://images.pexels.com/photos/8581013/pexels-photo-8581013.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                    alt="Recent post"
                    className="h-full w-full object-cover object-bottom"
                  />
                </div>
                <div className="p-1">
                  <span className="text-black">
                    Going all-in with millennial design
                  </span>
                  <p className="text-sm">03 Aug 2022</p>
                </div>
              </li>
              <li className="flex gap-5 text-gray-400">
                <div className="w-[100px] h-[100px]">
                  <img
                    src="https://images.pexels.com/photos/8581013/pexels-photo-8581013.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                    alt="Recent post"
                    className="h-full w-full object-cover object-bottom"
                  />
                </div>
                <div className="p-1">
                  <span className="text-black">
                    Going all-in with millennial design
                  </span>
                  <p className="text-sm">03 Aug 2022</p>
                </div>
              </li>
              <li className="flex gap-5 text-gray-400">
                <div className="w-[100px] h-[100px]">
                  <img
                    src="https://images.pexels.com/photos/8581013/pexels-photo-8581013.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                    alt="Recent post"
                    className="h-full w-full object-cover object-bottom"
                  />
                </div>
                <div className="p-1">
                  <span className="text-black">
                    Going all-in with millennial design
                  </span>
                  <p className="text-sm">03 Aug 2022</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <Quality />
      <Footer />
    </div>
  );
};

export default Blog;
