import dayjs from "dayjs";
import USER from "../models/User.model";
import * as bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import { sendEmail } from "../service/nodeMailer";

//  REGISTER
export const Register = async (req, res) => {
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

// LOGIN
export const Login = async (req, res) => {
  try {
    const { password } = req.body;

    const checkEmail = await USER.findOne({ email: req.body.email });
    if (checkEmail) {
      const checkPassword = bcrypt.compareSync(password, checkEmail.password);
      if (checkPassword) {
        return res.status(200).json({
          message: "OK",
          idCode: 0,
        });
      } else {
        return res.status(500).json({
          message: "Email hoặc mật khẩu không chính xác",
          idCode: 1,
        });
      }
    } else {
      return res.status(500).json({
        message: "Email hoặc mật khẩu không chính xác",
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
          message: "Mã code cua nguoi dung không hợp lệ hoặc đã hết hạn   ",
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
