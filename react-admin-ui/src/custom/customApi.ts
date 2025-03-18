import axios from "axios";

const BASE_URL = "http://localhost:8080/api"; // Base URL của API
export const apiCustom = axios.create({
  baseURL: BASE_URL,
  timeout: 1000,
  headers: { "X-Custom-Header": "foobar" },
});
