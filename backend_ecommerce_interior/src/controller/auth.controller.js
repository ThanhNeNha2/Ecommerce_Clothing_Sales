import dayjs from "dayjs";
import USER from "../models/User.model";
import * as bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import { sendEmail } from "../service/nodeMailer";

//  REGISTER
export const Register = async (req, res) => {
  try {
    const { password } = req.body;
    console.log("check dau vao cua email ", req.body.email);
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
      message: "Tạo tài khoản không thành công ",
      idCode: 1,
    });
  }
};

// LOGIN
export const Login = async (req, res) => {
  try {
    const { password } = req.body;
    console.log("check dau vao cua email ", req.body.email);
    const checkEmail = await USER.findOne({ email: req.body.email });
    if (checkEmail) {
      return res.status(500).json({
        message: "Email đã tồn tại ",
        idCode: 1,
      });
    }
    const hashPassword = bcrypt.hashSync(password, 10);
    const user = await USER.create({ ...req.body, password: hashPassword });
    return res.status(200).json({
      message: "OK",
      idCode: 0,
      user,
    });
  } catch (error) {
    console.log("Error", error);
    return res.status(500).json({
      message: "Tạo tài khoản không thành công ",
      idCode: 1,
    });
  }
};

export const sendEmailToUser = (req, res) => {
  sendEmail();
  return res.send("hahaa");
};
