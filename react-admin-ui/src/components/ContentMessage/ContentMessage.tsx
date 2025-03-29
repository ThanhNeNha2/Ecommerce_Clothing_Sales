import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { apiCustom } from "../../custom/customApi";
import { IoVideocamOutline } from "react-icons/io5";
import { BsTelephone } from "react-icons/bs";
import { SlOptions } from "react-icons/sl";
import { MdOutlineInsertPhoto } from "react-icons/md";
import { FaRegFaceSmile } from "react-icons/fa6";
import { FiDownload, FiSend } from "react-icons/fi";
import { TbPointFilled } from "react-icons/tb";
import dayjs from "dayjs";
type ContentMessageProps = {
  chatId: string;
};

const ContentMessage = ({ chatId }: ContentMessageProps) => {
  console.log("Check chatId: ", chatId);

  // ✅ 1. Khởi tạo đúng kiểu dữ liệu (Array)
  const [messagess, setMessages] = useState<any>([]);

  // ✅ 2. Lấy dữ liệu bằng useQuery
  const { isLoading, data, isError, error } = useQuery({
    queryKey: ["message", chatId], // Thêm chatId để cache theo từng phòng chat
    queryFn: () => apiCustom.get(`/chat/${chatId}`).then((res) => res.data),
  });

  // ✅ 3. Cập nhật state trong useEffect
  useEffect(() => {
    if (data && data.data && data.data.messages) {
      setMessages(data.data.messages);
      console.log("✅ Đã cập nhật tin nhắn: ", data.data.messages);
    }
  }, [data]); // Chỉ chạy khi data thay đổi

  // ✅ 4. Lấy thông tin user từ localStorage
  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")!)
    : null;
  const idUser = user?.data?.user?._id;

  // ✅ 5. Xử lý trạng thái loading và lỗi
  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {(error as any)?.message}</p>;
  return (
    <div className="MRight">
      {/* UP */}
      <div className="MRightUp">
        <div className="MRightUpInfo">
          <div className="MRightUpImage">
            <img src={data?.data?.chat?.members?.[0]?.image || null} alt="" />
          </div>
          <div className="MRightUpName">
            <span>{data?.data?.chat?.members[0]?.username || null}</span>
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
        {Array.isArray(messagess) &&
          messagess.map((msg, index) => (
            <div
              key={index}
              className={`chat-message ${
                idUser === msg.senderId ? "sender" : "receiver"
              }`}
            >
              {!(idUser === msg.senderId) && (
                <img
                  src={data?.data?.chat?.members?.[0]?.image || null}
                  alt="avatar"
                  className="avatar"
                />
              )}
              <div className="message-content">
                <p>{msg.text}</p>
                <span className="time">
                  {" "}
                  {dayjs(msg.updatedAt).format("hh:mm A")}
                </span>
              </div>
              {idUser === msg.senderId && (
                <img
                  src={data?.data?.chat?.members?.[1]?.image || null}
                  alt="avatar"
                  className="avatar"
                />
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
  );
};

export default ContentMessage;
