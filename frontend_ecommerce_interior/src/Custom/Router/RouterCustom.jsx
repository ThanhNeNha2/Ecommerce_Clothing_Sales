import { Routes, Route } from "react-router-dom";
import Register from "../../components/Auth/Register/Register";
import Login from "../../components/Auth/Login/Login";
import Verify from "../../components/Modals/verify";
import Home from "../../page/home/Home";
import Blog from "../../page/Blog/Blog";
import SingleProduct from "../../page/SingleProduct/SingleProduct";
import Cart from "../../page/Cart/Cart";
import Checkout from "../../page/Checkout/Checkout";

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
    </Routes>
  );
};

export default RouterCustom;
