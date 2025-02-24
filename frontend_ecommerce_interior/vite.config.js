import { defineConfig } from "vite";
import react from "@vitejs/plugin-react"; // hoặc vue nếu bạn dùng Vue

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5174, // Đổi cổng từ 5173 -> 5174
  },
});
