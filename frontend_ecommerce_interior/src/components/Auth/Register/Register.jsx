import { Button, Col, Divider, Form, Input, notification, Row } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { apiRegister } from "../../../services/api";

const Register = () => {
  const navigate = useNavigate();

  //  Click Register
  const onFinish = async (values) => {
    const { confirmpassword, ...info } = values;
    if (info.password !== confirmpassword) {
      notification.error({
        message: "Mật khẩu không khớp",
        description:
          "Vui lòng kiểm tra lại mật khẩu và mật khẩu xác nhận của bạn.",
      });
    } else {
      try {
        const res = await apiRegister(info);
        console.log("check register ", res);

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
      }
    }
  };
  return (
    <div>
      <Row justify={"center"} style={{ marginTop: "30px" }}>
        <Col xs={24} md={16} lg={8}>
          <fieldset
            style={{
              padding: "15px",
              margin: "5px",
              border: "1px solid #ccc",
              borderRadius: "5px",
            }}
          >
            <legend>Đăng Ký Tài Khoản</legend>
            <Form
              name="basic"
              onFinish={onFinish}
              autoComplete="off"
              layout="vertical"
            >
              {/*  EMAIL */}
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Please input your email!",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              {/*   PASSWORD */}
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

              {/*  CONFIRM PASSWORD */}
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

              {/* NAME */}
              <Form.Item
                label="Name"
                name="username"
                rules={[
                  {
                    required: true,
                    message: "Please input your name!",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
            <Link href={"/"}>
              <ArrowLeftOutlined /> Quay lại trang chủ
            </Link>
            <Divider />
            <div style={{ textAlign: "center" }}>
              Đã có tài khoản? <Link href={"/auth/login"}>Đăng nhập</Link>
            </div>
          </fieldset>
        </Col>
      </Row>
    </div>
  );
};

export default Register;
