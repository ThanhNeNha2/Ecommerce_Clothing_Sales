import React, { useState, useEffect } from "react";
import "./AddProduct.scss";
import { useMutation, useQuery } from "@tanstack/react-query";
import { apiCustom } from "../../custom/customApi";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import upload from "../../utils/upload";

interface ProductInfo {
  nameProduct: string;
  descriptionShort: string;
  description: string;
  originalPrice: number;
  salePrice: number;
  salePercentage: number;
  stock_quantity: number;
  gender: "Men" | "Women" | "Unisex";
  mainCategory:
    | "Topwear"
    | "Bottomwear"
    | "OnePiece"
    | "Footwear"
    | "Accessories"
    | "Underwear"
    | "Sportswear"
    | "Sleepwear"
    | "Swimwear";
  subCategory: string[];
  image_url: string[];
}

interface Size {
  size_id: string;
  stock: number;
}

interface SizeOption {
  _id: string;
  name: string;
}

const AddProduct: React.FC = () => {
  const [productInfo, setProductInfo] = useState<ProductInfo>({
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

  const [files, setFiles] = useState<File[]>([]);
  const [sizes, setSizes] = useState<Size[]>([
    { size_id: "XS", stock: 0 },
    { size_id: "S", stock: 0 },
    { size_id: "M", stock: 0 },
  ]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  const { data: sizeOptions } = useQuery<SizeOption[]>({
    queryKey: ["sizes"],
    queryFn: () => apiCustom.get("/size").then((res) => res.data.sizes),
    initialData: [
      { _id: "681b33349dfe7219f4170319", name: "XS" },
      { _id: "681b33349dfe7219f417031a", name: "S" },
      { _id: "681b33349dfe7219f417031b", name: "M" },
    ],
  });
  console.log("check data  sizeOptions ", sizeOptions);

  const subCategoryMap: { [key in ProductInfo["mainCategory"]]: string[] } = {
    Topwear: [
      "T-Shirt",
      "Shirt",
      "Polo",
      "Hoodie",
      "Sweater",
      "Jacket",
      "Blazer",
      "Tank Top",
      "Crop Top",
      "Coat",
      "Trench Coat",
      "Windbreaker",
      "Bomber Jacket",
      "Denim Jacket",
    ],
    Bottomwear: ["Jeans", "Trousers", "Shorts", "Skirt", "Leggings", "Joggers"],
    OnePiece: ["Dress", "Jumpsuit", "Overalls"],
    Footwear: ["Sneakers", "Loafers", "Boots", "Sandals", "Heels"],
    Accessories: [
      "Hat",
      "Cap",
      "Belt",
      "Scarf",
      "Gloves",
      "Bag",
      "Sunglasses",
      "Watch",
      "Jewelry",
    ],
    Underwear: ["Underwear"],
    Sportswear: ["Tracksuit", "Sportswear"],
    Sleepwear: ["Sleepwear"],
    Swimwear: ["Swimwear"],
  };

  useEffect(() => {
    const validSubCategories = subCategoryMap[productInfo.mainCategory] || [];
    const filteredSubCategories = productInfo.subCategory.filter(
      (cat: string) => validSubCategories.includes(cat)
    );
    setProductInfo((prev) => ({
      ...prev,
      subCategory: filteredSubCategories,
    }));
  }, [productInfo.mainCategory]);

  useEffect(() => {
    return () => {
      imagePreviews.forEach((preview) => URL.revokeObjectURL(preview));
    };
  }, [imagePreviews]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
    field: keyof ProductInfo
  ) => {
    setProductInfo((prev) => ({
      ...prev,
      [field]: e.target.value as any,
    }));
  };

  const handleSubCategoryChange = (subCat: string) => {
    setProductInfo((prev) => {
      const subCategory = prev.subCategory.includes(subCat)
        ? prev.subCategory.filter((cat: string) => cat !== subCat)
        : [...prev.subCategory, subCat];
      return { ...prev, subCategory };
    });
  };

  const handleSizeChange = (
    index: number,
    field: keyof Size,
    value: string
  ) => {
    const newSizes = [...sizes];
    if (field === "size_id") {
      newSizes[index].size_id = value;
    } else if (field === "stock") {
      newSizes[index].stock = parseInt(value) || 0;
    }
    setSizes(newSizes);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      setFiles(selectedFiles);

      const imagePreviews = selectedFiles
        .map((file) =>
          file.type.startsWith("image/") ? URL.createObjectURL(file) : null
        )
        .filter((preview): preview is string => preview !== null);
      setImagePreviews(imagePreviews);
    }
  };

  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: (info: ProductInfo) => {
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

  const handleConfirm = async () => {
    const {
      nameProduct,
      descriptionShort,
      description,
      originalPrice,
      salePrice,
    } = productInfo;

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

    const imageUrls = [];
    for (const file of files) {
      const url = await upload(file, "product");
      imageUrls.push(url);
    }

    const formattedSizes = sizes.map((size) => ({
      size_id: sizeOptions?.find((opt) => opt.name === size.size_id)?._id || "",
      stock: size.stock,
    }));

    mutation.mutate({
      ...productInfo,
      image_url: imageUrls,
      sizes: formattedSizes,
    });
  };

  const subCategories = subCategoryMap[productInfo.mainCategory] || [];

  return (
    <div className="add-product">
      <div className="content">
        <h2>Thêm Sản Phẩm Mới</h2>
        <hr />
        <div className="form">
          <div className="form-section">
            <h3>Thông tin cơ bản</h3>
            <div className="form-group">
              <label>Tên Sản Phẩm</label>
              <input
                type="text"
                placeholder="Nhập tên sản phẩm"
                value={productInfo.nameProduct}
                onChange={(e) => handleChange(e, "nameProduct")}
              />
            </div>
            <div className="form-group">
              <label>Mô Tả Ngắn</label>
              <textarea
                placeholder="Nhập mô tả ngắn"
                value={productInfo.descriptionShort}
                onChange={(e) => handleChange(e, "descriptionShort")}
              />
            </div>
            <div className="form-group">
              <label>Mô Tả Chi Tiết</label>
              <textarea
                className="large-textarea"
                placeholder="Nhập mô tả chi tiết"
                value={productInfo.description}
                onChange={(e) => handleChange(e, "description")}
              />
            </div>
          </div>

          <div className="form-section">
            <h3>Giá và Tồn kho</h3>
            <div className="form-row">
              <div className="form-group">
                <label>Giá Gốc (VND)</label>
                <input
                  type="number"
                  placeholder="Nhập giá gốc"
                  value={productInfo.originalPrice}
                  onChange={(e) => handleChange(e, "originalPrice")}
                />
              </div>
              <div className="form-group">
                <label>Phần Trăm Giảm Giá (%)</label>
                <input
                  type="number"
                  placeholder="Nhập phần trăm giảm giá"
                  value={productInfo.salePercentage}
                  onChange={(e) => handleChange(e, "salePercentage")}
                />
              </div>
              <div className="form-group">
                <label>Tổng Số Lượng Tồn Kho</label>
                <input
                  type="number"
                  placeholder="Nhập tổng số lượng tồn kho"
                  value={productInfo.stock_quantity}
                  onChange={(e) => handleChange(e, "stock_quantity")}
                />
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3>Phân loại</h3>
            <div className="form-row">
              <div className="form-group">
                <label>Giới Tính</label>
                <select
                  value={productInfo.gender}
                  onChange={(e) => handleChange(e, "gender")}
                >
                  <option value="Men">Nam</option>
                  <option value="Women">Nữ</option>
                  <option value="Kids">Kids</option>
                  <option value="Unisex">Unisex</option>
                </select>
              </div>
              <div className="form-group">
                <label>Danh Mục Chính</label>
                <select
                  value={productInfo.mainCategory}
                  onChange={(e) => handleChange(e, "mainCategory")}
                >
                  <option value="Topwear">Topwear</option>
                  <option value="Bottomwear">Bottomwear</option>
                  <option value="OnePiece">OnePiece</option>
                  <option value="Footwear">Footwear</option>
                  <option value="Accessories">Accessories</option>
                  <option value="Underwear">Underwear</option>
                  <option value="Sportswear">Sportswear</option>
                  <option value="Sleepwear">Sleepwear</option>
                  <option value="Swimwear">Swimwear</option>
                </select>
              </div>
            </div>
            <div className="form-group">
              <label>Danh Mục Phụ</label>
              <div className="subcategory-grid">
                {subCategories.map((subCat) => (
                  <label key={subCat} className="subcategory-item">
                    <input
                      type="checkbox"
                      checked={productInfo.subCategory.includes(subCat)}
                      onChange={() => handleSubCategoryChange(subCat)}
                    />
                    <span>{subCat}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3>Hình ảnh</h3>
            <div className="form-group">
              <label>Hình Ảnh Sản Phẩm</label>
              <input type="file" multiple onChange={handleFileChange} />
              {files.length > 0 && (
                <div className="file-preview">
                  {imagePreviews.map((preview, index) => (
                    <div key={index} className="image-preview-item">
                      <img src={preview} alt={`Preview ${index}`} />
                      <span>{files[index].name}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="form-section">
            <h3>Kích thước</h3>
            {sizeOptions.map((size, index) => (
              <div key={index} className="size-row">
                <div className="form-group">
                  <label>Kích Thước</label>
                  <select
                    value={size.id}
                    onChange={(e) =>
                      handleSizeChange(index, "size_id", e.target.value)
                    }
                  >
                    {sizeOptions?.map((option) => (
                      <option key={option.id} value={option.name}>
                        {option.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Số Lượng</label>
                  <input
                    type="number"
                    placeholder="Số lượng"
                    value={size.stock}
                    onChange={(e) =>
                      handleSizeChange(index, "stock", e.target.value)
                    }
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="form-actions">
            <button
              className="btn btn-primary"
              onClick={handleConfirm}
              disabled={mutation.isLoading}
            >
              {mutation.isLoading ? "Đang xử lý..." : "Xác Nhận"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
