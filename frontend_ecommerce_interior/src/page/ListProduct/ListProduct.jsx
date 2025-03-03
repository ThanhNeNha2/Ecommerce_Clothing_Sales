import React from "react";
import Header from "../../components/Header/Header";
import CoverImg from "../../components/Cover/CoverImg";
import Products from "../../components/Products/Products";
import Quality from "../../components/Quality/Quality";
import Footer from "../../components/Footer/Footer";

const ListProduct = () => {
  return (
    <div>
      <Header />
      <CoverImg namePage={"Shop"} />
      <Products value={16} />
      <Quality />
      <Footer />
    </div>
  );
};

export default ListProduct;
