import dayjs from "dayjs";
import USER from "../models/User.model";
import * as bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import { sendEmail } from "../service/nodeMailer";
var refreshTokens = [];
import jwt from "jsonwebtoken";

//  REGISTER
export const Register = async (req, res) => {
  console.log("  req.body", req.body);

  try {
    const { password } = req.body;
    console.log("check dau vao cua req ", req.body);
    const checkEmail = await USER.findOne({ email: req.body.email });
    if (checkEmail) {
      return res.status(500).json({
        message: "Email đã tồn tại ",
        idCode: 1,
      });
    }
    const codeId = uuidv4();
    const hashPassword = bcrypt.hashSync(password, 10);

    const user = await USER.create({
      ...req.body,
      password: hashPassword,
      codeExpired: dayjs().add(5, "minutes"),
      codeId: codeId,
    });
    await sendEmail(user.username, codeId, user.email);
    return res.status(200).json({
      message: "OK",
      idCode: 0,
      user,
    });
  } catch (error) {
    console.log("Error", error);
    return res.status(500).json({
      message: "Loi server",
      idCode: 2,
    });
  }
};

let generateAccessToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      role: user.role,
    },
    process.env.JWT_ACCESS_KEY,
    {
      // het han trong bao laau
      expiresIn: "60d",
    }
  );
};

let generateRefreshToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      role: user.role,
    },
    process.env.JWT_REFRESH_KEY,
    {
      // het han trong bao laau
      expiresIn: "365d",
    }
  );
};

// LOGIN
export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await USER.findOne({ email });

    if (!user) {
      return res.status(200).json({
        message: "Email hoặc mật khẩu không chính xác",
        idCode: 1,
      });
    }

    if (!user.isActive) {
      return res.status(200).json({
        message:
          "Tài khoản chưa được kích hoạt. Vui lòng kích hoạt trước khi đăng nhập",
        idCode: 3,
      });
    }

    if (!bcrypt.compareSync(password, user.password)) {
      return res.status(200).json({
        message: "Email hoặc mật khẩu không chính xác",
        idCode: 1,
      });
    }

    let accessToken = generateAccessToken(user);
    let refreshToken = generateRefreshToken(user);
    refreshTokens.push(refreshToken);
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      path: "/",
      sameSite: "strict",
    });

    // loai bo password
    const { password: _, ...other } = user._doc;
    return res.status(200).json({
      message: "OK",
      idCode: 0,
      user: other,
      accessToken,
    });
  } catch (error) {
    console.log("Error", error);
    return res.status(500).json({
      message: "Lỗi server",
      idCode: 2,
    });
  }
};
//  KICH HOAT TAI KHOAN
export const activateAccount = async (req, res) => {
  try {
    const user = await USER.findOne({
      _id: req.params.id,
      codeId: req.body.codeId,
    });
    if (user) {
      const checkDay = dayjs().isBefore(user.codeExpired);
      if (checkDay) {
        await USER.findByIdAndUpdate(
          { _id: req.params.id },
          {
            isActive: true,
          }
        );
        return res.status(200).json({
          message: "Kich hoat thanh cong ",
          idCode: 0,
        });
      } else {
        return res.status(400).json({
          message: "Mã code cua nguoi dung không hợp lệ hoặc đã hết hạn ",
          idCode: 1,
        });
      }
    }
  } catch (error) {
    console.log("Error", error);
    return res.status(500).json({
      message: "Loi server",
      idCode: 2,
    });
  }
};

// Resend
export const reSendKey = async (req, res) => {
  try {
    const checkUser = await USER.findOne({ _id: req.params.id });
    if (checkUser) {
      const codeId = uuidv4();
      const user = await USER.findByIdAndUpdate(req.params.id, {
        codeExpired: dayjs().add(5, "minutes"),
        codeId: codeId,
      });
      await sendEmail(user.username, codeId, user.email);
      return res.status(200).json({
        message: "OK",
        idCode: 0,
        user,
      });
    } else {
      return res.status(500).json({
        message: "Tai khoan không hợp lệ ",
        idCode: 1,
      });
    }
  } catch (error) {
    console.log("Error", error);
    return res.status(500).json({
      message: "Loi server",
      idCode: 2,
    });
  }
};

// TAO MA KICH HOAT TAI KHOAN MOI
export const resetKeyActivateAccount = async (req, res) => {
  try {
    const checkEmail = await USER.findOne({ email: req.body.email });
    if (checkEmail) {
      const codeId = uuidv4();
      const user = await USER.findByIdAndUpdate(checkEmail._id, {
        codeExpired: dayjs().add(5, "minutes"),
        codeId: codeId,
      });
      await sendEmail(user.username, codeId, user.email);
      return res.status(200).json({
        message: "OK",
        idCode: 0,
        user,
      });
    } else {
      return res.status(500).json({
        message: "Email không hợp lệ ",
        idCode: 1,
      });
    }
  } catch (error) {
    console.log("Error", error);
    return res.status(500).json({
      message: "Loi server",
      idCode: 2,
    });
  }
};

//REFRESH TOKEN
export let requestRefreshToken = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    return res.status(401).json("Ban chua dang nhap ");
  }
  if (!refreshTokens.includes(refreshToken)) {
    return res.status(403).json("Ma nay khong phai cua tui ");
  }
  jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY, (err, user) => {
    if (err) {
      console.log(err);
    }
    // loai bo cai refresh cu de nhan cai moi
    refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
    const newAccessToken = generateAccessToken(user);
    const newRefreshToken = generateRefreshToken(user);
    // nhan cai moi
    refreshTokens.push(newRefreshToken);
    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: false,
      path: "/",
      sameSite: "strict",
    });
    return res.status(200).json({ accessToken: newAccessToken });
  });
};

// LOGOUT
export let userLogout = async (req, res) => {
  res.clearCookie("refreshToken");
  refreshTokens = refreshTokens.filter(
    (token) => token !== req.cookies.refreshToken
  );
  return res.status(200).json("Logout success! ");
};
