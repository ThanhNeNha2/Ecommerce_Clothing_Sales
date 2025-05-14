import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import { getUserById, updateUser } from "../../services/api";
import upload from "../../Custom/Img/upload";
import { notification } from "antd";

const ProfileUser = () => {
  const [checkUpdate, setCheckUpdate] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [file, setFile] = useState(null);
  const [id, setId] = useState("");

  const [infoUserChange, setInfoUserChange] = useState({
    username: "",
    email: "",
    phone: "",
    address: "",
    sex: "",
    image: "",
  });

  const handleChangeUpdate = (e, field) => {
    setInfoUserChange((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreviewImage(imageUrl);
      setInfoUserChange((prev) => ({ ...prev, image: file }));
    }
  };

  const fetchUser = async () => {
    const localUser = localStorage.getItem("user");
    if (!localUser) {
      console.warn("No user in localStorage");
      return;
    }

    const userId = JSON.parse(localUser)._id;
    setId(userId);
    try {
      const res = await getUserById(userId);
      if (res && res.data && res.data.idCode === 0) {
        const user = res.data.user;
        setInfoUserChange({
          username: user.username || "",
          email: user.email || "",
          phone: user.phone || "",
          address: user.address || "",
          sex: user.sex || "",
          image: user.image || "",
        });
      }
    } catch (err) {
      console.error("Lỗi khi lấy thông tin user:", err);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handleUpdate = async () => {
    try {
      const url = await upload(file, "user");
      const infoUpdate = { ...infoUserChange, image: url };
      const res = await updateUser(id, infoUpdate);
      if (res && res.data && res.data.idCode === 0) {
        notification.success({
          message: "Update info success!",
        });
        fetchUser();
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div>
      <Header />
      <div className="h-screen w-full flex justify-center items-center bg-blue-100">
        <div className="h-[80%] w-[60%] bg-white flex">
          <div className="w-[40%] flex items-center flex-col gap-10">
            <div className="w-[190px] h-[190px] rounded-full border border-gray-500 flex justify-center items-center mt-16">
              <div className="w-[180px] h-[180px] rounded-full overflow-hidden">
                <img
                  src={
                    previewImage
                      ? previewImage
                      : infoUserChange.image
                      ? infoUserChange.image
                      : "https://i.pinimg.com/736x/3c/ae/07/3cae079ca0b9e55ec6bfc1b358c9b1e2.jpg"
                  }
                  alt="Avatar"
                  className="w-full h-full object-cover object-center"
                />
              </div>
            </div>

            {checkUpdate && (
              <div className="mt-4">
                <label
                  htmlFor="upload-avatar"
                  className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                >
                  Chọn ảnh
                </label>
                <input
                  id="upload-avatar"
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files && e.target.files.length > 0) {
                      setFile(e.target.files[0]);
                    }
                    handleImageChange(e);
                  }}
                  className="hidden"
                />
              </div>
            )}

            <div>
              {checkUpdate === false ? (
                <button
                  className="bg-colorMain py-[6px] px-7 text-base font-medium rounded text-white"
                  onClick={() => setCheckUpdate(true)}
                >
                  Update
                </button>
              ) : (
                <div className="flex gap-2">
                  <button
                    className="bg-red-500 py-[6px] px-7 text-base font-medium rounded text-white"
                    onClick={() => {
                      setCheckUpdate(false);
                      setPreviewImage("");
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-green-600 py-[6px] px-7 text-base font-medium rounded text-white"
                    onClick={() => {
                      handleUpdate();
                      setCheckUpdate(false);
                    }}
                  >
                    Save
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="flex-1">
            <div className="py-7">
              <span className="font-semibold text-3xl ml-36">My Profile </span>
            </div>

            <div className="gap-3 w-full px-10 space-y-4">
              {["username", "email", "phone", "address"].map((field) => (
                <div key={field} className="flex flex-col gap-2 w-full">
                  <span className="capitalize">{field}</span>
                  <input
                    type="text"
                    value={infoUserChange[field]}
                    disabled={field === "email" ? true : !checkUpdate}
                    className={`border border-gray-200 py-[5px] rounded px-3 ${
                      !checkUpdate || field === "email"
                        ? "bg-gray-100 text-gray-400"
                        : "bg-gray-50 text-black"
                    }`}
                    onChange={(e) => handleChangeUpdate(e, field)}
                  />
                </div>
              ))}
              <div className="flex flex-col gap-2 w-full">
                <span className="capitalize">Sex</span>
                <select
                  value={infoUserChange.sex}
                  disabled={!checkUpdate}
                  className={`border border-gray-200 py-[5px] rounded px-3 ${
                    !checkUpdate
                      ? "bg-gray-100 text-gray-400"
                      : "bg-gray-50 text-black"
                  }`}
                  onChange={(e) => handleChangeUpdate(e, "sex")}
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileUser;
