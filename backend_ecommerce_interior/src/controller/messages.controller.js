import MESSAGE from "../models/Message.model";

export const createMessage = async (req, res) => {
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
