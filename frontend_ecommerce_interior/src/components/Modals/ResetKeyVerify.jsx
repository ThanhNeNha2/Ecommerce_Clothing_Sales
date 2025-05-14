import React, { useState, useEffect } from "react";
import {
  ArrowLeftOutlined,
  SmileOutlined,
  SolutionOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  Button,
  Form,
  Input,
  Modal,
  Steps,
  Col,
  Divider,
  message,
  notification,
} from "antd";
import { activateAccount, resetKeyActivateAccount } from "../../services/api";

const ResetKeyVerify = (props) => {
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState("");
  const [codeId, setCodeId] = useState("");

  const { isModalOpen, setIsModalOpen } = props;
  const [form] = Form.useForm();

  // Đóng modal
  const handleOk = () => {
    setIsModalOpen(false);
    setCurrent(0); // Reset bước về đầu khi đóng
    form.resetFields(); // Reset form
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setCurrent(0);
    form.resetFields();
  };

  // Xử lý gửi lại mã xác nhận (Step 0)
  const onFinishStep0 = async () => {
    setLoading(true);
    try {
      const res = await resetKeyActivateAccount(email); // Gọi API gửi lại mã xác nhận
      console.log("API Response:", res.data); // Kiểm tra phản hồi từ API

      if (res && res.data.idCode === 0) {
        setUserId(res.data.user._id);
        notification.success({
          message: "Gửi mã thành công",
          description: "Mã xác nhận đã được gửi đến email của bạn!",
        });

        setCurrent(1); // Chuyển sang bước tiếp theo
      } else {
        throw new Error("Gửi mã thất bại");
      }
    } catch (error) {
      console.log("Error", error);
      notification.error({
        message: "Gửi mã thất bại",
        description: "Không thể gửi mã xác nhận. Vui lòng thử lại.",
      });
    } finally {
      setLoading(false);
    }
  };

  // Xử lý xác nhận mã (Step 1)
  const onFinishStep1 = async () => {
    setLoading(true);
    try {
      const res = await activateAccount(userId, codeId); // Gọi API kích hoạt tài khoản
      if (res && res.data.idCode === 0) {
        notification.success({
          message: "Kích hoạt thành công",
          description: "Tài khoản của bạn đã được kích hoạt!",
        });
        setCurrent(2); // Chuyển sang bước cuối
        // Đóng modal sau 2 giây
        setTimeout(() => {
          handleOk();
        }, 2000);
      } else {
        throw new Error("Kích hoạt thất bại");
      }
    } catch (error) {
      console.log("Error", error);
      notification.error({
        message: "Kích hoạt thất bại",
        description:
          "Mã xác nhận không đúng hoặc đã hết hạn. Vui lòng thử lại.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Modal
        title="Kích hoạt tài khoản"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        maskClosable={false}
        footer={null} // Ẩn footer mặc định để tùy chỉnh
      >
        <Steps
          current={current}
          items={[
            {
              title: "Login",
              icon: <UserOutlined />,
            },
            {
              title: "Verification",
              icon: <SolutionOutlined />,
            },
            {
              title: "Done",
              icon: <SmileOutlined />,
            },
          ]}
        />

        {current === 0 && (
          <>
            <div style={{ margin: "20px 0 " }}>
              <span>Tài khoản của bạn chưa được kích hoạt</span>
            </div>

            <Form
              form={form}
              name="basic"
              onFinish={onFinishStep0}
              autoComplete="off"
              layout="vertical"
            >
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
                <Input
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" loading={loading}>
                  {loading ? "Đang xử lý..." : "Resend"}
                </Button>
              </Form.Item>
            </Form>
          </>
        )}
        {current === 1 && (
          <Form
            name="basic"
            onFinish={onFinishStep1}
            autoComplete="off"
            layout="vertical"
          >
            <div style={{ padding: "20px 0 10px 0 " }}>
              <span>
                Chúng tôi đã gửi 1 mã code xác nhận về email của bạn, vui lòng
                nhập để xác nhận tài khoản:
              </span>
            </div>

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
              <Input
                onChange={(e) => {
                  setCodeId(e.target.value);
                }}
              />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" loading={loading}>
                {loading ? "Đang xử lý..." : "Submit"}
              </Button>
            </Form.Item>
          </Form>
        )}

        {current === 2 && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              padding: "20px 0 ",
            }}
          >
            <h4>Tài khoản của bạn đã được kích hoạt!</h4>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ResetKeyVerify;
