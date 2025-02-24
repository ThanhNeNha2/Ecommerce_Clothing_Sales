# syntax=docker/dockerfile:1

# Giai đoạn 1: Build ứng dụng
FROM node:lts-alpine AS builder

# Thiết lập thư mục làm việc
WORKDIR /app

# Sao chép file package.json và yarn.lock để cài đặt dependencies
COPY package.json ./

# Cài đặt dependencies
RUN yarn install

# Sao chép toàn bộ mã nguồn
COPY . .

# Build ứng dụng
RUN yarn build

# Giai đoạn 2: Chạy ứng dụng
FROM nginx:stable-alpine

# Sao chép build từ giai đoạn trước vào thư mục Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose cổng 80 (Nginx)
EXPOSE 80

# Khởi chạy Nginx
CMD ["nginx", "-g", "daemon off;"]

# EXPOSE 3000