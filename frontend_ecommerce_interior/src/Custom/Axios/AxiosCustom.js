import axios from "axios";

export const instance = axios.create({
  baseURL: "http://localhost:8080/api/", // Địa chỉ API
  timeout: 5000, // Timeout 5 giây để tránh bị timeout quá nhanh
  headers: { "X-Custom-Header": "foobar" },
});
