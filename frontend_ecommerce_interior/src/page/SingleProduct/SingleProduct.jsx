import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import DetailProduct from "../../components/SingleProduct/DetailProduct";
import { MdKeyboardArrowRight } from "react-icons/md";
import Products from "../../components/Products/Products";
import Footer from "../../components/Footer/Footer";

const SingleProduct = () => {
  const [addProduct, setaddProduct] = useState(4);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="flex flex-col">
      <Header />
      <div
        className="flex h-[55px] mt-[60px] items-center px-[130px] gap-3"
        style={{
          background: "#F9F1E7",
        }}
      >
        <div className="flex items-center">
          <span>Home</span> <MdKeyboardArrowRight />
        </div>

        <div className="flex items-center">
          <span>Shop</span> <MdKeyboardArrowRight />
        </div>
        <div>
          <span className="font-medium">Asgaard sofa</span>
        </div>
      </div>
      <DetailProduct />
      <hr className="my-7" />
      <div>
        <span className="font-poppins text-[28px] font-bold flex justify-center mt-16 mb-8">
          Related Products
        </span>
      </div>
      <Products value={addProduct} />
      <div className="flex justify-center items-center mt-7 mb-16">
        <button
          className="py-2 px-5 bg-white border border-colorMain text-colorMain text-base font-medium font-poppins hover:bg-gray-200 rounded"
          onClick={() => setaddProduct(addProduct + 4)}
        >
          Show More
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default SingleProduct;
