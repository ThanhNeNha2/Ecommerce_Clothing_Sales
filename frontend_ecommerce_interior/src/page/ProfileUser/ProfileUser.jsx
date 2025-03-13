import React, { useState } from "react";
import { infoUser } from "../../services/fakeApi";
import { space } from "postcss/lib/list";
const ProfileUser = () => {
  const [checkUpdate, setCheckUpdate] = useState(false);
  const [infoUserChange, setInfoUserChange] = useState({
    username: infoUser.username,
    email: infoUser.email,
    phone: infoUser.phone,
    address: infoUser.address,
    sex: infoUser.sex,
    dateBirthday: infoUser.dateBirthday,
  });
  const handleChangeUpdate = (e, info) => {
    setInfoUserChange((pev) => ({ ...pev, [info]: e.target.value }));
  };
  return (
    <div className="h-screen w-full flex justify-center items-center bg-blue-100 ">
      <div className="h-[80%] w-[60%] bg-white flex ">
        <div className=" w-[40%]   flex items-center  flex-col gap-10 ">
          <div className="w-[190px]  h-[190px] rounded-full border border-gray-500 flex justify-center items-center mt-16 ">
            <div className="w-[180px] h-[180px]   rounded-full   overflow-hidden  ">
              <img
                src={infoUser.avataUser}
                alt="Avatar"
                className="w-full h-full object-cover object-center  "
              />
            </div>
          </div>
          <div>
            {checkUpdate === false ? (
              <button
                className="bg-colorMain py-[6px] px-7 text-base font-medium rounded text-white"
                onClick={() => setCheckUpdate(true)}
              >
                Update
              </button>
            ) : (
              <div>
                <button
                  className="bg-red-500 py-[6px] px-7 text-base font-medium rounded text-white"
                  onClick={() => setCheckUpdate(false)}
                >
                  Cancel
                </button>{" "}
                <button
                  className="bg-green-600 py-[6px] px-7 text-base font-medium rounded text-white"
                  onClick={() => setCheckUpdate(false)}
                >
                  Save
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="flex-1">
          <div className="  py-7 ">
            <span className="font-semibold text-3xl ml-36">My Profile </span>
          </div>
          <div className=" gap-3 w-full ">
            <div className="flex flex-col gap-2 w-[80%]">
              <span>UserName </span>
              <input
                type="text"
                name=""
                id=""
                disabled={!checkUpdate}
                className={`border border-gray-200 py-[5px]  rounded px-3  ${
                  checkUpdate === false
                    ? "bg-gray-100  text-gray-400 "
                    : "bg-gray-50  text-black"
                }`}
                value={infoUserChange.username}
                onChange={(e) => handleChangeUpdate(e, "username")}
              />
            </div>
            <div className="flex flex-col gap-2 w-[80%]">
              <span>Email </span>
              <input
                type="text"
                name=""
                id=""
                value={infoUserChange.email}
                disabled={!checkUpdate}
                className={`border border-gray-200 py-[5px]  rounded px-3  ${
                  checkUpdate === false
                    ? "bg-gray-100  text-gray-400 "
                    : "bg-gray-50  text-black"
                }`}
                onChange={(e) => handleChangeUpdate(e, "email")}
              />
            </div>
          </div>
          <div className=" gap-3 w-full ">
            <div className="flex flex-col gap-2 w-[80%]">
              <span>Phone </span>
              <input
                type="text"
                name=""
                id=""
                value={infoUserChange.phone}
                disabled={!checkUpdate}
                className={`border border-gray-200 py-[5px]  rounded px-3  ${
                  checkUpdate === false
                    ? "bg-gray-100  text-gray-400 "
                    : "bg-gray-50  text-black"
                }`}
                onChange={(e) => handleChangeUpdate(e, "phone")}
              />
            </div>
            <div className="flex flex-col gap-2 w-[80%]">
              <span>Address </span>
              <input
                type="text"
                name=""
                id=""
                value={infoUserChange.address}
                disabled={!checkUpdate}
                className={`border border-gray-200 py-[5px]  rounded px-3  ${
                  checkUpdate === false
                    ? "bg-gray-100  text-gray-400 "
                    : "bg-gray-50  text-black"
                }`}
                onChange={(e) => handleChangeUpdate(e, "address")}
              />
            </div>
          </div>{" "}
          <div className=" gap-3 w-full ">
            <div className="flex flex-col gap-2 w-[80%]">
              <span>Sex </span>
              <input
                type="text"
                name=""
                id=""
                value={infoUserChange.sex}
                disabled={!checkUpdate}
                className={`border border-gray-200 py-[5px]  rounded px-3  ${
                  checkUpdate === false
                    ? "bg-gray-100  text-gray-400 "
                    : "bg-gray-50  text-black"
                }`}
                onChange={(e) => handleChangeUpdate(e, "sex")}
              />
            </div>
            <div className="flex flex-col gap-2 w-[80%]">
              <span>Date Birthday </span>
              <input
                type="text"
                name=""
                id=""
                value={infoUserChange.dateBirthday}
                disabled={!checkUpdate}
                className={`border border-gray-200 py-[5px]  rounded px-3  ${
                  checkUpdate === false
                    ? "bg-gray-100  text-gray-400 "
                    : "bg-gray-50  text-black"
                }`}
                onChange={(e) => handleChangeUpdate(e, "dateBirthday")}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileUser;
