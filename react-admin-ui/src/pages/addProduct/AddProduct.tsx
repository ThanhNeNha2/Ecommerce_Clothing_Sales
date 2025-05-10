import React, { useState } from "react";
import "./AddProduct.scss";
import { useMutation, useQuery } from "@tanstack/react-query";
import { apiCustom } from "../../custom/customApi";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import upload from "../../utils/upload";

const AddProduct = () => {
  // Quản lý thông tin sản phẩm
  const [productInfo, setProductInfo] = useState({
    nameProduct: "",
    descriptionShort: "",
    description: "",
    originalPrice: 0,
    salePrice: 0,
    salePercentage: 0,
    stock_quantity: 0,
    gender: "Men",
    mainCategory: "Topwear",
    subCategory: [],
    image_url: [],
  });

  // Quản lý file hình ảnh
  const [files, setFiles] = useState<File[]>([]);

  // Quản lý danh sách kích thước
  const [sizes, setSizes] = useState<{ size_id: string; stock: number }[]>([
    { size_id: "XS", stock: 0 },
    { size_id: "S", stock: 0 },
    { size_id: "M", stock: 0 },
  ]);

  // Lấy danh sách kích thước từ API (giả sử có API lấy danh sách size)
  const { data: sizeOptions } = useQuery({
    queryKey: ["sizes"],
    queryFn: () => apiCustom.get("/sizes").then((res) => res.data),
    initialData: [
      { _id: "681b33349dfe7219f4170319", name: "XS" },
      { _id: "681b33349dfe7219f417031a", name: "S" },
      { _id: "681b33349dfe7219f417031b", name: "M" },
    ],
  });

  // Danh sách danh mục phụ
  const subCategories = ["T-Shirt", "Sweater", "Jacket"];

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
    field: string
  ) => {
    setProductInfo((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  // Xử lý chọn danh mục phụ
  const handleSubCategoryChange = (subCat: string) => {
    setProductInfo((prev) => {
      const subCategory = prev.subCategory.includes(subCat)
        ? prev.subCategory.filter((cat: string) => cat !== subCat)
        : [...prev.subCategory, subCat];
      return { ...prev, subCategory };
    });
  };

  // Xử lý thay đổi kích thước
  const handleSizeChange = (index: number, field: string, value: string) => {
    const newSizes = [...sizes];
    if (field === "size_id") {
      newSizes[index].size_id = value;
    } else if (field === "stock") {
      newSizes[index].stock = parseInt(value) || 0;
    }
    setSizes(newSizes);
  };

  // Xử lý upload nhiều file hình ảnh
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  // API CREATE
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: (info: any) => {
      return apiCustom.post("/product", info);
    },
    onSuccess: () => {
      toast.success("🎉 Sản phẩm đã được tạo thành công!");
      navigate("/products");
    },
    onError: (error) => {
      toast.error("🚨 Lỗi khi tạo sản phẩm. Vui lòng thử lại!");
    },
  });

  // Xác nhận tạo sản phẩm
  const handleConfirm = async () => {
    const {
      nameProduct,
      descriptionShort,
      description,
      originalPrice,
      salePrice,
    } = productInfo;

    // Kiểm tra thông tin bắt buộc
    if (
      !nameProduct.trim() ||
      !descriptionShort.trim() ||
      !description.trim() ||
      !originalPrice ||
      !salePrice
    ) {
      toast.error("⚠️ Vui lòng điền đầy đủ thông tin tất cả các trường!");
      return;
    }

    // Upload hình ảnh
    const imageUrls = [];
    for (const file of files) {
      const url = await upload(file, "product");
      imageUrls.push(url);
    }

    // Chuẩn bị dữ liệu kích thước
    const formattedSizes = sizes.map((size) => ({
      size_id:
        sizeOptions.find((opt: any) => opt.name === size.size_id)?._id || "",
      stock: size.stock,
    }));

    // Gửi dữ liệu
    mutation.mutate({
      ...productInfo,
      image_url: imageUrls,
      sizes: formattedSizes,
    });
  };

  return (
    <div className="add-product">
      <div className="content">
        <h2>Thêm Sản Phẩm Mới</h2>
        <hr />
        <div className="form">
          <div className="item">
            <label>Tên Sản Phẩm</label>
            <input
              type="text"
              placeholder="Nhập tên sản phẩm"
              value={productInfo.nameProduct}
              onChange={(e) => handleChange(e, "nameProduct")}
            />
          </div>
          <div className="item">
            <label>Mô Tả Ngắn</label>
            <textarea
              placeholder="Nhập mô tả ngắn"
              value={productInfo.descriptionShort}
              onChange={(e) => handleChange(e, "descriptionShort")}
            />
          </div>
          <div className="boxinfoProduct">
            <div className="item">
              <label>Giá Gốc (VND)</label>
              <input
                type="number"
                placeholder="Nhập giá gốc"
                value={productInfo.originalPrice}
                onChange={(e) => handleChange(e, "originalPrice")}
              />
            </div>
            <div className="item">
              <label>Phần Trăm Giảm Giá (%)</label>
              <input
                type="number"
                placeholder="Nhập phần trăm giảm giá"
                value={productInfo.salePercentage}
                onChange={(e) => handleChange(e, "salePercentage")}
              />
            </div>
            <div className="item">
              <label>Tổng Số Lượng Tồn Kho</label>
              <input
                type="number"
                placeholder="Nhập tổng số lượng tồn kho"
                value={productInfo.stock_quantity}
                onChange={(e) => handleChange(e, "stock_quantity")}
              />
            </div>
          </div>
          <div className="item">
            <label>Giới tính phù hợp với sản phẩm </label>
            <select
              value={productInfo.gender}
              onChange={(e) => handleChange(e, "gender")}
            >
              <option value="Men">Nam</option>
              <option value="Women">Nữ</option>
              <option value="Unisex">Unisex</option>
            </select>
          </div>
          <div className="item">
            <label>Danh Mục Chính</label>
            <select
              value={productInfo.mainCategory}
              onChange={(e) => handleChange(e, "mainCategory")}
            >
              <option value="Topwear">Topwear</option>
              <option value="Bottomwear">Bottomwear</option>
              <option value="Footwear">Footwear</option>
            </select>
          </div>
          <div className="item">
            <label>Danh Mục Phụ</label>
            <div className="subCategory">
              {subCategories.map((subCat) => (
                <label key={subCat}>
                  <input
                    type="checkbox"
                    checked={productInfo.subCategory.includes(subCat)}
                    onChange={() => handleSubCategoryChange(subCat)}
                  />
                  {subCat}
                </label>
              ))}
            </div>
          </div>
          <div className="item">
            <label>Hình Ảnh Sản Phẩm</label>
            <input type="file" multiple onChange={handleFileChange} />
          </div>
          <div className="item">
            <label>Kích Thước</label>
            {sizes.map((size, index) => (
              <div key={index} className="size-row">
                <select
                  value={size.size_id}
                  onChange={(e) =>
                    handleSizeChange(index, "size_id", e.target.value)
                  }
                >
                  {sizeOptions.map((option: any) => (
                    <option key={option._id} value={option.name}>
                      {option.name}
                    </option>
                  ))}
                </select>
                <input
                  type="number"
                  placeholder="Số lượng"
                  value={size.stock}
                  onChange={(e) =>
                    handleSizeChange(index, "stock", e.target.value)
                  }
                />
              </div>
            ))}
          </div>
          <div className="item">
            <label>Mô Tả Chi Tiết</label>
            <textarea
              placeholder="Nhập mô tả chi tiết"
              value={productInfo.description}
              onChange={(e) => handleChange(e, "description")}
            />
          </div>
          <div className="btn">
            <button onClick={handleConfirm}>Xác Nhận</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
