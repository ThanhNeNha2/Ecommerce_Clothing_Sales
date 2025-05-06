import { Button, Col, Divider, Form, Input, notification, Row } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { apiRegister } from "../../../services/api";
import bia from "../../../../public/auth/bia.webp";
import { useState } from "react";

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); // Thêm trạng thái loading

  const onFinish = async (values) => {
    const { confirmpassword, ...info } = values;
    if (info.password !== confirmpassword) {
      notification.error({
        message: "Mật khẩu không khớp",
        description:
          "Vui lòng kiểm tra lại mật khẩu và mật khẩu xác nhận của bạn.",
      });
    } else {
      setLoading(true); // Bắt đầu trạng thái loading
      try {
        const res = await apiRegister(info);

        notification.success({
          message: "Đăng ký thành công",
          description: "Bạn đã đăng ký thành công!",
        });

        if (res && res.user && res.user._id) {
          navigate(`/verify/${res.user._id}`);
        } else {
          console.error("User ID không hợp lệ");
        }
      } catch (error) {
        console.log("Error", error);
        notification.error({
          message: "Đăng ký thất bại",
          description: "Có lỗi xảy ra khi đăng ký, vui lòng thử lại.",
        });
      } finally {
        setLoading(false); // Kết thúc trạng thái loading (dù thành công hay thất bại)
      }
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${bia})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
      }}
    >
      <Row justify="center" align="middle" style={{ minHeight: "100vh" }}>
        <Col xs={24} md={16} lg={8}>
          <fieldset
            style={{
              padding: "15px",
              margin: "5px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              backgroundColor: "rgba(255, 255, 255, 0.95)",
            }}
          >
            <legend>Đăng Ký Tài Khoản</legend>
            <Form
              name="basic"
              onFinish={onFinish}
              autoComplete="off"
              layout="vertical"
            >
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { required: true, message: "Please input your email!" },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[
                  { required: true, message: "Please input your password!" },
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item
                label="Confirm Password"
                name="confirmpassword"
                rules={[
                  {
                    required: true,
                    message: "Please input your confirm password!",
                  },
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item
                label="Name"
                name="username"
                rules={[{ required: true, message: "Please input your name!" }]}
              >
                <Input />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  block
                  loading={loading} // Hiển thị spinner khi đang xử lý
                >
                  {loading ? "Đang xử lý..." : "Submit"}{" "}
                  {/* Thay đổi văn bản nút */}
                </Button>
              </Form.Item>
            </Form>

            <Link to={"/"}>
              <ArrowLeftOutlined /> Quay lại trang chủ
            </Link>
            <Divider />
            <div style={{ textAlign: "center" }}>
              Đã có tài khoản? <Link to={"/login"}>Đăng nhập</Link>
            </div>
          </fieldset>
        </Col>
      </Row>
    </div>
  );
};

export default Register;
