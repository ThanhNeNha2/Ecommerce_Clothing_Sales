import React from "react";
import CoverImg from "../../components/Cover/CoverImg";
import { IoLocation, IoTime } from "react-icons/io5";
import { FaPhone } from "react-icons/fa";
import Quality from "../../components/Quality/Quality";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";

const Contact = () => {
  return (
    <div>
      <Header />
      <CoverImg namePage={"Contact"} />
      <div className="px-[300px] mb-16">
        <div className="flex flex-col gap-3 justify-center items-center mt-10 text-center">
          <span className="font-poppins font-semibold text-[25px]">
            Get In Touch With Us
          </span>
          <p className="w-[60%] text-gray-400">
            For More Information About Our Product & Services. Please Feel Free
            To Drop Us An Email. Our Staff Always Be There To Help You Out. Do
            Not Hesitate!
          </p>
        </div>

        <div className="flex gap-16 mt-10">
          <div className="w-[30%] flex flex-col gap-10">
            {/* dia diem  */}
            <div className="flex gap-3">
              <div className="text-2xl">
                <IoLocation />
              </div>
              <div>
                <span className="font-poppins font-medium text-lg">
                  Address
                </span>
                <p>236 5th SE Avenue, New York NY10000, United States</p>
              </div>
            </div>
            {/* dien thoai  */}
            <div className="flex gap-3">
              <div className="text-2xl">
                <FaPhone />
              </div>
              <div>
                <span className="font-poppins font-medium text-lg">Phone</span>
                <p>Mobile: +(84) 546-6789</p>
                <p>Hotline: +(84) 456-6789</p>
              </div>
            </div>
            {/* dia diem  */}
            <div className="flex gap-3">
              <div className="text-2xl">
                <IoTime />
              </div>
              <div>
                <span className="font-poppins font-medium text-lg">
                  Working Time
                </span>
                <p>Monday-Friday: 9:00 - 22:00</p>
                <p>Saturday-Sunday: 9:00 - 21:00</p>
              </div>
            </div>
          </div>
          <div className="flex-1 flex flex-col gap-5 ">
            <div className="flex flex-col gap-2 w-[100%]">
              <span>Your Name </span>
              <input
                type="text"
                name=""
                id=""
                className="border border-gray-400 py-[5px] rounded "
              />
            </div>
            <div className="flex flex-col gap-2 w-[100%]">
              <span>Email Address </span>
              <input
                type="text"
                name=""
                id=""
                className="border border-gray-400 py-[5px] rounded "
              />
            </div>{" "}
            <div className="flex flex-col gap-2 w-[100%]">
              <span>Subject </span>
              <input
                type="text"
                name=""
                id=""
                className="border border-gray-400 py-[5px] rounded "
              />
            </div>{" "}
            <div className="flex flex-col gap-2 w-[100%]">
              <span>Message</span>
              <textarea
                className="border border-gray-400 py-2 px-3 rounded resize-none"
                rows="4"
                placeholder="Nhập tin nhắn..."
              />
            </div>
            <div className="">
              <button className="px-10 py-[7px] bg-colorMain text-white rounded">
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
      <Quality />
      <Footer />
    </div>
  );
};

export default Contact;
