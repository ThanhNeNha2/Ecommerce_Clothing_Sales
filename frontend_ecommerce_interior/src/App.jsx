import { FiMessageSquare } from "react-icons/fi";
import RouterCustom from "./Custom/Router/RouterCustom";
import { FaCaretUp } from "react-icons/fa";
import { SlOptions } from "react-icons/sl";
import { TbPointFilled } from "react-icons/tb";
import { IoIosSend } from "react-icons/io";
import { FaRegFaceSmile } from "react-icons/fa6";
import { MdOutlineInsertPhoto } from "react-icons/md";

function App() {
  const handleClickUp = () => {
    window.scrollTo(0, 0);
  };
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
        >
          <div className=" absolute top-[-5px] right-[-5px] bg-red-400 text-sm w-[20px] h-[20px] flex justify-center items-center  rounded-full ">
            <span>1</span>
          </div>
          <FiMessageSquare />
        </div>
      </div>
      <div className="h-[calc(100vh)] w-[500px] bg-gray-300 px-3 pt-2 pb-3 z-50 fixed top-0 bottom-0 left-0 flex flex-col justify-between ">
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
              <span className="font-semibold font-poppins">Võ Chí Thanh</span>
              <div className="flex items-center">
                <div className="text-xl text-green-500">
                  <TbPointFilled />
                </div>
                <span> Đang hoạt động</span>
              </div>
            </div>
          </div>
          <div
            className="w-[35px] h-[35px] flex justify-center items-center
         text-lg rounded-full hover:opacity-[0.8] cursor-pointer relative border border-gray-400 text-gray-400"
          >
            <SlOptions />
          </div>
        </div>
        {/* ĐOẠN CHAT  */}
        <div className="flex-1 bg-white rounded my-2"></div>
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
    </div>
  );
}

export default App;
