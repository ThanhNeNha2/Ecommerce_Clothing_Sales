import CHAT from "../models/Chat.model";

export const getAllChat = async (req, res) => {
  try {
    return res.status(200).json({
      message: "OK",
      idCode: 0,
    });
  } catch (error) {
    console.log("Error", error);

    return res.status(500).json({
      message: "Truy cap danh sach Chat khong thanh cong",
      idCode: 1,
    });
  }
};

export const getChatById = async (req, res) => {
  try {
    return res.status(200).json({
      message: "OK",
      idCode: 0,
    });
  } catch (error) {
    console.log("Error", error);

    return res.status(500).json({
      message: "Truy cap danh sach Chat khong thanh cong",
      idCode: 1,
    });
  }
};
export const createChat = async (req, res) => {
  try {
    return res.status(200).json({
      message: "OK",
      idCode: 0,
    });
  } catch (error) {
    console.log("Error", error);

    return res.status(500).json({
      message: "Truy cap danh sach Chat khong thanh cong",
      idCode: 1,
    });
  }
};
export const readChat = async (req, res) => {
  try {
    return res.status(200).json({
      message: "OK",
      idCode: 0,
    });
  } catch (error) {
    console.log("Error", error);

    return res.status(500).json({
      message: "Truy cap danh sach Chat khong thanh cong",
      idCode: 1,
    });
  }
};
