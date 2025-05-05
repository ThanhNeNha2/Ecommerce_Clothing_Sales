import React from "react";

const HeroSection = ({ imgslide }) => {
  return (
    <div className="w-full h-[716px] relative">
      <img src={imgslide} alt="" className="w-full h-full" />
      <div
        className=" absolute top-[153px] right-[739px]  w-[643px] h-[442px] 2xl:h-auto px-10 py-16 flex flex-col gap-10"
        style={{ background: "#FFF3E3" }}
      >
        <div className=" flex flex-col gap-3">
          <span className="font-poppins font-semibold text-base tracking-[3px]">
            New Arrival
          </span>
          <h1
            className=" font-poppins text-[52px] 2xl:text-[42px] leading-[65px] 2xl:leading-[45px]  font-bold"
            style={{ color: "#B88E2F" }}
          >
            Discover Our New Collection
          </h1>
          <p className="font-poppins font-medium text-lg 2xl:text-[14px] leading-[24px]">
            Lorem ipsum dolor sit amet, consectetur elit. UT elit tellus, luctus
            nec ullamcorper mattis.
          </p>
        </div>
        <div>
          <button
            className="font-poppins font-bold text-base py-[25px] 2xl:py-[10px] px-[72px] 2xl:px-[32px]"
            style={{ background: "#B88E2F" }}
          >
            BUY NOW
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
