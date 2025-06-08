import React, { useState } from "react";
import { SlOptions } from "react-icons/sl";
import { TbPointFilled } from "react-icons/tb";
import { IoIosSend } from "react-icons/io";
import { FaRegFaceSmile, FaXmark } from "react-icons/fa6";
import { MdOutlineInsertPhoto } from "react-icons/md";
import {
  getAllProductChatbot,
  getAllProductChatbotSeeMore,
} from "../../services/api";

const getTimeInVietnam = () => {
  const now = new Date();

  // Tạo đối tượng Date ở UTC, rồi chuyển sang giờ Việt Nam
  const vietnamTime = new Date(
    now.toLocaleString("en-US", { timeZone: "Asia/Ho_Chi_Minh" })
  );

  // Định dạng ngày kiểu Việt Nam
  const day = vietnamTime.getDate().toString().padStart(2, "0");
  const month = (vietnamTime.getMonth() + 1).toString().padStart(2, "0");
  const year = vietnamTime.getFullYear();
  const dateStr = `Hôm nay, ${day}/${month}/${year}`;

  // Định dạng giờ 24h
  const timeStr = vietnamTime.toLocaleTimeString("vi-VN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  return { date: dateStr, time: timeStr };
};
const Chatbot = ({ setOpenMessage }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [avataruser, setAvatar] = useState(user.image);

  const [messages, setMessages] = useState([
    {
      sender: false,
      content: {
        text: "Xin chào! Tôi là trợ lý chatbot. Bạn cần giúp gì hôm nay ?",
        products: [],
      },
      time: getTimeInVietnam().time, // Sử dụng giờ mới
      avatar:
        "https://i.pinimg.com/736x/c2/86/19/c28619a38709546b8f4b662b64f75760.jpg",
    },
  ]);
  const [input, setInput] = useState("");

  // Hàm phân tích câu hỏi và trích xuất từ khóa
  const extractKeysFromMessage = (message) => {
    const keys = {};
    const lowerMessage = message.toLowerCase().trim();

    // Tìm giá
    const priceMatch = lowerMessage.match(/(\d+)/g);
    if (priceMatch) {
      if (lowerMessage.includes("dưới") || lowerMessage.includes("nhỏ hơn")) {
        keys.maxPrice = Number(priceMatch[0]);
      } else if (
        lowerMessage.includes("trên") ||
        lowerMessage.includes("lớn hơn")
      ) {
        keys.minPrice = Number(priceMatch[0]);
      } else if (lowerMessage.includes("từ") && lowerMessage.includes("đến")) {
        keys.minPrice = Number(priceMatch[0]);
        if (priceMatch[1]) keys.maxPrice = Number(priceMatch[1]);
      }
    }

    // Tìm giới tính
    if (lowerMessage.includes("nam")) keys.gender = "Men";
    if (lowerMessage.includes("nữ")) keys.gender = "Women";
    if (lowerMessage.includes("trẻ em") || lowerMessage.includes("trẻ"))
      keys.gender = "Kids";

    // Tìm loại sản phẩm
    if (lowerMessage.includes("áo thun")) keys.subCategory = "T-Shirt";
    if (lowerMessage.includes("quần jeans")) keys.subCategory = "Jeans";
    if (lowerMessage.includes("áo")) keys.mainCategory = "Topwear";
    if (lowerMessage.includes("quần")) keys.mainCategory = "Bottomwear";

    // Nhận diện câu hỏi chung
    if (lowerMessage.includes("mở cửa") || lowerMessage.includes("giờ mở")) {
      keys.questionType = "openHours";
    } else if (
      lowerMessage.includes("giao hàng") ||
      lowerMessage.includes("ship")
    ) {
      keys.questionType = "shipping";
    } else if (
      lowerMessage.includes("trả hàng") ||
      lowerMessage.includes("đổi")
    ) {
      keys.questionType = "returnPolicy";
    } else if (
      lowerMessage.includes("địa chỉ") ||
      lowerMessage.includes("ở đâu")
    ) {
      keys.questionType = "address";
    }

    console.log("Extracted keys:", keys);
    return keys;
  };
  // Hàm xử lý gửi tin nhắn
  const handleSendMessage = async (e) => {
    if (e) e.preventDefault();
    if (!input.trim()) return;

    const { time } = getTimeInVietnam(); // Lấy giờ mới

    // Thêm tin nhắn của người dùng
    const userMessage = {
      sender: true,
      content: { text: input, products: [] },
      time: time,
      avatar: avataruser,
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    // Xử lý tin nhắn và trả lời
    let response;
    if (input.toLowerCase() === "xem thêm") {
      response = await handleSeeMore();
    } else {
      response = await processMessage(input);
    }
    setMessages((prev) => [
      ...prev,
      {
        sender: false,
        content: response,
        time: time,
        avatar:
          "https://i.pinimg.com/736x/c2/86/19/c28619a38709546b8f4b662b64f75760.jpg",
      },
    ]);
  };

  // Hàm gọi Gemini API
  const callGeminiAPI = async (message) => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `Bạn là một trợ lý chatbot thân thiện. Hãy trả lời câu hỏi của người dùng một cách tự nhiên và hữu ích bằng tiếng Việt. Câu hỏi: "${message}"`,
                },
              ],
            },
          ],
        }),
      });

      if (!response.ok) {
        throw new Error("Lỗi khi gọi Gemini API");
      }

      const data = await response.json();
      const geminiResponse =
        data.candidates?.[0]?.content?.parts?.[0]?.text ||
        "Không thể tạo phản hồi từ Gemini.";
      return geminiResponse;
    } catch (error) {
      console.error("Lỗi Gemini API:", error);
      return "Có lỗi xảy ra khi xử lý yêu cầu. Vui lòng thử lại!";
    }
  };

  // Hàm xử lý tin nhắn người dùng
  const processMessage = async (message) => {
    const keys = extractKeysFromMessage(message);
    console.log("Extracted keys:", keys);
    let queryParams = "";
    if (keys.maxPrice) {
      queryParams += `maxPrice=${keys.maxPrice}`;
    }
    if (keys.minPrice) {
      queryParams += `${queryParams ? "&" : ""}minPrice=${keys.minPrice}`;
    }
    if (keys.gender) {
      queryParams += `${queryParams ? "&" : ""}gender=${keys.gender}`;
    }
    if (keys.mainCategory) {
      queryParams += `${queryParams ? "&" : ""}mainCategory=${
        keys.mainCategory
      }`;
    }
    if (keys.subCategory) {
      queryParams += `${queryParams ? "&" : ""}subCategory=${keys.subCategory}`;
    }

    if (queryParams) {
      try {
        const response = await getAllProductChatbot(queryParams);
        console.log("API response:", response);
        const { products, total } = response;

        if (products.length === 0) {
          const geminiResponse = await callGeminiAPI(
            `Không tìm thấy sản phẩm nào phù hợp với yêu cầu: "${message}". Hãy gợi ý hoặc trả lời thân thiện bằng tiếng Việt.`
          );
          return { text: geminiResponse, products: [] };
        }

        let text = "Dưới đây là các sản phẩm phù hợp:\n";
        if (total > 5) text += "\nNhập 'xem thêm' để thấy thêm sản phẩm.";
        return { text, products };
      } catch (error) {
        console.error("API error:", error);
        const geminiResponse = await callGeminiAPI(
          `Có lỗi khi tìm kiếm sản phẩm cho yêu cầu: "${message}". Hãy trả lời thân thiện và gợi ý cách khác bằng tiếng Việt.`
        );
        return { text: geminiResponse, products: [] };
      }
    }

    // Xử lý câu hỏi chung dựa trên questionType
    if (keys.questionType) {
      let prompt = "";
      if (keys.questionType === "openHours") {
        prompt = `Bạn là trợ lý chatbot của một cửa hàng. Hãy trả lời câu hỏi "${message}" bằng tiếng Việt một cách thân thiện và ngắn gọn. Giả sử cửa hàng mở cửa từ 8:00 sáng đến 9:00 tối mỗi ngày. Đừng thêm thông tin không cần thiết.`;
      } else if (keys.questionType === "shipping") {
        prompt = `Bạn là trợ lý chatbot của một cửa hàng. Hãy trả lời câu hỏi "${message}" bằng tiếng Việt một cách thân thiện và ngắn gọn. Giả sử giao hàng miễn phí cho đơn hàng trên 500.000 VNĐ và giao trong 2-3 ngày. Đừng thêm thông tin không cần thiết.`;
      } else if (keys.questionType === "returnPolicy") {
        prompt = `Bạn là trợ lý chatbot của một cửa hàng. Hãy trả lời câu hỏi "${message}" bằng tiếng Việt một cách thân thiện và ngắn gọn. Giả sử cửa hàng chấp nhận đổi trả trong 7 ngày nếu sản phẩm còn nguyên vẹn. Đừng thêm thông tin không cần thiết.`;
      } else if (keys.questionType === "address") {
        prompt = `Bạn là trợ lý chatbot của một cửa hàng. Hãy trả lời câu hỏi "${message}" bằng tiếng Việt một cách thân thiện và ngắn gọn. Cửa hàng của tôi có địa chỉ tại H33/07 k502 đường tháng 9, Hòa Cường Nam, Đà Nẵng. Đừng thêm thông tin không cần thiết.`;
      }
      const geminiResponse = await callGeminiAPI(prompt);
      return { text: geminiResponse, products: [] };
    }

    const geminiResponse = await callGeminiAPI(message);
    return { text: geminiResponse, products: [] };
  };

  // Xử lý 'xem thêm'
  const handleSeeMore = async () => {
    const currentPage =
      messages.filter(
        (m) => m.sender === false && m.content.text.includes("xem thêm")
      ).length + 1;
    const lastBotMessage = messages.filter((m) => m.sender === false).pop();
    const keys = extractKeysFromMessage(lastBotMessage?.content.text || "");

    let queryParams = "";
    if (keys.maxPrice) queryParams += `maxPrice=${keys.maxPrice}`;
    if (keys.minPrice)
      queryParams += `${queryParams ? "&" : ""}minPrice=${keys.minPrice}`;
    if (keys.gender)
      queryParams += `${queryParams ? "&" : ""}gender=${keys.gender}`;
    if (keys.mainCategory)
      queryParams += `${queryParams ? "&" : ""}mainCategory=${
        keys.mainCategory
      }`;
    if (keys.subCategory)
      queryParams += `${queryParams ? "&" : ""}subCategory=${keys.subCategory}`;

    if (queryParams) {
      try {
        const response = await getAllProductChatbotSeeMore(
          queryParams,
          currentPage
        );
        const { products, total } = response;

        if (products.length === 0) {
          const geminiResponse = await callGeminiAPI(
            "Không còn sản phẩm nào để hiển thị. Hãy gợi ý hoặc trả lời thân thiện bằng tiếng Việt."
          );
          return { text: geminiResponse, products: [] };
        }

        let text = "Các sản phẩm tiếp theo:\n";
        if (total > currentPage * 5)
          text += "\nNhập 'xem thêm' để thấy thêm sản phẩm.";
        return { text, products };
      } catch (error) {
        const geminiResponse = await callGeminiAPI(
          "Có lỗi khi tải thêm sản phẩm. Hãy trả lời thân thiện và gợi ý cách khác bằng tiếng Việt."
        );
        return { text: geminiResponse, products: [] };
      }
    }

    const geminiResponse = await callGeminiAPI(
      "Không thể xử lý yêu cầu 'xem thêm'. Hãy trả lời thân thiện bằng tiếng Việt."
    );
    return { text: geminiResponse, products: [] };
  };
  // Lấy ngày để hiển thị
  const { date } = getTimeInVietnam();

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-40"></div>
      <div className="h-[calc(100vh)] w-[500px] bg-gray-300 px-3 pt-2 pb-3 z-50 fixed top-0 bottom-0 right-0 flex flex-col justify-between">
        {/* THÔNG TIN */}
        <div className="h-[55px] flex items-center justify-between">
          <div className="flex gap-3">
            <div className="w-[50px] h-[50px] bg-yellow-400 rounded-full">
              <img
                src="https://i.pinimg.com/736x/c2/86/19/c28619a38709546b8f4b662b64f75760.jpg"
                className="w-full h-full object-cover object-top rounded-full"
                alt=""
              />
            </div>
            <div className="flex flex-col justify-end items-center">
              <span className="font-semibold font-poppins">Trợ lý CHATBOT</span>
              <div className="flex items-center">
                <div className="text-xl text-green-500">
                  <TbPointFilled />
                </div>
                <span> Đang hoạt động</span>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <div className="w-[35px] h-[35px] flex justify-center items-center text-lg rounded-full hover:opacity-[0.8] cursor-pointer relative border border-gray-700 text-gray-500">
              <SlOptions />
            </div>
            <div
              className="w-[35px] h-[35px] flex justify-center items-center text-lg rounded-full hover:opacity-[0.8] cursor-pointer relative border border-gray-700 text-gray-500"
              onClick={() => setOpenMessage(false)}
            >
              <FaXmark />
            </div>
          </div>
        </div>
        {/* ĐOẠN CHAT */}
        <div className="flex-1 bg-white rounded p-4 shadow-md overflow-y-auto h-[calc(100vh-100px)] my-2">
          <div className="flex justify-center items-center my-4">
            <span className="bg-gray-200 px-2 py-1 rounded">{date}</span>{" "}
            {/* Hiển thị ngày mới */}
          </div>
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${
                msg.sender ? "justify-end" : "justify-start"
              } my-2`}
            >
              {!msg.sender && (
                <img
                  src={msg.avatar}
                  alt="avatar"
                  className="w-8 h-8 rounded-full mr-2 object-cover"
                />
              )}
              <div
                className={`max-w-xs px-4 py-2 rounded-lg ${
                  msg.sender
                    ? "bg-green-500 text-white"
                    : "bg-gray-200 text-black"
                }`}
              >
                <p>{msg.content.text} </p>
                {msg.content.products.length > 0 && (
                  <div className="mt-2 space-y-2">
                    {msg.content.products.map((product, pIndex) => (
                      <div
                        key={pIndex}
                        className="p-2 border border-gray-300 rounded-md bg-white shadow-sm flex items-center space-x-3"
                      >
                        {product.image && (
                          <img
                            src={product.image[0]}
                            alt={product.name}
                            className="w-12 h-12 object-cover rounded"
                          />
                        )}
                        <div>
                          <p className="font-semibold">{product.name}</p>
                          <p className="text-sm text-gray-600">
                            Giá: {product.price} VNĐ
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                <span className="text-xs text-gray-500 mt-1 block text-right">
                  {msg.time} {/* Hiển thị giờ mới */}
                </span>
              </div>
              {msg.sender && (
                <img
                  src={msg.avatar}
                  alt="avatar"
                  className="w-8 h-8 rounded-full ml-2 object-cover"
                />
              )}
            </div>
          ))}
        </div>
        {/* PHẦN NỘI DUNG GỬI */}
        <form
          onSubmit={handleSendMessage}
          className="min-h-[50px] max-h-[120px] flex justify-between items-end gap-2 p-2"
        >
          <div className="w-full flex items-end justify-center relative">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message"
              className="w-full px-3 py-2 pr-20 min-h-[46px] max-h-[100px] rounded-lg border border-gray-300 resize-none overflow-y-auto leading-5"
              rows={1}
              onInput={(e) => {
                // Auto-resize textarea
                e.target.style.height = "auto";
                e.target.style.height =
                  Math.min(e.target.scrollHeight, 100) + "px";
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage(e);
                }
              }}
            />
            <div className="absolute right-3 bottom-2 flex items-center gap-2 text-lg text-gray-500">
              <div className="cursor-pointer hover:text-gray-700 transition-colors">
                <MdOutlineInsertPhoto />
              </div>
              <div className="cursor-pointer hover:text-gray-700 transition-colors">
                <FaRegFaceSmile />
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="min-w-[50px] h-[46px] bg-green-500 hover:bg-green-600 flex justify-center items-center text-white text-xl rounded-lg cursor-pointer transition-colors flex-shrink-0"
            onClick={handleSendMessage}
          >
            <IoIosSend />
          </button>
        </form>
      </div>
    </>
  );
};

export default Chatbot;
