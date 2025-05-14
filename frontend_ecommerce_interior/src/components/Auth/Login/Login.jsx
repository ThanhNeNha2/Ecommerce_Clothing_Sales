import { Button, Col, Divider, Form, Input, notification, Row } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import ResetKeyVerify from "../../Modals/ResetKeyVerify";
import { useState } from "react";
import bia from "../../../../public/auth/bia.webp";
import { apiLogin } from "../../../services/api";

const Login = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    const { username, password } = values;
    setLoading(true);
    try {
      const res = await apiLogin({ email: username, password });
      console.log("API Response:", res); // Kiểm tra phản hồi từ API
      if (res && res.idCode === 0) {
        // Thành công
        notification.success({
          message: "Đăng nhập thành công",
          description: "Bạn đã đăng nhập thành công! Đang chuyển hướng...",
        });
        localStorage.setItem("accessToken", res.accessToken);
        localStorage.setItem("user", JSON.stringify(res.user));
        navigate("/"); // Điều chỉnh route theo nhu cầu
      } else if (res && res.idCode === 3) {
        // Tài khoản chưa kích hoạt
        notification.warning({
          message: "Tài khoản chưa được kích hoạt",
          description: "Vui lòng kích hoạt tài khoản trước khi đăng nhập.",
        });

        setIsModalOpen(true);
      } else if (res && res.idCode === 1) {
        // Email hoặc mật khẩu sai
        notification.error({
          message: "Đăng nhập thất bại",
          description:
            res.message || "Email hoặc mật khẩu không đúng. Vui lòng thử lại.",
        });
      } else if (res && res.idCode === 2) {
        // Lỗi server
        notification.error({
          message: "Lỗi server",
          description: res.message || "Có lỗi xảy ra. Vui lòng thử lại sau.",
        });
      } else {
        throw new Error("Phản hồi từ server không hợp lệ");
      }
    } catch (error) {
      console.log("Error", error);
      notification.error({
        message: "Đăng nhập thất bại",
        description: "Có lỗi xảy ra khi kết nối với server. Vui lòng thử lại.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${bia})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        padding: "30px 0",
      }}
    >
      <Row justify={"center"}>
        <Col xs={24} md={16} lg={8}>
          <fieldset
            style={{
              padding: "15px",
              margin: "5px",
              border: "1px solid #ccc",
              marginTop: "100px",
              borderRadius: "5px",
              backgroundColor: "rgba(255, 255, 255, 0.9)",
            }}
          >
            <legend>Đăng Nhập</legend>
            <Form
              name="basic"
              onFinish={onFinish}
              autoComplete="off"
              layout="vertical"
            >
              <Form.Item
                label="Email"
                name="username"
                rules={[
                  {
                    required: true,
                    message: "Please input your email!",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" loading={loading}>
                  {loading ? "Đang xử lý..." : "Login"}
                </Button>
              </Form.Item>
            </Form>
            <Link to={"/"}>
              <ArrowLeftOutlined /> Quay lại trang chủ
            </Link>
            <Divider />
            <div style={{ textAlign: "center" }}>
              Chưa có tài khoản? <Link to={"/register"}>Đăng ký tại đây</Link>
            </div>
          </fieldset>
        </Col>
      </Row>
      <ResetKeyVerify
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </div>
  );
};

export default Login;
