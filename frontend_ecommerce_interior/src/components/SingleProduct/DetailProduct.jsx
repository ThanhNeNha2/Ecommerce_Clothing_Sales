import React from "react";
import { BsTwitter } from "react-icons/bs";
import { FaFacebook } from "react-icons/fa";
import { IoStar, IoStarHalf } from "react-icons/io5";
import { RiInstagramFill } from "react-icons/ri";

const DetailProduct = () => {
  return (
    <div className="">
      {/* hinh anh va thong tin  */}
      <div className="flex mt-[30px] px-[130px]">
        {/*  */}
        <div className="flex gap-3 h-[500px]  w-[48%] ">
          {/* img phụ */}
          <div className="flex flex-col gap-3 w-[20%] h-full">
            <div className=" w-full h-[100px]  rounded">
              <img
                src="https://images.pexels.com/photos/2440471/pexels-photo-2440471.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt=""
                className="w-full h-full object-cover rounded"
              />{" "}
            </div>
            <div className=" w-full h-[100px]  rounded">
              <img
                src="https://images.pexels.com/photos/2440471/pexels-photo-2440471.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt=""
                className="w-full h-full object-cover rounded"
              />{" "}
            </div>
            <div className=" w-full h-[100px]  rounded">
              <img
                src="https://images.pexels.com/photos/2440471/pexels-photo-2440471.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt=""
                className="w-full h-full object-cover rounded"
              />{" "}
            </div>
            <div className=" w-full h-[100px]  rounded">
              <img
                src="https://images.pexels.com/photos/2440471/pexels-photo-2440471.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt=""
                className="w-full h-full object-cover rounded"
              />{" "}
            </div>
          </div>
          {/* img chính  */}
          <div className="  flex-1 rounded">
            <img
              src="https://images.pexels.com/photos/1125135/pexels-photo-1125135.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt=""
              className="w-90%] h-full object-cover rounded"
            />
          </div>
        </div>
        {/*  */}
        <div className=" flex-1 flex flex-col gap-3">
          <span className="font-poppins text-[28px] font-medium">
            Asgaard sofa
          </span>
          <p className="font-poppins text-[18px] text-gray-400">
            {" "}
            Rs. 250,000.00
          </p>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 text-yellow-500">
              <IoStar />
              <IoStar />
              <IoStar />
              <IoStar />
              <IoStarHalf />
            </div>
            <div className="border border-gray-300 h-[20px]"></div>
            <span className="text-[14px] text-gray-400">5 Customer Review</span>
          </div>
          <span>
            Setting the bar as one of the loudest speakers in its class, the
            Kilburn is a compact, stout-hearted hero with a well-balanced audio
            which boasts a clear midrange and extended highs for a sound.
          </span>
          {/* size */}
          <div className="flex flex-col gap-2">
            <span className="text-[15px] text-gray-400">Size</span>
            <div className="flex gap-3">
              <button className="w-[30px] h-[30px] bg-colorMain text-white text-[14px] rounded">
                L
              </button>
              <button
                className="w-[30px] h-[30px]   text-black text-[14px] rounded"
                style={{
                  background: "#F9F1E7",
                }}
              >
                XL
              </button>
              <button
                className="w-[30px] h-[30px]   text-black text-[14px] rounded"
                style={{
                  background: "#F9F1E7",
                }}
              >
                XS
              </button>
            </div>
          </div>
          {/* Color */}
          <div className=" flex flex-col gap-2">
            <span className="text-[15px] text-gray-400">Color</span>
            <div className=" flex gap-3">
              <button className="w-[30px] h-[30px] bg-black rounded-full"></button>
              <button className="w-[30px] h-[30px] bg-red-500 rounded-full"></button>
              <button className="w-[30px] h-[30px] bg-green-500 rounded-full"></button>
            </div>
          </div>
          {/* button */}
          <div className="flex items-center gap-3">
            <div className=" flex items-center ">
              <button className="border border-gray-400 px-3 py-[2px] rounded-l">
                -
              </button>
              <span className="border border-gray-400 px-3 py-[2px]">1</span>
              <button className="border border-gray-400 px-3 py-[2px] rounded-r">
                +
              </button>
            </div>
            <button
              className="  px-3 py-[5px] text-black rounded   text-[14px] hover:opacity-80"
              style={{
                background: "#FFCC99",
              }}
            >
              Add To Cart
            </button>
            <button
              className="  px-3 py-[5px] text-black rounded   text-[14px] hover:opacity-80"
              style={{
                background: "#FFCC99",
              }}
            >
              + Compare
            </button>
          </div>

          {/* đường kẻ  */}
          <hr className="mt-7 mb-7" />
          {/* info */}
          <div>
            <ul className="flex flex-col justify-center gap-3">
              <li className="flex   ">
                <span className="w-[15%]">SKU</span> <p>: SS001</p>
              </li>
              <li className="flex">
                <span className="w-[15%]">Category</span> <p>: Sofas</p>
              </li>
              <li className="flex">
                <span className="w-[15%]">Tags</span>
                <p>: Sofa, Chair, Home, Shop</p>
              </li>
              <li className="flex">
                <span className="w-[15%]">Share</span>
                <p className="flex items-center gap-3">
                  : <FaFacebook /> <RiInstagramFill /> <BsTwitter />
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <hr className="my-7" />
      {/* Nhan xet và mô tả sp  */}
      <div className="mt-[30px] px-[130px] flex flex-col gap-5">
        <div className="flex gap-5 justify-center">
          <span className="font-poppins font-medium text-[20px]">
            Description
          </span>
          <span className="font-poppins font-medium text-[20px] text-gray-400">
            Additional Information
          </span>
          <span className="font-poppins font-medium text-[20px] text-gray-400">
            Reviews {"[5]"}
          </span>
        </div>
        <span className="leading-7 px-28  text-gray-500 ">
          Embodying the raw, wayward spirit of rock {"‘n’"} roll, the Kilburn
          portable active stereo speaker takes the unmistakable look and sound
          of Marshall, unplugs the chords, and takes the show on the road.
          Weighing in under 7 pounds, the Kilburn is a lightweight piece of
          vintage styled engineering. Setting the bar as one of the loudest
          speakers in its class, the Kilburn is a compact, stout-hearted hero
          with a well-balanced audio which boasts a clear midrange and extended
          highs for a sound that is both articulate and pronounced. The analogue
          knobs allow you to fine tune the controls to your personal preferences
          while the guitar-influenced leather strap enables easy and stylish
          travel.
        </span>
        <div className="flex justify-between items-center">
          <div className="w-[49%] rounded">
            <img
              src="https://images.pexels.com/photos/1090092/pexels-photo-1090092.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt=""
              className="w-full h-[300px] object-cover rounded"
            />
          </div>
          <div className="w-[49%] rounded">
            {" "}
            <img
              src="https://images.pexels.com/photos/1090092/pexels-photo-1090092.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt=""
              className="w-full h-[300px] object-cover rounded"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailProduct;
