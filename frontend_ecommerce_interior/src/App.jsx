import { FiMessageSquare } from "react-icons/fi";
import RouterCustom from "./Custom/Router/RouterCustom";
import { FaCaretUp } from "react-icons/fa";

import { useState } from "react";
import Chatbot from "./components/Chat/Chatbot";

function App() {
  const handleClickUp = () => {
    window.scrollTo(0, 0);
  };
  const [openMessage, setOpenMessage] = useState(false);

  return (
    <div className="relative">
      <RouterCustom />
      <div className="  bottom-16 right-16 flex flex-col gap-3  fixed z-10 ">
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
          <FiMessageSquare />
        </div>
      </div>
      {openMessage && <Chatbot setOpenMessage={setOpenMessage} />}
    </div>
  );
}

export default App;
