// test/user.test.js
import request from "supertest";
import app from "../server"; // Đảm bảo app được import đúng từ server.js
import { USER } from "../models/User.model"; // Import chính xác USER

// Mock dữ liệu người dùng giả
const mockUsers = [
  { _id: "1", username: "user1", email: "user1@example.com" },
  { _id: "2", username: "user2", email: "user2@example.com" },
];

// Mock USER.find() trả về mockUsers
jest.mock("../models/User.model.js", () => ({
  USER: {
    find: jest.fn().mockResolvedValue(mockUsers),
  },
}));

describe("GET /api/user", () => {
  it("should return 200 and a list of users without passwords", async () => {
    const response = await request(app).get("/api/user");

    // Kiểm tra kết quả trả về
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("OK");
    expect(response.body.idCode).toBe(0);
    expect(response.body.getAllUser).toEqual(mockUsers); // Kiểm tra danh sách người dùng
  });

  it("should return 500 if there is an error accessing the users", async () => {
    // Giả lập lỗi khi truy vấn cơ sở dữ liệu
    USER.find = jest.fn().mockRejectedValue(new Error("Database error"));

    const response = await request(app).get("/api/user");

    // Kiểm tra khi có lỗi
    expect(response.status).toBe(500);
    expect(response.body.message).toBe(
      "Truy cap danh sach nguoi dung khong thanh cong"
    );
    expect(response.body.idCode).toBe(1);
  });
});
