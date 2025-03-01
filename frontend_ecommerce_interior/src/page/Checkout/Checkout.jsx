import React from "react";
import Header from "../../components/Header/Header";
import CoverImg from "../../components/Cover/CoverImg";
import Quality from "../../components/Quality/Quality";
import Footer from "../../components/Footer/Footer";

const Checkout = () => {
  const provinces = [
    "An Giang",
    "Bà Rịa - Vũng Tàu",
    "Bắc Giang",
    "Bắc Kạn",
    "Bạc Liêu",
    "Bắc Ninh",
    "Bến Tre",
    "Bình Định",
    "Bình Dương",
    "Bình Phước",
    "Bình Thuận",
    "Cà Mau",
    "Cần Thơ",
    "Cao Bằng",
    "Đà Nẵng",
    "Đắk Lắk",
    "Đắk Nông",
    "Điện Biên",
    "Đồng Nai",
    "Đồng Tháp",
    "Gia Lai",
    "Hà Giang",
    "Hà Nam",
    "Hà Nội",
    "Hà Tĩnh",
    "Hải Dương",
    "Hải Phòng",
    "Hậu Giang",
    "Hòa Bình",
    "Hưng Yên",
    "Khánh Hòa",
    "Kiên Giang",
    "Kon Tum",
    "Lai Châu",
    "Lâm Đồng",
    "Lạng Sơn",
    "Lào Cai",
    "Long An",
    "Nam Định",
    "Nghệ An",
    "Ninh Bình",
    "Ninh Thuận",
    "Phú Thọ",
    "Phú Yên",
    "Quảng Bình",
    "Quảng Nam",
    "Quảng Ngãi",
    "Quảng Ninh",
    "Quảng Trị",
    "Sóc Trăng",
    "Sơn La",
    "Tây Ninh",
    "Thái Bình",
    "Thái Nguyên",
    "Thanh Hóa",
    "Thừa Thiên Huế",
    "Tiền Giang",
    "TP. Hồ Chí Minh",
    "Trà Vinh",
    "Tuyên Quang",
    "Vĩnh Long",
    "Vĩnh Phúc",
    "Yên Bái",
  ];
  const countries = [
    "Việt Nam",
    "Hoa Kỳ",
    "Anh",
    "Pháp",
    "Đức",
    "Nhật Bản",
    "Hàn Quốc",
    "Trung Quốc",
    "Ấn Độ",
    "Canada",
    "Úc",
    "Nga",
    "Brazil",
    "Nam Phi",
    "Mexico",
    "Indonesia",
    "Thái Lan",
    "Malaysia",
    "Singapore",
    "Philippines",
  ];
  return (
    <div>
      <Header />
      <CoverImg namePage={"Checkout"} />
      <div className="px-[300px] flex gap-20 mt-20">
        <div className="w-[40%] flex flex-col gap-3  ">
          <span className="font-poppins font-semibold text-[28px]">
            Billing Details{" "}
          </span>
          <div className="flex gap-3">
            <div className="flex flex-col gap-2">
              <span>First Name </span>
              <input
                type="text"
                name=""
                id=""
                className="border border-gray-500 py-[5px] rounded"
              />
            </div>
            <div className="flex flex-col gap-2">
              <span>Last Name </span>
              <input
                type="text"
                name=""
                id=""
                className="border border-gray-500 py-[5px] rounded"
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <span>Company Name (Optional) </span>
            <input
              type="text"
              name=""
              id=""
              className="border border-gray-500 py-[5px] rounded"
            />
          </div>
          {/* chon quoc gia  */}
          <div className="flex flex-col gap-2">
            <span>Country / Region</span>
            <select className="border border-gray-500 py-[5px] px-3 rounded">
              <option value="">Chọn Quốc gia</option>
              {countries.map((province) => (
                <option key={province} value={province}>
                  {province}
                </option>
              ))}
            </select>
          </div>
          {/*  */}
          <div className="flex flex-col gap-2">
            <span> Street address</span>
            <input
              type="text"
              name=""
              id=""
              className="border border-gray-500 py-[5px] rounded"
            />
          </div>
          {/*  */}
          <div className="flex flex-col gap-2">
            <span>Town / City </span>
            <input
              type="text"
              name=""
              id=""
              className="border border-gray-500 py-[5px] rounded"
            />
          </div>
          {/* chon tinh thanh  */}
          <div className="flex flex-col gap-2">
            <span>Province</span>
            <select className="border border-gray-500 py-[5px] px-3 rounded">
              <option value="">Chọn tỉnh thành</option>
              {provinces.map((province) => (
                <option key={province} value={province}>
                  {province}
                </option>
              ))}
            </select>
          </div>
          {/* Zip Code */}
          <div className="flex flex-col gap-2">
            <span> ZIP Code </span>
            <input
              type="text"
              name=""
              id=""
              className="border border-gray-500 py-[5px] rounded"
            />
          </div>{" "}
          {/* Phone */}
          <div className="flex flex-col gap-2">
            <span>Phone </span>
            <input
              type="text"
              name=""
              id=""
              className="border border-gray-500 py-[5px] rounded"
            />
          </div>{" "}
          {/* Email  */}
          <div className="flex flex-col gap-2">
            <span>Email address </span>
            <input
              type="text"
              name=""
              id=""
              className="border border-gray-500 py-[5px] rounded"
            />
          </div>
        </div>
        <div className="flex-1  flex flex-col gap-3  mt-16  ">
          <div className="flex justify-between">
            <span className="font-poppins font-medium text-[20px]">
              Product
            </span>
            <span className="font-poppins font-medium text-[20px]">
              Subtotal
            </span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Sofa x 1</span>
            <p>Rs. 250,000.00</p>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Subtotal</span>
            <p>Rs. 250,000.00</p>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Total</span>
            <p className="font-semibold text-lg text-colorMain">
              Rs. 250,000.00
            </p>
          </div>
          <hr />
          {/*  bên dưới  */}
          <div className="flex flex-col gap-3">
            <div className="flex gap-3 items-center">
              <div className="w-[10px] h-[10px] bg-black rounded-full"></div>
              <span className="">Direct Bank Transfer</span>
            </div>
            <p className="text-gray-400">
              Make your payment directly into our bank account. Please use your
              Order ID as the payment reference. Your order will not be shipped
              until the funds have cleared in our account.
            </p>
            <div className="flex gap-3 items-center">
              <div className="w-[10px] h-[10px] bg-white border border-gray-400  rounded-full"></div>
              <span className=" text-gray-400">Direct Bank Transfer</span>
            </div>{" "}
            <div className="flex gap-3 items-center">
              <div className="w-[10px] h-[10px] bg-white border border-gray-400  rounded-full"></div>
              <span className=" text-gray-400">Cash On Delivery</span>
            </div>
            <span className="text-gray-800 ">
              Your personal data will be used to support your experience
              throughout this website, to manage access to your account, and for
              other purposes described in our <b> privacy policy.</b>
            </span>
          </div>
          <div className="flex justify-center mt-5 rounded">
            <button className="py-[6px] px-5 border border-black rounded hover:bg-gray-200">
              Place order
            </button>
          </div>
        </div>
      </div>
      <Quality />
      <Footer />
    </div>
  );
};

export default Checkout;
