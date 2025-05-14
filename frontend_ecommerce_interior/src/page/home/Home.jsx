import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import imgslide from "../../../public/home/main.webp";
import img2 from "../../../public/home/nam.jpg";
import img1 from "../../../public/home/Nu.jpg";
import img3 from "../../../public/home/treem.jpg";
import img4 from "../../../public/home/anh4.jpg";

import Products from "../../components/Products/Products";
import SliceProduct from "../../components/Home/SliceProduct/SliceProduct";
import SetupProduct from "../../components/Home/SetupProduct/SetupProduct";
import Footer from "../../components/Footer/Footer";
import HeroSection from "../../components/Home/HeroSection/HeroSection";
import ItemType from "../../components/Home/ItemType/ItemType";
import { instance } from "../../Custom/Axios/AxiosCustom";

const Home = () => {
  const [addProduct, setaddProduct] = useState(8);

  const [listProducts, setListProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getAllProduct = async () => {
    try {
      setLoading(true);
      const res = await instance.get(`/product?limit=${addProduct}`);
      // console.log("check thong tin res ", res.data.products);
      setListProducts(res.data.products || []);
    } catch (err) {
      console.error("Lỗi khi lấy sản phẩm:", err);
      setError("Không thể tải sản phẩm. Vui lòng thử lại sau.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllProduct();
  }, [addProduct]);

  if (loading) return <div className="text-center py-8">Đang tải...</div>;
  if (error)
    return <div className="text-center py-8 text-red-500">{error}</div>;
  return (
    <div>
      <Header />
      <HeroSection imgslide={imgslide} />

      <ItemType img2={img2} img1={img1} img3={img3} img4={img4} />

      <div>
        <span className="font-poppins text-[28px] font-bold flex justify-center mt-16 mb-8">
          Our Products
        </span>
      </div>
      <Products listProducts={listProducts} />
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
