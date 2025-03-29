import React, { useEffect, useState } from "react";
import "./Messages.scss";
import { LuPencilLine } from "react-icons/lu";
import { IoSearchSharp, IoVideocamOutline } from "react-icons/io5";
import { RiMessage2Line } from "react-icons/ri";
import { SlOptions } from "react-icons/sl";
import { TbPointFilled } from "react-icons/tb";
import { BsFillSendFill, BsTelephone } from "react-icons/bs";
import {
  MdOutlineInsertPhoto,
  MdOutlinePhotoSizeSelectActual,
} from "react-icons/md";
import dayjs from "dayjs";

import { FaRegFaceSmile, FaRegFaceSmileBeam } from "react-icons/fa6";
import { FiDownload, FiSend } from "react-icons/fi";
import { useQuery } from "@tanstack/react-query";
import { apiCustom } from "../../custom/customApi";
const Messages = () => {
  const messages = [
    {
      isSender: false,
      message: "Hi everyone, how are you all?",
      time: "12:10 PM",
      avatar:
        "https://i.pinimg.com/736x/24/70/74/247074463acd76f02ac03a91868bb798.jpg",
    },
    {
      isSender: false,
      message: "I want updates on the Domenic project",
      time: "12:11 PM",
      avatar:
        "https://i.pinimg.com/736x/24/70/74/247074463acd76f02ac03a91868bb798.jpg",
    },
    {
      isSender: true,
      message: "Hi Jane, how are you?",
      time: "12:15 PM",
      avatar:
        "https://i.pinimg.com/736x/a3/b4/55/a3b45590b1de233e747f037283efaf3f.jpg",
    },
    {
      isSender: true,
      message: "Dominique project is in progress",
      time: "12:16 PM",
      avatar:
        "https://i.pinimg.com/736x/a3/b4/55/a3b45590b1de233e747f037283efaf3f.jpg",
    },
    {
      isSender: false,
      message: "Yes I am fine",
      time: "12:18 PM",
      avatar:
        "https://i.pinimg.com/736x/24/70/74/247074463acd76f02ac03a91868bb798.jpg",
    },
    {
      isSender: false,
      message: "Thanks for the update on the project",
      time: "12:18 PM",
      avatar:
        "https://i.pinimg.com/736x/24/70/74/247074463acd76f02ac03a91868bb798.jpg",
    },
    {
      isSender: true,
      message: "Welcome",
      time: "12:20 PM",
      avatar:
        "https://i.pinimg.com/736x/a3/b4/55/a3b45590b1de233e747f037283efaf3f.jpg",
    },
  ];
  const [chats, setChats] = useState({});
  const { isLoading, data } = useQuery({
    queryKey: ["allChat"],
    queryFn: () => apiCustom.get("/chat").then((res) => res.data),
  });

  // useEffect sẽ chạy khi "data" thay đổi
  useEffect(() => {
    if (data?.chat) {
      // Chỉ cập nhật khi có dữ liệu
      setChats(data.chat);
    }
  }, [data]);

  const date = new Date(); // Lấy ngày hiện tại
  // Sử dụng literal types thay vì string
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long", // "long" | "short" | "narrow"
    year: "numeric", // "numeric" | "2-digit"
    month: "long", // "long" | "short" | "narrow" | "2-digit" | "numeric"
    day: "2-digit", // "2-digit" | "numeric"
  };
  // Định dạng ngày kiểu "Sunday, 25 May, 2025"
  const formattedDate = new Intl.DateTimeFormat("en-US", options).format(date);
  console.log(formattedDate);
  return (
    <div className="Messages">
      {/*  */}
      <div className="MLeft">
        {/* UP */}
        <div className="MLeftUp">
          <div className="MLeftUpContent">
            <span>Messages </span>
            <p>{formattedDate}</p>
          </div>
          <div className="MLeftUpIcon">
            <LuPencilLine />
          </div>
        </div>
        {/* Search */}
        <div className="MLeftInput">
          <input type="text" name="" id="" placeholder={`  Search Chart`} />
          <div className="MLeftInputIcon">
            <IoSearchSharp />
          </div>
        </div>
        {/* Mess OF User */}
        <div className="userMessage">
          {Array.isArray(chats) &&
            chats
              .filter((chat) => chat.unreadCount > 0) // Lọc các phần tử có unreadCount > 0
              .map((chat, index) => (
                <div key={index} className="userMessage__item">
                  <div className="userMessage__avatar">
                    <img src={chat.members[0]?.image} alt="avatar" />
                  </div>
                  <div className="userMessage__details">
                    <h4>{chat.members[0]?.username}</h4>
                    <p>{chat.lastMessage}</p>
                  </div>
                  <div className="userMessage__index">
                    <div className="userMessage__time">
                      {dayjs(chat.updatedAt).format("hh:mm A")}
                    </div>
                    <div className="userMessage__notification">
                      {chat.unreadCount}
                    </div>
                  </div>
                </div>
              ))}

          <div className="AllMess">
            <div>
              <RiMessage2Line />
            </div>
            <span>All Message</span>
          </div>
          {Array.isArray(chats) &&
            chats
              .filter((chat) => chat.unreadCount < 1) // Lọc các phần tử có unreadCount > 0
              .map((chat, index) => (
                <div key={index} className="userMessage__item">
                  <div className="userMessage__avatar">
                    <img src={chat.members[0]?.image} alt="avatar" />
                  </div>
                  <div className="userMessage__details">
                    <h4>{chat.members[0]?.username}</h4>
                    <p>{chat.lastMessage}</p>
                  </div>
                  <div className="userMessage__index">
                    <div className="userMessage__time">
                      {dayjs(chat.updatedAt).format("hh:mm A")}
                    </div>
                    {/* <div className="userMessage__notification">
                      {chat.unreadCount}
                    </div> */}
                  </div>
                </div>
              ))}
        </div>
      </div>
      {/*  */}
      <div className="MRight">
        {/* UP */}
        <div className="MRightUp">
          <div className="MRightUpInfo">
            <div className="MRightUpImage">
              <img
                src="https://i.pinimg.com/736x/24/70/74/247074463acd76f02ac03a91868bb798.jpg"
                alt=""
              />
            </div>
            <div className="MRightUpName">
              <span>Võ Chí Thanh</span>
              <div className="status">
                <span>
                  <TbPointFilled />
                </span>
                <p>Đang hoạt động</p>
              </div>
            </div>
          </div>
          <div className="MRightUpSetting">
            <div className="cam">
              <IoVideocamOutline />
            </div>
            <div className="phone">
              {" "}
              <BsTelephone />
            </div>
            <div className="option">
              {" "}
              <SlOptions />
            </div>
          </div>
        </div>
        {/* CONTENT */}
        <div className="chat-container">
          <div className="chat-date">Today, Jan 24</div>
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`chat-message ${msg.isSender ? "sender" : "receiver"}`}
            >
              {!msg.isSender && (
                <img src={msg.avatar} alt="avatar" className="avatar" />
              )}
              <div className="message-content">
                <p>{msg.message}</p>
                <span className="time">{msg.time}</span>
              </div>
              {msg.isSender && (
                <img src={msg.avatar} alt="avatar" className="avatar" />
              )}
            </div>
          ))}
        </div>
        {/* BELOW */}
        <div className="MRightBelow">
          <div className="MRightBelowInput">
            <input type="text" placeholder="Type a message" />
            <div className="MRightBelowIcon">
              <MdOutlineInsertPhoto />
              <FaRegFaceSmile />
              <FiDownload />
            </div>
          </div>
          <div className="MRightBelowIconSend">
            <FiSend />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;
