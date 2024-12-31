import { Routes, Route } from "react-router-dom";
import Register from "../../components/Auth/Register/Register";
import Login from "../../components/Auth/Login/Login";
import Verify from "../../components/Modals/verify";

const RouterCustom = () => {
  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/verify" element={<Verify />} />
    </Routes>
  );
};

export default RouterCustom;
