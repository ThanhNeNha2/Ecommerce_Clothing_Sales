import React from "react";

const ItemType = ({ img1, img2, img3 }) => {
  return (
    <div className="flex flex-col justify-center items-center w-full py-16 px-4 sm:px-6 lg:px-8 gap-12 2xl:gap-8 bg-gray-50">
      {/* Header Section */}
      <div className="flex flex-col items-center text-center max-w-2xl">
        <h2 className="font-poppins font-bold text-4xl sm:text-5xl 2xl:text-4xl text-gray-900">
          Browse the Range
        </h2>
        <p className="font-poppins font-normal text-lg sm:text-xl 2xl:text-lg mt-3 text-gray-600">
          Explore our curated collection of premium clothing for all ages.
        </p>
      </div>

      {/* Image Grid Section */}
      <div className="flex flex-col justify-center sm:flex-row gap-6 lg:gap-8 w-full max-w-7xl">
        {/* Men's Clothes */}
        <div className="flex flex-col items-center gap-6 2xl:gap-5 group">
          <div className="overflow-hidden rounded-lg shadow-md transition-transform duration-300 group-hover:scale-105 h-[500px] w-[300px]">
            <img
              src={img2} // Replace with a single image or adjust collage logic
              alt="Men's clothing"
              className="h-full w-full object-cover"
            />
          </div>
          <span className="font-poppins font-semibold text-xl sm:text-2xl 2xl:text-xl text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
            {` Men's Clothes`}
          </span>
        </div>

        {/* Women's Clothes */}
        <div className="flex flex-col items-center gap-6 2xl:gap-5 group">
          <div className="overflow-hidden rounded-lg shadow-md transition-transform duration-300 group-hover:scale-105 h-[500px] w-[300px]">
            <img
              src={img1}
              alt="Women's clothing"
              className="h-full w-full object-cover"
            />
          </div>

          <span className="font-poppins font-semibold text-xl sm:text-2xl 2xl:text-xl text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
            {`  Women's Clothes`}
          </span>
        </div>

        {/* Children's Clothes */}
        <div className="flex flex-col items-center gap-6 2xl:gap-5 group">
          <div className="overflow-hidden rounded-lg shadow-md transition-transform duration-300 group-hover:scale-105 h-[500px] w-[300px] ">
            <img
              src={img3}
              alt="Children's clothing"
              className="h-full w-full object-cover "
            />
          </div>
          <span className="font-poppins font-semibold text-xl sm:text-2xl 2xl:text-xl text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
            {`Children's Clothes`}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ItemType;
