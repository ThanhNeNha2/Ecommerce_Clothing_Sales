import { Routes, Route } from "react-router-dom";
import Register from "../../components/Auth/Register/Register";
import Login from "../../components/Auth/Login/Login";
import Verify from "../../components/Modals/verify";
import Home from "../../page/home/Home";
import Blog from "../../page/Blog/Blog";
import SingleProduct from "../../page/SingleProduct/SingleProduct";
import Cart from "../../page/Cart/Cart";
import Checkout from "../../page/Checkout/Checkout";
import Contact from "../../page/Contact/Contact";
import ProductComparison from "../../page/ProductComparison/ProductComparison";
import ListProduct from "../../page/ListProduct/ListProduct";
import ProfileUser from "../../page/ProfileUser/ProfileUser";
import DetailBlog from "../../page/DetailBlog/DetailBlog";

const RouterCustom = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/verify/:id" element={<Verify />} />
      <Route path="SingleProduct" element={<SingleProduct />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/Checkout" element={<Checkout />} />
      <Route path="/Contact" element={<Contact />} />
      <Route path="/ProductComparison" element={<ProductComparison />} />
      <Route path="ListProduct" element={<ListProduct />} />
      <Route path="ProfileUser" element={<ProfileUser />} />
      <Route path="DetailBlog" element={<DetailBlog />} />
    </Routes>
  );
};

export default RouterCustom;
