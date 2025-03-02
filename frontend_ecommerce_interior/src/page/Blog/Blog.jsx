import React from "react";
import Header from "../../components/Header/Header";
import imgmain from "../../../public/blog/Rectangle 1.png";
import logo from "../../../public/Logo/Meubel House_Logos-05 (1).png";
import { FaAngleRight, FaTag, FaUser } from "react-icons/fa";
import { BsCalendar2DateFill } from "react-icons/bs";
import { IoSearchSharp } from "react-icons/io5";
import CoverImg from "../../components/Cover/CoverImg";
import Quality from "../../components/Quality/Quality";
import Footer from "../../components/Footer/Footer";

const Blog = () => {
  return (
    <div>
      <Header />
      {/* slider */}
      <CoverImg namePage="Blog" />
      {/*  */}
      <div className="  px-[200px] pt-16 flex gap-10">
        <div className="flex-[4]   flex justify-center flex-col gap-20 ">
          {/* bai 1  */}
          <div className="flex  flex-col gap-3  w-full">
            {/* anh */}
            <div className="flex justify-center bg-red-50 w-full rounded">
              <img
                src="https://images.pexels.com/photos/1422286/pexels-photo-1422286.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt=""
                className=" w-full h-[400px] rounded"
              />
            </div>
            {/*  */}
            <div className="flex gap-5 text-sm">
              <div className="flex items-center gap-1 text-gray-500">
                <FaUser /> Admin
              </div>
              <div className="flex items-center gap-1 text-gray-500">
                <BsCalendar2DateFill /> 14 Oct 2022
              </div>
              <div className="flex items-center gap-1 text-gray-500">
                <FaTag /> Wood
              </div>
            </div>
            <h1 className="font-poppins font-semibold text-xl">
              Going all-in with millennial design
            </h1>
            <span className="text-sm text-gray-400">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Mus
              mauris vitae ultricies leo integer malesuada nunc. In nulla
              posuere sollicitudin aliquam ultrices. Morbi blandit cursus risus
              at ultrices mi tempus imperdiet. Libero enim sed faucibus turpis
              in. Cursus mattis molestie a iaculis at erat. Nibh cras pulvinar
              mattis nunc sed blandit libero. Pellentesque elit ullamcorper
              dignissim cras tincidunt. Pharetra et ultrices neque ornare aenean
              euismod elementum.
            </span>
            <div>
              <span className="relative w-[20%] after:content-[''] after:absolute after:left-0 after:bottom-[-10px] after:w-full after:h-[2px] after:bg-black">
                Read more
              </span>
            </div>
          </div>
          {/* bai 1  */}
          <div className="flex  flex-col gap-3  w-full">
            {/* anh */}
            <div className="flex justify-center bg-red-50 w-full rounded">
              <img
                src="https://images.pexels.com/photos/1422286/pexels-photo-1422286.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt=""
                className=" w-full h-[400px] rounded"
              />
            </div>
            {/*  */}
            <div className="flex gap-5 text-sm">
              <div className="flex items-center gap-1 text-gray-500">
                <FaUser /> Admin
              </div>
              <div className="flex items-center gap-1 text-gray-500">
                <BsCalendar2DateFill /> 14 Oct 2022
              </div>
              <div className="flex items-center gap-1 text-gray-500">
                <FaTag /> Wood
              </div>
            </div>
            <h1 className="font-poppins font-semibold text-xl">
              Going all-in with millennial design
            </h1>
            <span className="text-sm text-gray-400">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Mus
              mauris vitae ultricies leo integer malesuada nunc. In nulla
              posuere sollicitudin aliquam ultrices. Morbi blandit cursus risus
              at ultrices mi tempus imperdiet. Libero enim sed faucibus turpis
              in. Cursus mattis molestie a iaculis at erat. Nibh cras pulvinar
              mattis nunc sed blandit libero. Pellentesque elit ullamcorper
              dignissim cras tincidunt. Pharetra et ultrices neque ornare aenean
              euismod elementum.
            </span>
            <div>
              <span className="relative w-[20%] after:content-[''] after:absolute after:left-0 after:bottom-[-10px] after:w-full after:h-[2px] after:bg-black">
                Read more
              </span>
            </div>
          </div>
          {/* bai 1  */}
          <div className="flex  flex-col gap-3  w-full">
            {/* anh */}
            <div className="flex justify-center bg-red-50 w-full rounded">
              <img
                src="https://images.pexels.com/photos/1422286/pexels-photo-1422286.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt=""
                className=" w-full h-[400px] rounded"
              />
            </div>
            {/*  */}
            <div className="flex gap-5 text-sm">
              <div className="flex items-center gap-1 text-gray-500">
                <FaUser /> Admin
              </div>
              <div className="flex items-center gap-1 text-gray-500">
                <BsCalendar2DateFill /> 14 Oct 2022
              </div>
              <div className="flex items-center gap-1 text-gray-500">
                <FaTag /> Wood
              </div>
            </div>
            <h1 className="font-poppins font-semibold text-xl">
              Going all-in with millennial design
            </h1>
            <span className="text-sm text-gray-400">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Mus
              mauris vitae ultricies leo integer malesuada nunc. In nulla
              posuere sollicitudin aliquam ultrices. Morbi blandit cursus risus
              at ultrices mi tempus imperdiet. Libero enim sed faucibus turpis
              in. Cursus mattis molestie a iaculis at erat. Nibh cras pulvinar
              mattis nunc sed blandit libero. Pellentesque elit ullamcorper
              dignissim cras tincidunt. Pharetra et ultrices neque ornare aenean
              euismod elementum.
            </span>
            <div>
              <span className="relative w-[20%] after:content-[''] after:absolute after:left-0 after:bottom-[-10px] after:w-full after:h-[2px] after:bg-black">
                Read more
              </span>
            </div>
          </div>
          {/* bai 1  */}
          <div className="flex  flex-col gap-3  w-full">
            {/* anh */}
            <div className="flex justify-center bg-red-50 w-full rounded">
              <img
                src="https://images.pexels.com/photos/1422286/pexels-photo-1422286.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt=""
                className=" w-full h-[400px] rounded"
              />
            </div>
            {/*  */}
            <div className="flex gap-5 text-sm">
              <div className="flex items-center gap-1 text-gray-500">
                <FaUser /> Admin
              </div>
              <div className="flex items-center gap-1 text-gray-500">
                <BsCalendar2DateFill /> 14 Oct 2022
              </div>
              <div className="flex items-center gap-1 text-gray-500">
                <FaTag /> Wood
              </div>
            </div>
            <h1 className="font-poppins font-semibold text-xl">
              Going all-in with millennial design
            </h1>
            <span className="text-sm text-gray-400">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Mus
              mauris vitae ultricies leo integer malesuada nunc. In nulla
              posuere sollicitudin aliquam ultrices. Morbi blandit cursus risus
              at ultrices mi tempus imperdiet. Libero enim sed faucibus turpis
              in. Cursus mattis molestie a iaculis at erat. Nibh cras pulvinar
              mattis nunc sed blandit libero. Pellentesque elit ullamcorper
              dignissim cras tincidunt. Pharetra et ultrices neque ornare aenean
              euismod elementum.
            </span>
            <div>
              <span className="relative w-[20%] after:content-[''] after:absolute after:left-0 after:bottom-[-10px] after:w-full after:h-[2px] after:bg-black">
                Read more
              </span>
            </div>
          </div>
        </div>
        <div className="flex-[2] flex flex-col gap-5 ">
          <div className=" ">
            <div className="relative w-[70%]">
              <input type="text" className="w-full border py-1 rounded pr-8" />
              <div className="absolute right-1 top-1/2 border-l -translate-y-1/2 text-gray-500 hover:text-gray-800 cursor-pointer  h-[90%] w-[50px] flex justify-center items-center ">
                <IoSearchSharp />
              </div>
            </div>
          </div>
          {/* Categories */}
          <div className=" flex flex-col gap-3">
            <span className="font-poppins font-medium text-xl">Categories</span>
            <ul className="w-[80%] px-5 flex flex-col gap-5">
              <li className="flex justify-between text-gray-400">
                <span>Crafts</span>
                <p>2</p>
              </li>
              <li className="flex justify-between text-gray-400">
                <span>Design</span>
                <p>8</p>
              </li>{" "}
              <li className="flex justify-between text-gray-400">
                <span>Handmade</span>
                <p>7</p>
              </li>{" "}
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
          {/*   Recent Posts */}
          <div className=" flex flex-col gap-3 mt-16">
            <span className="font-poppins font-medium text-xl">
              Recent Posts
            </span>
            <ul className="w-[100%]  flex flex-col gap-5">
              <li className="flex gap-5 text-gray-400">
                <div className="w-[100px] h-[100px] ">
                  <img
                    src="https://images.pexels.com/photos/8581013/pexels-photo-8581013.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                    alt=""
                    className="h-full w-full object-cover  object-bottom"
                  />
                </div>
                <div className="p-1">
                  <span className="text-black ">
                    Going all-in with millennial design
                  </span>
                  <p className="text-sm">03 Aug 2022</p>
                </div>
              </li>
              <li className="flex gap-5 text-gray-400">
                <div className="w-[100px] h-[100px] ">
                  <img
                    src="https://images.pexels.com/photos/8581013/pexels-photo-8581013.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                    alt=""
                    className="h-full w-full object-cover  object-bottom"
                  />
                </div>
                <div className="p-1">
                  <span className="text-black ">
                    Going all-in with millennial design
                  </span>
                  <p className="text-sm">03 Aug 2022</p>
                </div>
              </li>{" "}
              <li className="flex gap-5 text-gray-400">
                <div className="w-[100px] h-[100px] ">
                  <img
                    src="https://images.pexels.com/photos/8581013/pexels-photo-8581013.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                    alt=""
                    className="h-full w-full object-cover  object-bottom"
                  />
                </div>
                <div className="p-1">
                  <span className="text-black ">
                    Going all-in with millennial design
                  </span>
                  <p className="text-sm">03 Aug 2022</p>
                </div>
              </li>{" "}
              <li className="flex gap-5 text-gray-400">
                <div className="w-[100px] h-[100px] ">
                  <img
                    src="https://images.pexels.com/photos/8581013/pexels-photo-8581013.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                    alt=""
                    className="h-full w-full object-cover  object-bottom"
                  />
                </div>
                <div className="p-1">
                  <span className="text-black ">
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
