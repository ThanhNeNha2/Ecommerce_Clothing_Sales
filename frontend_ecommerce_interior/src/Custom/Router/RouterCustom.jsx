import { Routes, Route } from "react-router-dom";
import Register from "../../components/Auth/Register/Register";
import Login from "../../components/Auth/Login/Login";
import Verify from "../../components/Modals/verify";
import Home from "../../page/home/Home";
import Blog from "../../page/Blog/Blog";

const RouterCustom = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/verify/:id" element={<Verify />} />
    </Routes>
  );
};

export default RouterCustom;
