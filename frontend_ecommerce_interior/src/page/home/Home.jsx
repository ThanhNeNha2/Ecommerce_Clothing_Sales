import React, { useState } from "react";
import Header from "../../components/Header/Header";
import imgslide from "../../../public/home/home.png";
import img1 from "../../../public/home/Image-living room.png";
import img2 from "../../../public/home/Mask Group (1).png";
import img3 from "../../../public/home/Mask Group.png";
import Products from "../../components/Products/Products";
import SliceProduct from "../../components/Home/SliceProduct/SliceProduct";
import SetupProduct from "../../components/Home/SetupProduct/SetupProduct";
import Footer from "../../components/Footer/Footer";

const Home = () => {
  const [addProduct, setaddProduct] = useState(4);
  return (
    <div>
      <Header />
      <div className="w-full h-[716px] relative">
        <img src={imgslide} alt="" className="w-full h-full" />
        <div
          className=" absolute top-[153px] left-[739px]  w-[643px] h-[442px] 2xl:h-auto px-10 py-16 flex flex-col gap-10"
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
              Lorem ipsum dolor sit amet, consectetur elit. UT elit tellus,
              luctus nec ullamcorper mattis.
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
      {/* Browse the range */}
      <div className=" flex flex-col justify-center w-full  items-center pt-14 gap-16 2xl:gap-10">
        <div className="flex flex-col items-center">
          <span className="font-poppins font-bold text-[32px] 2xl:text-[26px] ">
            Browse the range
          </span>
          <span
            className="font-poppins font-medium text-[20px] 2xl:text-[16px] "
            style={{ color: "#666666" }}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </span>
        </div>
        <div className="flex gap-5   ">
          <div className="flex flex-col items-center gap-8 2xl:gap-4 ">
            <img src={img2} alt="" className="h-[400px]" />
            <span className="font-poppins font-semibold text-2xl 2xl:text-xl ">
              {" "}
              Dining
            </span>
          </div>
          <div className="flex flex-col items-center gap-8 2xl:gap-4">
            <img src={img1} alt="" className="h-[400px]" />
            <span className="font-poppins font-semibold text-2xl 2xl:text-xl ">
              Living
            </span>
          </div>{" "}
          <div className="flex flex-col items-center gap-8 2xl:gap-4">
            <img src={img3} alt="" className="h-[400px]" />
            <span className="font-poppins font-semibold text-2xl 2xl:text-xl ">
              Bedroom
            </span>
          </div>
        </div>
      </div>
      <div>
        <span className="font-poppins text-[28px] font-bold flex justify-center mt-16 mb-8">
          Our Products
        </span>
      </div>
      <Products value={addProduct} />
      <div className="flex justify-center items-center mt-7 ">
        <button
          className="py-2 px-5 bg-white border border-colorMain text-colorMain text-base font-medium font-poppins hover:bg-gray-200 rounded"
          onClick={() => setaddProduct(addProduct + 4)}
        >
          Show More
        </button>
      </div>
      <SliceProduct />
      <SetupProduct />
      <Footer />
    </div>
  );
};

export default Home;
