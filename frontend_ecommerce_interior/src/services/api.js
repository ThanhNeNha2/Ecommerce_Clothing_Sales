import { instance } from "../Custom/Axios/AxiosCustom";

export const getAllUser = async () => {
  try {
    const user = await instance.get("user");
    return user;
  } catch (error) {
    console.log("Error"), error;
  }
};

// Hàm gọi API đăng ký người dùng
export const apiRegister = async (values) => {
  try {
    const res = await instance.post("auth/register", values); // Gửi yêu cầu đăng ký
    return res.data; // Trả về dữ liệu từ response
  } catch (error) {
    // Xử lý lỗi khi gọi API
    console.error("Lỗi khi gọi API đăng ký: ", error);
  }
};

// Kích hoạt tài khoản
export const activateAccount = async (id, codeId) => {
  try {
    const res = await instance.post(`activateAccount/${id}`, { codeId });
    return res;
  } catch (error) {
    console.log("Error"), error;
  }
};

// tao ma kich hoat moi o trang kich hoat
export const reSendKey = async (id, codeId) => {
  try {
    const res = await instance.post(`reSendKey/${id}`);
    return res;
  } catch (error) {
    console.log("Error"), error;
  }
};

// tao ma kich hoat moi ở trang login
export const resetKeyActivateAccount = async (email) => {
  try {
    const res = await instance.post(`resetKeyActivateAccount`, { email });
    return res;
  } catch (error) {
    console.log("Error"), error;
  }
};
