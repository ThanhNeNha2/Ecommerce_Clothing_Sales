import React from "react";
import Header from "../../components/Header/Header";
import imgslide from "../../../public/home/home.png";
const Home = () => {
  return (
    <div>
      <Header />
      <div className="w-full h-[716px] relative">
        <img src={imgslide} alt="" className="w-full h-full" />
        <div
          className=" absolute top-[153px] left-[739px]  w-[643px] h-[442px] px-10 py-16 flex flex-col gap-10"
          style={{ background: "#FFF3E3" }}
        >
          <div className=" flex flex-col gap-3">
            <span className="font-poppins font-semibold text-base tracking-[3px]">
              New Arrival
            </span>
            <h1
              className=" font-poppins text-[52px] leading-[65px] font-bold"
              style={{ color: "#B88E2F" }}
            >
              Discover Our New Collection
            </h1>
            <p className="font-poppins font-medium text-lg leading-[24px]">
              Lorem ipsum dolor sit amet, consectetur elit. UT elit tellus,
              luctus nec ullamcorper mattis.
            </p>
          </div>
          <div>
            <button
              className="font-poppins font-bold text-base py-[25px] px-[72px] "
              style={{ background: "#B88E2F" }}
            >
              BUY NOW
            </button>
          </div>
        </div>
      </div>
      {/* Browse the range */}
      <div>
        <div>
          <span>Browse the range</span>
          <span> Lorem ipsum dolor sit amet, consectetur adipiscing elit.</span>
        </div>
      </div>
    </div>
  );
};

export default Home;
