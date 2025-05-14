import {
  Button,
  Col,
  Divider,
  Form,
  Input,
  message,
  notification,
  Row,
} from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Link, useParams, useNavigate } from "react-router-dom";
import { activateAccount, reSendKey } from "../../services/api";
import { useState } from "react";

const Verify = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); // Thêm trạng thái loading

  // Hàm kích hoạt tài khoản
  const onFinish = async (values) => {
    const { code } = values;
    setLoading(true); // Bắt đầu trạng thái loading
    try {
      const res = await activateAccount(id, code);

      if (res && res.data.idCode === 0) {
        // Giả định API trả về thuộc tính success khi thành công

        notification.success({
          message: "Kích hoạt thành công",
          description:
            "Tài khoản của bạn đã được kích hoạt! Đang chuyển hướng đến trang đăng nhập...",
        });
        // Chuyển hướng đến trang login sau 2 giây để người dùng đọc thông báo
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        throw new Error("Kích hoạt thất bại");
      }
    } catch (error) {
      console.log("Error", error);
      notification.error({
        message: "Kích hoạt thất bại",
        description:
          "Mã xác nhận không đúng hoặc đã hết hạn. Vui lòng thử lại hoặc gửi lại mã.",
      });
    } finally {
      setLoading(false); // Kết thúc trạng thái loading
    }
  };

  // Hàm gửi lại mã xác nhận
  const handleResend = async () => {
    setLoading(true);
    try {
      const res = await reSendKey(id);

      if (res && res.data.idCode === 0) {
        // Giả định API trả về thuộc tính success
        notification.success({
          message: "Gửi lại mã thành công",
          description: "Mã xác nhận mới đã được gửi đến email của bạn!",
        });
      } else {
        throw new Error("Gửi lại mã thất bại");
      }
    } catch (error) {
      console.log("Error", error);
      notification.error({
        message: "Gửi lại mã thất bại",
        description: "Có lỗi xảy ra khi gửi lại mã. Vui lòng thử lại sau.",
      });
    } finally {
      setLoading(false);
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
            <legend>Kích hoạt tài khoản</legend>
            <Form
              name="basic"
              onFinish={onFinish}
              autoComplete="off"
              layout="vertical"
            >
              <Form.Item label="Id" name="_id" initialValue={id} hidden>
                <Input hidden />
              </Form.Item>
              <Divider />

              <span>
                Chúng tôi đã gửi 1 mã code xác nhận về email của bạn, vui lòng
                nhập để xác nhận tài khoản:
              </span>
              <Divider />
              <Form.Item
                label="Code"
                name="code"
                rules={[
                  {
                    required: true,
                    message: "Please input your code!",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ marginRight: "10px" }}
                  loading={loading}
                >
                  {loading ? "Đang xử lý..." : "Submit"}
                </Button>
                <Button
                  type="default"
                  onClick={handleResend}
                  loading={loading}
                  disabled={loading}
                >
                  Resend
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

export default Verify;
