import React from "react";

const SetupProduct = () => {
  return (
    <div className="mt-24">
      <div className="flex flex-col justify-center items-center">
        <span className="font-poppins font-semibold text-[18px] leading-[150%]">
          Share your setup with
        </span>
        <h1 className="text-[28px] font-bold">#FuniroFurniture</h1>
      </div>
      <div className="w-full flex gap-3 h-[600px] overflow-hidden">
        <div className="w-[40%] flex flex-col gap-3">
          <div className="h-[55%]   flex gap-3 items-end">
            <div className="flex-1 h-full  ">
              <img
                src="https://images.pexels.com/photos/2826787/pexels-photo-2826787.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt=""
                className="w-full h-full object-cover object-right"
              />
            </div>
            <div className="w-[83%] h-[85%]  ">
              <img
                src="https://images.pexels.com/photos/265004/pexels-photo-265004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt=""
                className="w-full h-full object-cover  "
              />
            </div>
          </div>
          <div className="flex-1 w-full h-full  flex gap-3">
            <div className="flex-1  ">
              <img
                src="https://images.pexels.com/photos/1148955/pexels-photo-1148955.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt=""
                className="w-full h-full object-cover  "
              />
            </div>
            <div className="w-[60%] h-[65%] bg-green-300">
              <img
                src="https://images.pexels.com/photos/2082090/pexels-photo-2082090.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt=""
                className="w-full h-full object-cover  "
              />
            </div>
          </div>
        </div>
        <div className="flex-1    flex items-center">
          <img
            src="https://images.pexels.com/photos/30871307/pexels-photo-30871307/free-photo-of-modern-minimalist-kitchen-dining-interior.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            className="h-[70%] w-full object-cover"
            alt=""
          />
        </div>

        <div className="w-[40%]   flex flex-col gap-3">
          <div className="h-[65%]  flex gap-3 items-end overflow-hidden">
            <div className="w-[60%] h-[90%]">
              <img
                src="https://images.pexels.com/photos/1454806/pexels-photo-1454806.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                className="w-full h-full object-cover  "
                alt=""
              />
            </div>
            <div className="flex-1 h-full">
              <img
                src="https://images.pexels.com/photos/462235/pexels-photo-462235.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                className="w-full h-full object-cover  "
                alt=""
              />
            </div>
          </div>
          <div className="flex-1   flex gap-3 overflow-hidden">
            <div className="w-[35%] h-full">
              {" "}
              <img
                src="https://images.pexels.com/photos/4992465/pexels-photo-4992465.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                className="w-full h-full object-cover  "
                alt=""
              />
            </div>
            <div className="w-[50%] h-[80%]    ">
              <img
                src="https://images.pexels.com/photos/4099350/pexels-photo-4099350.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                className="w-full h-full object-cover  "
                alt=""
              />{" "}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SetupProduct;
