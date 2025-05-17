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

// Hàm lấy thời gian theo múi giờ +07
const getTimeInVietnam = () => {
  const now = new Date();
  const offsetVietnam = 7 * 60; // +07:00 in minutes
  const localOffset = now.getTimezoneOffset(); // Offset của múi giờ hiện tại
  const vietnamTime = new Date(
    now.getTime() + (offsetVietnam - localOffset) * 60 * 1000
  );

  return vietnamTime.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

const Chatbot = ({ setOpenMessage }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [avataruser, setAvatar] = useState(user.image);

  const [messages, setMessages] = useState([
    {
      sender: false,
      content: {
        text: "Xin chào! Tôi là trợ lý chatbot. Bạn cần giúp gì hôm nay?",
        products: [],
      },
      time: getTimeInVietnam(),
      avatar:
        "https://i.pinimg.com/736x/c2/86/19/c28619a38709546b8f4b662b64f75760.jpg",
    },
  ]);
  const [input, setInput] = useState("");
  // Hàm xử lý gửi tin nhắn
  const handleSendMessage = async (e) => {
    if (e) e.preventDefault();
    if (!input.trim()) return;

    const currentTime = getTimeInVietnam();

    // Thêm tin nhắn của người dùng
    const userMessage = {
      sender: true,
      content: { text: input, products: [] },
      time: currentTime,
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
        time: currentTime,
        avatar:
          "https://i.pinimg.com/736x/c2/86/19/c28619a38709546b8f4b662b64f75760.jpg",
      },
    ]);
  };

  // Hàm xử lý tin nhắn người dùng
  const processMessage = async (message) => {
    const priceMatch = message.match(/dưới (\d+)/i);
    const genderMatch = message.match(/cho (nam|nữ)/i);
    const categoryMatch = message.match(/loại (\w+)/i); // Ví dụ: "loại áo"

    let queryParams = "";
    if (priceMatch) {
      const maxPrice = Number(priceMatch[1]);
      queryParams += `maxPrice=${maxPrice}`;
    }
    if (genderMatch) {
      const gender = genderMatch[1] === "nam" ? "Nam" : "Nữ";
      queryParams += `${queryParams ? "&" : ""}gender=${gender}`;
    }
    if (categoryMatch) {
      const category = categoryMatch[1];
      queryParams += `${queryParams ? "&" : ""}mainCategory=${category}`;
    }

    if (queryParams) {
      try {
        const response = await getAllProductChatbot(queryParams);
        const { products, total } = response;

        if (products.length === 0) {
          return { text: "Không tìm thấy sản phẩm nào phù hợp.", products: [] };
        }

        let text = "Dưới đây là các sản phẩm phù hợp:\n";
        return { text, products };
      } catch (error) {
        return {
          text: "Có lỗi xảy ra khi tìm kiếm sản phẩm. Vui lòng thử lại!",
          products: [],
        };
      }
    }

    return {
      text: "Xin lỗi, tôi chưa hiểu yêu cầu của bạn. Bạn có thể nói rõ hơn không? Ví dụ: 'Tôi muốn tìm sản phẩm dưới 500 cho nam'",
      products: [],
    };
  };

  // Xử lý 'xem thêm'
  const handleSeeMore = async () => {
    const currentPage =
      messages.filter(
        (m) => m.sender === false && m.content.text.includes("xem thêm")
      ).length + 1;
    const lastBotMessage = messages.filter((m) => m.sender === false).pop();
    const priceMatch = lastBotMessage?.content.text.match(/dưới (\d+)/i);
    const genderMatch = lastBotMessage?.content.text.match(/cho (nam|nữ)/i);
    const categoryMatch = lastBotMessage?.content.text.match(/loại (\w+)/i);

    let queryParams = "";
    if (priceMatch) queryParams += `maxPrice=${priceMatch[1]}`;
    if (genderMatch)
      queryParams += `${queryParams ? "&" : ""}gender=${
        genderMatch[1] === "nam" ? "Nam" : "Nữ"
      }`;
    if (categoryMatch)
      queryParams += `${queryParams ? "&" : ""}mainCategory=${
        categoryMatch[1]
      }`;

    if (queryParams) {
      try {
        const response = await getAllProductChatbotSeeMore(
          queryParams,
          currentPage
        );
        const { products, total } = response;

        if (products.length === 0) {
          return { text: "Không còn sản phẩm nào để hiển thị.", products: [] };
        }

        let text = "Các sản phẩm tiếp theo:\n";
        if (total > currentPage * 5)
          text += "\nNhập 'xem thêm' để thấy thêm sản phẩm.";
        return { text, products };
      } catch (error) {
        return { text: "Có lỗi xảy ra. Vui lòng thử lại!", products: [] };
      }
    }
    return { text: "Không thể xử lý yêu cầu 'xem thêm'.", products: [] };
  };

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
            <span className="bg-gray-200 px-2 py-1 rounded">Today, May 17</span>
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
                <p>{msg.content.text}</p>
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
                  {msg.time}
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
          className="h-[40px] flex justify-between items-center"
        >
          <div className="w-full h-full flex items-center justify-center relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message"
              className="w-[98%] px-3 h-full rounded"
            />
            <div className="absolute right-2 flex items-center h-full px-2 gap-2 text-lg">
              <div className="cursor-pointer">
                <MdOutlineInsertPhoto />
              </div>
              <div className="cursor-pointer">
                <FaRegFaceSmile />
              </div>
            </div>
          </div>
          <div
            className="w-[10%] h-full bg-green-500 flex justify-center items-center text-white text-xl rounded cursor-pointer"
            onClick={handleSendMessage}
          >
            <IoIosSend />
          </div>
        </form>
      </div>
    </>
  );
};

export default Chatbot;
