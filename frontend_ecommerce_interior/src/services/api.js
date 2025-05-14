import { instance } from "../Custom/Axios/AxiosCustom";

export const getAllUser = async () => {
  try {
    const user = await instance.get("user");
    return user;
  } catch (error) {
    console.log("Error"), error;
  }
};

// Hàm gọi API đăng ký người dùng
export const apiRegister = async (values) => {
  try {
    const res = await instance.post("auth/register", values); // Gửi yêu cầu đăng ký
    return res.data; // Trả về dữ liệu từ response
  } catch (error) {
    // Xử lý lỗi khi gọi API
    console.error("Lỗi khi gọi API đăng ký: ", error);
  }
};

export const apiLogin = async (values) => {
  try {
    const res = await instance.post("auth/login", values); // Gửi yêu cầu đăng ký
    console.log("check trong login ", res);

    return res.data; // Trả về dữ liệu từ response
  } catch (error) {
    // Xử lý lỗi khi gọi API
    console.error("Lỗi khi gọi API đăng nhập: ", error);
  }
};

// Kích hoạt tài khoản
export const activateAccount = async (id, codeId) => {
  try {
    const res = await instance.post(`activateAccount/${id}`, { codeId });
    return res;
  } catch (error) {
    console.log("Error"), error;
  }
};

// tao ma kich hoat moi o trang kich hoat
export const reSendKey = async (id, codeId) => {
  try {
    const res = await instance.post(`reSendKey/${id}`);
    return res;
  } catch (error) {
    console.log("Error"), error;
  }
};

// tao ma kich hoat moi ở trang login
export const resetKeyActivateAccount = async (email) => {
  try {
    const res = await instance.post(`resetKeyActivateAccount`, { email });
    return res;
  } catch (error) {
    console.log("Error"), error;
  }
};

//  USER

export const getUserById = async (id) => {
  try {
    const res = await instance.get(`/user/${id}`);
    return res;
  } catch (error) {
    console.log("Error"), error;
  }
};

export const updateUser = async (id, infoUpdate) => {
  try {
    const res = await instance.put(`/user/${id}`, infoUpdate);
    return res;
  } catch (error) {
    console.log("Error"), error;
  }
};

// BLOG

export const getAllBlog = async () => {
  try {
    const res = await instance.get(`blog`);
    return res;
  } catch (error) {
    console.log("Error"), error;
  }
};

export const getBlogById = async (id) => {
  try {
    const res = await instance.get(`blog/${id}`);
    return res;
  } catch (error) {
    console.log("Error"), error;
  }
};

// PRODUCT

export const getProductById = async (id) => {
  try {
    const res = await instance.get(`product/${id}`);
    return res;
  } catch (error) {
    console.log("Error"), error;
  }
};

// wishlist

export const getAllWishlist = async (id) => {
  try {
    const res = await instance.get(`wishlist?user_id=${id}`);
    return res;
  } catch (error) {
    console.error("Error in getAllWishlist:", error);
    throw error; // để có thể bắt được lỗi ở useEffect
  }
};
export const addProductToWishlist = async (userId, productId) => {
  try {
    const res = await instance.post(`wishlist`, {
      user_id: userId,
      product_id: productId,
    });

    // Trả về cả status và dữ liệu JSON từ server
    return {
      status: res.status,
      ...res.data,
    };
  } catch (error) {
    console.error("Error:", error); // Sửa log lỗi đúng cú pháp
    return {
      status: error?.response?.status || 500,
      message: error?.response?.data?.message || "Có lỗi xảy ra",
    };
  }
};

export const deleteProductToWishlist = async (userId, productId) => {
  try {
    const res = await instance.delete(`wishlist`, {
      data: {
        user_id: userId,
        product_id: productId,
      },
    });
    return res;
  } catch (error) {
    console.error("Error deleting product from wishlist:", error);
    throw error;
  }
};

// CART

export const getCartByUserId = async (userId) => {
  try {
    const res = await instance.get(`cart?user_id=${userId}`);
    return res;
  } catch (error) {
    console.error("Error in getCartByUserId:", error);
    throw error; // để có thể bắt được lỗi ở useEffect
  }
};

export const deleteCartByUserId = async (id) => {
  try {
    const res = await instance.delete(`cart/${id}`);
    return res;
  } catch (error) {
    console.error("Error in getCartByUserId:", error);
    throw error; // để có thể bắt được lỗi ở useEffect
  }
};

export const updateQuantityCart = async (id, quantity) => {
  try {
    const res = await instance.put(`cart/${id}`, { quantity });
    return res;
  } catch (error) {
    console.error("Error in getCartByUserId:", error);
    throw error; // để có thể bắt được lỗi ở useEffect
  }
};
