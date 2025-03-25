import React from "react";
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
import { FaRegFaceSmile, FaRegFaceSmileBeam } from "react-icons/fa6";
import { FiDownload, FiSend } from "react-icons/fi";
const Messages = () => {
  const users = [
    {
      name: "Nurpixel",
      message: "yes I will check out",
      time: "8:30 pm",
      notification: 5,
    },
    {
      name: "Albert Flores",
      message: "Typing...",
      time: "5:05 pm",
      notification: 3,
    },
    {
      name: "Devon Lane",
      message: "yes I will check out",
      time: "9:05 pm",
      notification: 1,
    },
    { name: "Jerome Bell", message: "yes I will check out", time: "3:05 pm" },
    { name: "Guy Hawkins", message: "Typing...", time: "5:05 pm" },
    { name: "Wade Warren", message: "yes I will check out", time: "4:05 pm" },
    { name: "Esther Howard", message: "yes I will check out", time: "3:05 pm" },
    { name: "Annette Black", message: "yes I will check out", time: "3:05 pm" },
  ];
  const usersChat = [
    {
      name: "Nurpixel",
      message: "yes I will check out",
      time: "8:30 pm",
      notification: 5,
    },
    {
      name: "Albert Flores",
      message: "Typing...",
      time: "5:05 pm",
      notification: 3,
    },
    {
      name: "Devon Lane",
      message: "yes I will check out",
      time: "9:05 pm",
      notification: 1,
    },
  ];
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

  return (
    <div className="Messages">
      {/*  */}
      <div className="MLeft">
        {/* UP */}
        <div className="MLeftUp">
          <div className="MLeftUpContent">
            <span>Messages </span>
            <p>Sunday, 25 May, 2025</p>
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
          {usersChat.map((user, index) => (
            <div key={index} className="userMessage__item">
              <div className="userMessage__avatar">{user.name[0]}</div>
              <div className="userMessage__details">
                <h4>{user.name}</h4>
                <p>{user.message}</p>
              </div>
              <div className="userMessage__index">
                {" "}
                <div className="userMessage__time">{user.time}</div>
                {user.notification && (
                  <div className="userMessage__notification">
                    {user.notification}
                  </div>
                )}
              </div>
            </div>
          ))}
          <div className="AllMess">
            <div>
              <RiMessage2Line />
            </div>
            <span>All Message</span>
          </div>
          {users.map((user, index) => (
            <div key={index} className="userMessage__item">
              <div className="userMessage__avatar">{user.name[0]}</div>
              <div className="userMessage__details">
                <h4>{user.name}</h4>
                <p>{user.message}</p>
              </div>
              <div className="userMessage__index">
                {" "}
                <div className="userMessage__time">{user.time}</div>
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
