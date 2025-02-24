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
import { Link, useParams } from "react-router-dom";
import { activateAccount, reSendKey } from "../../services/api";

const Verify = () => {
  const { id } = useParams();
  //   HÀM KÍCH HOẠT TÀI KHOẢN
  const onFinish = async (values) => {
    const { code } = values;
    const res = await activateAccount(id, code);
  };
  const handleSubmit = (values) => {
    const { code } = values;
    console.log("Check id và code: ", id, code);
    onFinish(values);
  };

  // HÀM RESEND KEY
  const handleResend = async () => {
    const res = await reSendKey(id);
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
            <legend>Kích hoạt tài khoản </legend>
            <Form
              name="basic"
              onFinish={handleSubmit}
              autoComplete="off"
              layout="vertical"
            >
              <Form.Item label="Id" name="_id" initialValue={id} hidden>
                <Input hidden />
              </Form.Item>
              <Divider />

              <span>
                Chúng tôi đã gửi 1 mã code xác nhận về email của bạn vui lòng
                nhập để xác nhận tài khoản :{" "}
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
                >
                  Submit
                </Button>
                <Button type="default" onClick={handleResend}>
                  Resend
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

export default Verify;
