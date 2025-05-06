import React from "react";

const HeroSection = ({ imgslide }) => {
  return (
    <div className="w-full h-[716px] relative overflow-hidden">
      <img
        src={imgslide}
        alt="Latest fashion collection"
        className="w-full h-full object-cover"
      />
      <div className="absolute top-[153px] left-1/2 transform -translate-x-1/2 md:left-[10%] md:transform-none w-full md:w-[643px] h-[442px] 2xl:h-auto px-6 sm:px-10 py-10 sm:py-16 flex flex-col gap-8 bg-white/90 backdrop-blur-sm">
        <div className="flex flex-col gap-4">
          <span className="font-poppins font-semibold text-base uppercase tracking-[3px] text-gray-600">
            Latest Fashion
          </span>
          <h1
            className="font-poppins text-4xl sm:text-5xl 2xl:text-4xl leading-tight font-bold"
            style={{ color: "#B88E2F" }}
          >
            Explore Our New Clothing Collection
          </h1>
          <p className="font-poppins font-medium text-base sm:text-lg 2xl:text-base leading-6 text-gray-700">
            Discover the latest trends with our exclusive range of stylish
            outfits for men, women, and kids. Elevate your wardrobe today!
          </p>
        </div>
        <div>
          <button
            className="font-poppins font-bold text-base py-3 px-8 sm:py-4 sm:px-10 rounded-md transition-colors duration-200 hover:bg-[#a47926]"
            style={{ background: "#B88E2F", color: "#ffffff" }}
          >
            Shop Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
