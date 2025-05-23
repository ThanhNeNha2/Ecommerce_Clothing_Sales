import { Routes, Route, Navigate } from "react-router-dom";
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
import Promotion from "../../page/Promotion/Promotion";
import Order from "../../page/Order/Order";

// Component PrivateRoute để bảo vệ các tuyến đường
const PrivateRoute = ({ element }) => {
  const isAuthenticated = () => {
    const accessToken = localStorage.getItem("accessToken");
    const user = localStorage.getItem("user");
    return accessToken && user;
  };

  return isAuthenticated() ? element : <Navigate to="/login" />;
};

const RouterCustom = () => {
  return (
    <Routes>
      {/* Các tuyến đường công khai */}
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/verify/:id" element={<Verify />} />

      {/* Các tuyến đường bảo vệ */}
      <Route path="/blog" element={<PrivateRoute element={<Blog />} />} />
      <Route
        path="/SingleProduct/:id"
        element={<PrivateRoute element={<SingleProduct />} />}
      />
      <Route path="/cart" element={<PrivateRoute element={<Cart />} />} />
      <Route
        path="/Checkout"
        element={<PrivateRoute element={<Checkout />} />}
      />
      <Route path="/Contact" element={<PrivateRoute element={<Contact />} />} />
      <Route
        path="/ProductComparison"
        element={<PrivateRoute element={<ProductComparison />} />}
      />
      <Route
        path="/ListProduct"
        element={<PrivateRoute element={<ListProduct />} />}
      />
      <Route
        path="/ProfileUser"
        element={<PrivateRoute element={<ProfileUser />} />}
      />
      <Route
        path="/listPromotion"
        element={<PrivateRoute element={<Promotion />} />}
      />
      <Route
        path="/DetailBlog/:id"
        element={<PrivateRoute element={<DetailBlog />} />}
      />
      <Route path="/order" element={<PrivateRoute element={<Order />} />} />
    </Routes>
  );
};

export default RouterCustom;
