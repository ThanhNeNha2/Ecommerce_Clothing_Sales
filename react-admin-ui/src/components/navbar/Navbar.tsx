import React, { useState, useEffect } from "react";
import "./navbar.scss";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  // State để lưu thông tin user
  const [user, setUser] = useState<{ name: string; image: string } | null>(
    null
  );
  const navigator = useNavigate();
  // Lấy thông tin user từ localStorage khi component mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser({
        name: parsedUser.username || "User", // Nếu không có name, mặc định là "User"
        image:
          parsedUser.image ||
          "https://i.pinimg.com/736x/3c/ae/07/3cae079ca0b9e55ec6bfc1b358c9b1e2.jpg", // Nếu không có image, dùng ảnh mặc định
      });
    } else {
      navigator("/");
    }
  }, []); // Chỉ chạy một lần khi component mount

  return (
    <div className="navbar">
      <div className="logo">
        <img src="logo.svg" alt="" />
        <span>TRENDORY ADMIN</span>
      </div>
      <div className="icons">
        <img src="/search.svg" alt="" className="icon" />
        <img src="/app.svg" alt="" className="icon" />
        <img src="/expand.svg" alt="" className="icon" />
        <div className="notification">
          <img src="/notifications.svg" alt="" />
          <span>1</span>
        </div>
        <div className="user">
          <img src={user?.image} alt="" />
          <span>{user?.name}</span>
        </div>
        <img src="/settings.svg" alt="" className="icon" />
      </div>
    </div>
  );
};

export default Navbar;
