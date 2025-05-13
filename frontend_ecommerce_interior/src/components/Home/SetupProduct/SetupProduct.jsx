import React from "react";

const SetupProduct = () => {
  return (
    <div className="mt-24 mb-8">
      <div className="flex flex-col justify-center items-center">
        <span className="font-poppins font-semibold text-[18px] leading-[150%]">
          Share your setup with
        </span>
        <h1 className="text-[28px] font-bold">#TRENDORYFurniture</h1>
      </div>
      <div className="w-full flex gap-3 h-[600px] overflow-hidden">
        <div className="w-[40%] flex flex-col gap-3">
          <div className="h-[55%]   flex gap-3 items-end">
            <div className="flex-1 h-full  ">
              <img
                src="https://i.pinimg.com/736x/19/8a/be/198abe5eb51f92f21288537f9b4b596b.jpg"
                alt=""
                className="w-full h-full object-cover object-right"
              />
            </div>
            <div className="w-[83%] h-[85%]  ">
              <img
                src="https://i.pinimg.com/736x/6c/08/30/6c083056f66ec47cdc8c83ecd8ccd5fc.jpg"
                alt=""
                className="w-full h-full object-cover  "
              />
            </div>
          </div>
          <div className="flex-1 w-full h-full  flex gap-3">
            <div className="flex-1  ">
              <img
                src="https://i.pinimg.com/736x/1a/10/81/1a10810cae60dc4ce20c48166383aa36.jpg"
                alt=""
                className="w-full h-full object-top  object-contain "
              />
            </div>
            <div className="w-[60%] h-[65%] bg-green-300">
              <img
                src="https://i.pinimg.com/736x/cd/f7/cf/cdf7cf37d0047ae12c90b666312e3424.jpg"
                alt=""
                className="w-full h-full object-cover  "
              />
            </div>
          </div>
        </div>
        <div className="flex-1    flex items-center">
          <img
            src="https://i.pinimg.com/736x/11/5e/0c/115e0cd93438b1e077ad313b995a4048.jpg"
            className="h-[70%] w-full object-cover"
            alt=""
          />
        </div>

        <div className="w-[40%]   flex flex-col gap-3">
          <div className="h-[65%]  flex gap-3 items-end overflow-hidden">
            <div className="w-[60%] h-[90%]">
              <img
                src="https://i.pinimg.com/736x/58/c4/33/58c433d450f41f1c1a8c55ca24c3f9cd.jpg"
                className="w-full h-full object-cover  "
                alt=""
              />
            </div>
            <div className="flex-1 h-full">
              <img
                src="https://i.pinimg.com/736x/7f/4d/6a/7f4d6aba32f9f448667aa63cf027bda0.jpg"
                className="w-full h-full object-cover  "
                alt=""
              />
            </div>
          </div>
          <div className="flex-1   flex gap-3 overflow-hidden">
            <div className="w-[35%] h-full">
              {" "}
              <img
                src="https://i.pinimg.com/736x/02/e2/7c/02e27c89eaf5eb931ff9440301878db4.jpg"
                className="w-full h-full object-cover  "
                alt=""
              />
            </div>
            <div className="w-[50%] h-[80%]    ">
              <img
                src="https://i.pinimg.com/736x/f7/b7/08/f7b7089dbce2ac40d03f72a5bc341397.jpg"
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
