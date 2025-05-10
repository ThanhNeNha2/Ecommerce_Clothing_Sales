import { Link, useNavigate } from "react-router-dom"; // Thêm useNavigate
import "./Menu.scss";
import { menu } from "../../data";
import { apiCustom } from "../../custom/customApi";

const Logout = async () => {
  const res = await apiCustom.post("logout");
  return res;
};
const Menu = () => {
  const navigate = useNavigate(); // Hook để điều hướng

  // Hàm xử lý logout
  const handleLogout = async () => {
    try {
      const res = await Logout();
      if (res.status === 200) {
        localStorage.removeItem("user");
        localStorage.removeItem("accessToken");
        navigate("/login");
      }
    } catch (error) {
      console.log("Log error", error);
    }
  };

  return (
    <div className="menu">
      {menu.map((item) => (
        <div className="item" key={item.id}>
          <span className="title">{item.title}</span>
          {item.listItems.map((listItem) =>
            // Kiểm tra nếu là mục "Logout"
            listItem.title === "Logout" ? (
              <div
                className="listItem"
                key={listItem.id}
                onClick={handleLogout} // Gọi hàm logout khi nhấn
                style={{ cursor: "pointer" }}
              >
                <img src={listItem.icon} alt="" style={{ width: "22px" }} />
                <span className="listItemTitle">{listItem.title}</span>
              </div>
            ) : (
              <Link to={listItem.url} className="listItem" key={listItem.id}>
                <img src={listItem.icon} alt="" style={{ width: "22px" }} />
                <span className="listItemTitle">{listItem.title}</span>
              </Link>
            )
          )}
        </div>
      ))}
    </div>
  );
};

export default Menu;
