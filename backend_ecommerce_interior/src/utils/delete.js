import axios from "axios";

const deleteImage = async (public_id) => {
  try {
    const url = `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/image/destroy`;

    const data = new URLSearchParams();
    data.append("public_id", public_id);
    data.append("invalidate", "true"); // Xóa cache ngay lập tức

    const authToken = Buffer.from(
      `${process.env.CLOUDINARY_API_KEY}:${process.env.CLOUDINARY_API_SECRET}`
    ).toString("base64"); // Dùng Buffer cho Node.js

    const res = await axios.post(url, data.toString(), {
      headers: {
        Authorization: `Basic ${authToken}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    console.log("✅ Delete response:", res.data);
    return res.data;
  } catch (err) {
    console.error(
      "❌ Error deleting image:",
      err.response?.data || err.message
    );
    return { result: "error", error: err.response?.data || err.message };
  }
};

export default deleteImage;
