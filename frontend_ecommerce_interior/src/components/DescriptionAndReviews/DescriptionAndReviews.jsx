import React from "react";
import { RiInstagramFill } from "react-icons/ri";
import { BsTwitter } from "react-icons/bs";
import { FaFacebook } from "react-icons/fa";
import { SingleItem } from "../../services/fakeApi";
const DescriptionAndReviews = () => {
  return (
    <div className="mt-[30px] px-[130px] flex flex-col gap-5">
      <div className="flex gap-5 justify-center">
        <span className="font-poppins font-medium text-[20px]">
          Description
        </span>
        <span className="font-poppins font-medium text-[20px] text-gray-400">
          Additional Information
        </span>
        <span className="font-poppins font-medium text-[20px] text-gray-400">
          Reviews [5]
        </span>
      </div>
      <span className="leading-7 px-28 text-gray-500">
        {SingleItem.description}
      </span>
      <div className="flex justify-between items-center">
        <div className="w-[49%] rounded">
          <img
            src={SingleItem.image_url[0]} // Use product image instead of placeholder
            alt=""
            className="w-full h-[300px] object-cover rounded"
          />
        </div>
        <div className="w-[49%] rounded">
          <img
            src={SingleItem.image_url[1] || SingleItem.image_url[0]} // Fallback to first image
            alt=""
            className="w-full h-[300px] object-cover rounded"
          />
        </div>
      </div>
    </div>
  );
};

export default DescriptionAndReviews;
