import React from "react";
import img1 from "../../../public/home/Mask Group (1).png";
import { listProducts } from "../../services/fakeApi";
import { IoHeartOutline, IoShareSocial } from "react-icons/io5";
import { RiArrowLeftRightLine } from "react-icons/ri";
const Products = ({ value }) => {
  return (
    <div className="flex flex-wrap justify-between px-[150px] gap-[24px] ">
      {listProducts.slice(0, value).map((product, i) => (
        <div
          key={i}
          className="w-[calc(25%-18px)]  h-[400px] rounded relative group"
          style={{ background: "#F4F5F7" }}
        >
          <div className="h-[300px] relative">
            <img
              src={product.imgItem}
              alt=""
              className=" h-full w-full object-cover rounded"
            />

            <div
              className={`absolute top-3 right-3 w-[40px] h-[40px] ${
                product.salePercentage !== "New" ? "bg-red-400" : "bg-green-400"
              }  rounded-full flex justify-center items-center text-sm font-medium`}
            >
              {product.salePercentage}
            </div>
          </div>
          <div className=" flex flex-col mt-3 px-3">
            <span className="font-poppins text-[18px]  font-semibold">
              rp {product.productName}
            </span>
            <p className="text-gray-600">Stylish cafe chair </p>
            <div className="flex gap-2 items-center">
              <span className="font-poppins font-semibold text-[15px] ">
                Rp {product.salePrice}
              </span>{" "}
              <del className="text-[14px]  font-medium text-gray-400">
                {" "}
                Rp {product.originalPrice}
              </del>
            </div>
          </div>
          <div className="absolute inset-0 bg-gray-600/70 rounded flex flex-col justify-center items-center gap-5 opacity-0 group-hover:opacity-100">
            <div>
              <button
                className="bg-white py-2 px-5 font-poppins font-medium rounded hover:bg-gray-300"
                style={{ color: "#B88E2F" }}
              >
                Add to cart
              </button>{" "}
              <button
                className="bg-white py-2 px-5 font-poppins font-medium rounded hover:bg-gray-300"
                style={{ color: "#B88E2F" }}
              >
                Show Detail
              </button>
            </div>

            <div className="flex gap-4">
              <div className="flex items-center gap-1 text-white hover:text-gray-600 font-poppins font-medium cursor-pointer ">
                <IoShareSocial />
                share
              </div>
              <div className="flex items-center gap-1 text-white hover:text-gray-600 font-poppins font-medium cursor-pointer ">
                <RiArrowLeftRightLine />
                compare
              </div>
              <div className="flex items-center gap-1 text-white hover:text-gray-600 font-poppins font-medium cursor-pointer ">
                <IoHeartOutline />
                Love
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Products;
