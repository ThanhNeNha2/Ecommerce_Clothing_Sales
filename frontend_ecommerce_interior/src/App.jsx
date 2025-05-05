import { FiMessageSquare } from "react-icons/fi";
import RouterCustom from "./Custom/Router/RouterCustom";
import { FaCaretUp } from "react-icons/fa";
import { SlOptions } from "react-icons/sl";
import { TbPointFilled } from "react-icons/tb";
import { IoIosSend } from "react-icons/io";
import { FaRegFaceSmile, FaXmark } from "react-icons/fa6";
import { MdOutlineInsertPhoto } from "react-icons/md";
import { useState } from "react";
const messages = [
  {
    isSender: false,
    message: "Hi everyone, how are you all?",
    time: "12:10 PM",
    avatar:
      "https://i.pinimg.com/736x/e1/1a/c0/e11ac0f5655e23c127b0781d5cd0fc87.jpg",
  },
  {
    isSender: false,
    message: "I want updates on the Domenic project",
    time: "12:11 PM",
    avatar:
      "https://i.pinimg.com/736x/e1/1a/c0/e11ac0f5655e23c127b0781d5cd0fc87.jpg",
  },
  {
    isSender: true,
    message: "Hi Jane, how are you?",
    time: "12:15 PM",
    avatar:
      "https://i.pinimg.com/736x/24/70/74/247074463acd76f02ac03a91868bb798.jpg",
  },
  {
    isSender: true,
    message: "Dominique project is in progress",
    time: "12:16 PM",
    avatar:
      "https://i.pinimg.com/736x/24/70/74/247074463acd76f02ac03a91868bb798.jpg",
  },
  {
    isSender: false,
    message: "Yes I am fine",
    time: "12:18 PM",
    avatar:
      "https://i.pinimg.com/736x/e1/1a/c0/e11ac0f5655e23c127b0781d5cd0fc87.jpg",
  },
  {
    isSender: false,
    message: "Thanks for the update on the project",
    time: "12:18 PM",
    avatar:
      "https://i.pinimg.com/736x/e1/1a/c0/e11ac0f5655e23c127b0781d5cd0fc87.jpg",
  },
  {
    isSender: true,
    message: "Welcome",
    time: "12:20 PM",
    avatar:
      "https://i.pinimg.com/736x/24/70/74/247074463acd76f02ac03a91868bb798.jpg",
  },
];
function App() {
  const handleClickUp = () => {
    window.scrollTo(0, 0);
  };
  const [openMessage, setOpenMessage] = useState(false);

  return (
    <div className="relative">
      <RouterCustom />
      <div className="  bottom-16 right-16 flex flex-col gap-3  fixed ">
        <div
          className="w-[45px] h-[45px] flex justify-center items-center 
        text-2xl rounded-full hover:opacity-[0.8] cursor-pointer"
          style={{ background: " rgb(250, 240, 234)" }}
          onClick={() => handleClickUp()}
        >
          <FaCaretUp />
        </div>
        <div
          className="w-[45px] h-[45px] flex justify-center items-center
         text-lg rounded-full hover:opacity-[0.8] cursor-pointer relative"
          style={{ background: " rgb(250, 240, 234)" }}
          onClick={() => setOpenMessage(true)}
        >
          <div className=" absolute top-[-5px] right-[-5px] bg-red-400 text-sm w-[20px] h-[20px] flex justify-center items-center  rounded-full ">
            <span>1</span>
          </div>
          <FiMessageSquare />
        </div>
      </div>
      {openMessage && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40"></div>
          <div className="h-[calc(100vh)] w-[500px] bg-gray-300 px-3 pt-2 pb-3 z-50 fixed top-0 bottom-0 right-0 flex flex-col justify-between">
            {/* THÔNG TIN  */}
            <div className="h-[55px]   flex items-center justify-between  ">
              <div className="flex gap-3">
                <div className="w-[50px] h-[50px] bg-yellow-400 rounded-full">
                  <img
                    src="https://i.pinimg.com/736x/e1/1a/c0/e11ac0f5655e23c127b0781d5cd0fc87.jpg"
                    className="w-full h-full object-cover object-top rounded-full"
                    alt=""
                  />
                </div>
                <div className="flex flex-col justify-end items-center">
                  <span className="font-semibold font-poppins">
                    Võ Chí Thanh
                  </span>
                  <div className="flex items-center">
                    <div className="text-xl text-green-500">
                      <TbPointFilled />
                    </div>
                    <span> Đang hoạt động</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <div
                  className="w-[35px] h-[35px] flex justify-center items-center
       text-lg rounded-full hover:opacity-[0.8] cursor-pointer relative border border-gray-700 text-gray-500"
                >
                  <SlOptions />
                </div>
                <div
                  className="w-[35px] h-[35px] flex justify-center items-center
       text-lg rounded-full hover:opacity-[0.8] cursor-pointer relative border border-gray-700 text-gray-500"
                  onClick={() => setOpenMessage(false)}
                >
                  <FaXmark />
                </div>
              </div>
            </div>
            {/* ĐOẠN CHAT  */}
            <div className="flex-1 bg-white rounded p-4 shadow-md overflow-y-auto h-[calc(100vh-100px)] my-2">
              <div className="flex justify-center items-center my-4">
                <span className="bg-gray-200 px-2 py-1 rounded">
                  Today, Jan 24
                </span>
              </div>
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${
                    msg.isSender ? "justify-end" : "justify-start"
                  } my-2`}
                >
                  {!msg.isSender && (
                    <img
                      src={msg.avatar}
                      alt="avatar"
                      className="w-8 h-8 rounded-full mr-2 object-cover"
                    />
                  )}
                  <div
                    className={`max-w-xs px-4 py-2 rounded-lg ${
                      msg.isSender
                        ? "bg-green-500 text-white"
                        : "bg-gray-200 text-black"
                    }`}
                  >
                    <p>{msg.message}</p>
                    <span className="text-xs text-gray-500 mt-1 block text-right">
                      {msg.time}
                    </span>
                  </div>
                  {msg.isSender && (
                    <img
                      src={msg.avatar}
                      alt="avatar"
                      className="w-8 h-8 rounded-full ml-2 object-cover "
                    />
                  )}
                </div>
              ))}
            </div>
            {/* PHẦN NỘI DUNG GỬI  */}
            <div className="h-[40px] flex justify-between items-center">
              <div className="w-full h-full flex items-center justify-center relative">
                <input
                  type="text"
                  placeholder="Type a message"
                  className="w-[98%] px-3 h-full rounded"
                />
                <div className="absolute right-2 flex items-center h-full px-2 gap-2 text-lg ">
                  <div className="cursor-pointer">
                    <MdOutlineInsertPhoto />
                  </div>
                  <div className="cursor-pointer">
                    <FaRegFaceSmile />
                  </div>
                </div>
              </div>
              <div className="w-[10%] h-full bg-green-500 flex justify-center items-center text-white text-xl rounded cursor-pointer">
                <IoIosSend />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
