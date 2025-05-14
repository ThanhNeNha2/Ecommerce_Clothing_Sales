import axios from "axios";

export const instance = axios.create({
  baseURL: "http://localhost:8080/api/", // Địa chỉ API
  timeout: 5000,
  headers: {
    "X-Custom-Header": "foobar", // Giữ lại nếu cần
  },
});

// Thêm interceptor để tự động thêm accessToken vào header
instance.interceptors.request.use(
  (config) => {
    // Lấy accessToken từ localStorage
    const accessToken = localStorage.getItem("accessToken");

    // Nếu accessToken tồn tại, thêm vào header Authorization
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`; // Hoặc định dạng khác tùy API
    }

    return config;
  },
  (error) => {
    // Xử lý lỗi nếu có
    return Promise.reject(error);
  }
);
