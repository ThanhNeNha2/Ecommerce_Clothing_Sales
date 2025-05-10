import express from "express";
import mongoose from "mongoose";
import users from "./routes/users.router";
import auth from "./routes/auth.router";
import blog from "./routes/blogs.router";
import chat from "./routes/chat.router";
import mess from "./routes/messages.router";
import product from "./routes/product.router";
import size from "./routes/size.router";

var cors = require("cors");
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
const app = express();
require("dotenv").config();
const port = process.env.PORT || 8080;
mongoose
  .connect(process.env.URL_CONNECT_MONGODB)
  .then(() => {
    console.log("Connect success!");
  })
  .catch((error) => {
    console.log("Connect error!", error);
  });
app.get("/test", (req, res) => {
  res.status(200).json({ message: "API is working!" });
});
// Lấy được thông tin truyền lên từ client
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use("/api", users);
app.use("/api", blog);
app.use("/api", auth);
app.use("/api", product);
app.use("/api", size);

app.use("/api", mess);
app.use("/api", chat);

// chuyen thong tin user qua bên nguoi dung chuyen doi nguoi qua bên phuong thuc thu 2 của trinh duyet
app.listen(port, () =>
  console.log("> Server is up and running on port : " + port)
);
// "test": "echo \"Error: no test specified\" && exit 1",
module.exports = app;
