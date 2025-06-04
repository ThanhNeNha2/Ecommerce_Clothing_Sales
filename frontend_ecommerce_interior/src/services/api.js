import { instance } from "../Custom/Axios/AxiosCustom";
const user = JSON.parse(localStorage.getItem("user"));

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

// WISHLIST

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

export const addProductToCart = async (userId, productId, size_id) => {
  try {
    const res = await instance.post(`cart`, {
      user_id: userId,
      product_id: productId,
      size_id: size_id,
    });
    return res;
  } catch (error) {
    console.error("Error in addProductToCart:", error);
    throw error; // để có thể bắt được lỗi ở useEffect
  }
};

// PROMOTION
export const getPromotionByCode = async (code) => {
  try {
    const res = await instance.get(
      `promotionsSearch?code=${encodeURIComponent(code)}`
    );
    return {
      status: res.status,
      ...res.data,
    };
  } catch (error) {
    if (error.response) {
      // Lỗi từ server trả về: vẫn trả về dữ liệu để xử lý
      return {
        status: error.response.status,
        ...error.response.data,
      };
    }
    // Lỗi không có response (network, server die,...)
    console.error("Lỗi không có response:", error);
    return {
      status: 500,
      message: "Lỗi không xác định",
      idCode: 99,
    };
  }
};

export const getAllPromotion = async () => {
  try {
    const response = await instance.get(`promotions`);
    return response.data;
  } catch (error) {
    console.error("Error in getAllProductChatbotSeeMore:", error);
    throw error; // để có thể bắt được lỗi ở useEffect
  }
};

//  REVIEW

export const getAllReview = async (productId) => {
  try {
    const res = await instance.get(`reviews/product/${productId}`);
    return res;
  } catch (error) {
    console.error("Error in getAllReview:", error);
    throw error; // để có thể bắt được lỗi ở useEffect
  }
};

export const getReviewById = async (productId, user_id) => {
  try {
    const res = await instance.post(`reviews/${productId}`, { user_id });
    return res;
  } catch (error) {
    console.error("Error in getReviewById:", error);
    throw error;
  }
};

export const addReview = async (userId, productId, comment, rating) => {
  try {
    const res = await instance.post(`reviews`, {
      user_id: userId,
      product_id: productId,
      rating,
      comment,
    });
    return {
      status: res.status,
      ...res.data,
    };
  } catch (error) {
    return {
      status: error.response.status,
      ...error.response.data,
    };
  }
};

export const updateReview = async (idReview, user_id, rating, comment) => {
  try {
    const res = await instance.put(`reviews/${idReview}`, {
      user_id: user_id,
      rating,
      comment,
    });
    return res;
  } catch (error) {
    console.error("Error in addReview:", error);
    throw error; // để có thể bắt được lỗi ở useEffect
  }
};

export const deleteReview = async (idReview, user_id) => {
  try {
    const res = await instance.delete(`reviews/${idReview}`, {
      data: { user_id },
    });
    return res;
  } catch (error) {
    console.error("Error in deleteReview:", error);
    throw error; // để có thể bắt được lỗi ở useEffect
  }
};

// ORDER

export const getAllOder = async () => {
  try {
    const response = await instance.get(`orders?user_id=${user._id}`);
    return response.data;
  } catch (error) {
    console.error("Error in getAllProductChatbotSeeMore:", error);
    throw error;
  }
};

export const createOrder = async (info) => {
  try {
    const response = await instance.post(`orders`, {
      user_id: user._id,
      ...info,
    });
    return response.data;
  } catch (error) {
    console.error("Error in getAllProductChatbotSeeMore:", error);
    throw error;
  }
};

export const cancelOrder = async (id) => {
  try {
    const response = await instance.post(`orders/${id}/cancel`);
    return response.data;
  } catch (error) {
    console.error("Error in getAllProductChatbotSeeMore:", error);
    throw error;
  }
};

export const completeOrderByPaymentIntent = async (payment_intent) => {
  try {
    const response = await instance.put(`orders`, { payment_intent });
    return response.data;
  } catch (error) {
    console.error("Error in getAllProductChatbotSeeMore:", error);
    throw error;
  }
};

// PAYMENT

export const createCodePayment = async ({ payment_intent, price }) => {
  try {
    const response = await instance.post(`payments`, {
      payment_intent,
      price,
    });
    return response.data;
  } catch (error) {
    console.error("Error in getAllProductChatbotSeeMore:", error);
    throw error;
  }
};

export const getPaymentByIntent = async (payment_intent) => {
  try {
    // const response = await instance.get(`payment/pi_3RSjiz1QGnpllpL60E94Eqfp`);
    const response = await instance.get(`payment/${payment_intent}`);

    return response.data;
  } catch (error) {
    console.error("Error in getAllProductChatbotSeeMore:", error);
    throw error;
  }
};

// chat

export const getAllProductChatbot = async (queryParams) => {
  try {
    const response = await instance.get(
      `product/chatbot?${queryParams}&page=1&limit=5`
    );
    return response.data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

export const getAllProductChatbotSeeMore = async (queryParams, currentPage) => {
  try {
    const response = await instance.get(
      `product/chatbot?${queryParams}&page=${currentPage}&limit=5`
    );
    return response.data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

// thanh toán zalopay

export const paymentZaloPay = async (price, idOrder) => {
  try {
    const response = await instance.post(`paymentZaloPay`, { price, idOrder });
    return response.data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};
