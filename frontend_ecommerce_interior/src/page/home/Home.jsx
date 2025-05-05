import React, { useState } from "react";
import Header from "../../components/Header/Header";
import imgslide from "../../../public/home/main.webp";
import img2 from "../../../public/home/nam.jpg";
import img1 from "../../../public/home/Nu.jpg";
import img3 from "../../../public/home/treem.jpg";
import Products from "../../components/Products/Products";
import SliceProduct from "../../components/Home/SliceProduct/SliceProduct";
import SetupProduct from "../../components/Home/SetupProduct/SetupProduct";
import Footer from "../../components/Footer/Footer";
import HeroSection from "../../components/Home/HeroSection/HeroSection";
import ItemType from "../../components/Home/ItemType/ItemType";

const Home = () => {
  const [addProduct, setaddProduct] = useState(4);
  return (
    <div>
      <Header />
      <HeroSection imgslide={imgslide} />

      <ItemType img2={img2} img1={img1} img3={img3} />

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
