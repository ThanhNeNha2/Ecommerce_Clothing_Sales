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

  const fieldLabels = {
    username: "Tên người dùng",
    email: "Email ",
    phone: "Số điện thoại ",
    address: "Địa chỉ",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <Header />

      <div className="flex justify-center items-center py-12 px-4">
        <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-12">
            <h1 className="text-4xl font-bold text-white text-center">
              Thông tin cá nhân
            </h1>
            <p className="text-blue-100 text-center mt-2">
              Quản lý thông tin cá nhân của bạn
            </p>
          </div>

          <div className="flex flex-col lg:flex-row">
            {/* Left Panel - Avatar Section */}
            <div className="lg:w-2/5 bg-gradient-to-b from-gray-50 to-white p-8 flex flex-col items-center">
              <div className="relative group">
                <div className="w-48 h-48 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 p-1 shadow-xl">
                  <div className="w-full h-full rounded-full overflow-hidden bg-white">
                    <img
                      src={
                        previewImage
                          ? previewImage
                          : infoUserChange.image
                          ? infoUserChange.image
                          : "https://i.pinimg.com/736x/3c/ae/07/3cae079ca0b9e55ec6bfc1b358c9b1e2.jpg"
                      }
                      alt="Avatar"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {checkUpdate && (
                  <div className="absolute -bottom-2 -right-2">
                    <label
                      htmlFor="upload-avatar"
                      className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
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
              </div>

              <div className="mt-8 text-center">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  {infoUserChange.username || "User"}
                </h2>
                <p className="text-gray-600">{infoUserChange.email}</p>
              </div>

              <div className="mt-8">
                {checkUpdate === false ? (
                  <button
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-3 rounded-full font-semibold shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105"
                    onClick={() => setCheckUpdate(true)}
                  >
                    <svg
                      className="w-5 h-5 inline mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                    Chỉnh sửa thông tin
                  </button>
                ) : (
                  <div className="flex gap-3">
                    <button
                      className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-full font-semibold shadow-lg transition-all duration-300 hover:scale-105"
                      onClick={() => {
                        setCheckUpdate(false);
                        setPreviewImage("");
                      }}
                    >
                      Hủy
                    </button>
                    <button
                      className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-6 py-3 rounded-full font-semibold shadow-lg transition-all duration-300 hover:scale-105"
                      onClick={() => {
                        handleUpdate();
                        setCheckUpdate(false);
                      }}
                    >
                      Lưu thay đổi
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Right Panel - Form Section */}
            <div className="lg:w-3/5 p-8">
              <div className="space-y-6">
                {["username", "email", "phone", "address"].map((field) => (
                  <div key={field} className="group">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      {fieldLabels[field]}
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={infoUserChange[field]}
                        disabled={field === "email" ? true : !checkUpdate}
                        className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 focus:outline-none ${
                          !checkUpdate || field === "email"
                            ? "bg-gray-50 border-gray-200 text-gray-500 cursor-not-allowed"
                            : "bg-white border-gray-300 text-gray-800 hover:border-blue-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                        }`}
                        onChange={(e) => handleChangeUpdate(e, field)}
                        placeholder={`Vui lòng nhập ${fieldLabels[
                          field
                        ].toLowerCase()}`}
                      />
                      {field === "email" && (
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                          <svg
                            className="w-5 h-5 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                            />
                          </svg>
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Giới tính
                  </label>
                  <div className="relative">
                    <select
                      value={infoUserChange.sex}
                      disabled={!checkUpdate}
                      className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 focus:outline-none appearance-none ${
                        !checkUpdate
                          ? "bg-gray-50 border-gray-200 text-gray-500 cursor-not-allowed"
                          : "bg-white border-gray-300 text-gray-800 hover:border-blue-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                      }`}
                      onChange={(e) => handleChangeUpdate(e, "sex")}
                    >
                      <option value="Male">Nam </option>
                      <option value="Female">Nữ </option>
                      <option value="Other">Khác</option>
                    </select>
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                      <svg
                        className="w-5 h-5 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Additional Info Cards */}
              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-100">
                  <div className="flex items-center">
                    <div className="bg-blue-100 p-2 rounded-lg">
                      <svg
                        className="w-5 h-5 text-blue-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">
                        Trạng thái tài khoản
                      </p>
                      <p className="text-sm text-gray-600">Hoạt động</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-xl border border-green-100">
                  <div className="flex items-center">
                    <div className="bg-green-100 p-2 rounded-lg">
                      <svg
                        className="w-5 h-5 text-green-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                        />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">
                        Bảo vệ
                      </p>
                      <p className="text-sm text-gray-600">Được bảo vệ </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileUser;
