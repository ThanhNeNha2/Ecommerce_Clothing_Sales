import React, { useState, useEffect } from "react";
import "./UpdateProduct.scss"; // Reusing the same styles
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { apiCustom } from "../../../custom/customApi";
import upload from "../../../utils/upload";

interface ProductInfo {
  nameProduct: string;
  descriptionShort: string;
  description: string;
  originalPrice: number;
  salePercentage: number;
  stock_quantity: number;
  gender: "Men" | "Women" | "Unisex" | "Kids";
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
  id: string;
  name: string;
}

const UpdateProduct: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [productInfo, setProductInfo] = useState<ProductInfo>({
    nameProduct: "",
    descriptionShort: "",
    description: "",
    originalPrice: 0,
    salePercentage: 0,
    stock_quantity: 0,
    gender: "Men",
    mainCategory: "Topwear",
    subCategory: [],
    image_url: [],
  });

  const [files, setFiles] = useState<File[]>([]);
  const [sizes, setSizes] = useState<Size[]>([{ size_id: "", stock: 0 }]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  // Fetch size options
  const { data: sizeOptions } = useQuery<SizeOption[]>({
    queryKey: ["sizes"],
    queryFn: () => apiCustom.get("/size").then((res) => res.data.sizes),
    initialData: [
      { id: "681b33349dfe7219f4170319", name: "XS" },
      { id: "681b33349dfe7219f417031a", name: "S" },
      { id: "681b33349dfe7219f417031b", name: "M" },
      { id: "681b33349dfe7219f417031c", name: "XXL" },
    ],
  });

  // Fetch product data
  const { data: productData, isLoading } = useQuery({
    queryKey: ["product", id],
    queryFn: () =>
      apiCustom.get(`/product/${id}`).then((res) => res.data.product),
    enabled: !!id,
  });

  useEffect(() => {
    if (productData) {
      setProductInfo({
        nameProduct: productData.nameProduct,
        descriptionShort: productData.descriptionShort,
        description: productData.description,
        originalPrice: productData.originalPrice,
        salePercentage: productData.salePercentage,
        stock_quantity: productData.stock_quantity,
        gender: productData.gender,
        mainCategory: productData.mainCategory,
        subCategory: productData.subCategory,
        image_url: productData.image_url,
      });
      setSizes(productData.sizes || [{ size_id: "", stock: 0 }]);
      setImagePreviews(productData.image_url || []);
    }
  }, [productData]);

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

  const handleAddSize = () => {
    setSizes([...sizes, { size_id: "", stock: 0 }]);
  };

  const handleRemoveSize = (index: number) => {
    if (sizes.length > 1) {
      setSizes(sizes.filter((_, i) => i !== index));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      setFiles(selectedFiles);

      const newPreviews = selectedFiles
        .map((file) =>
          file.type.startsWith("image/") ? URL.createObjectURL(file) : null
        )
        .filter((preview): preview is string => preview !== null);
      setImagePreviews([...productInfo.image_url, ...newPreviews]);
    }
  };

  const handleRemoveImage = (index: number) => {
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
    setProductInfo((prev) => ({
      ...prev,
      image_url: prev.image_url.filter((_, i) => i !== index),
    }));
    setFiles((prev) =>
      prev.filter((_, i) => i !== index - productInfo.image_url.length)
    );
  };

  const mutation = useMutation({
    mutationFn: (info: ProductInfo & { sizes: Size[] }) => {
      return apiCustom.put(`/product/${id}`, info);
    },
    onSuccess: () => {
      toast.success("🎉 Sản phẩm đã được cập nhật thành công!");
      navigate("/products");
    },
    onError: (error) => {
      toast.error("🚨 Lỗi khi cập nhật sản phẩm. Vui lòng thử lại!");
    },
  });

  const handleConfirm = async () => {
    const { originalPrice } = productInfo;

    if (!originalPrice) {
      toast.error("⚠️ Vui lòng điền đầy đủ thông tin giá gốc!");
      return;
    }

    const imageUrls = [...productInfo.image_url];
    for (const file of files) {
      const url = await upload(file, "product");
      imageUrls.push(url);
    }

    const formattedSizes = sizes
      .filter((size) => size.size_id)
      .map((size) => ({
        size_id: size.size_id,
        stock: size.stock,
      }));

    mutation.mutate({
      ...productInfo,
      image_url: imageUrls,
      sizes: formattedSizes,
    });
  };

  const subCategories = subCategoryMap[productInfo.mainCategory] || [];

  if (isLoading) {
    return <div>Đang tải...</div>;
  }

  return (
    <div className="add-product">
      <div className="content">
        <h2>Cập Nhật Sản Phẩm</h2>
        <hr />
        <div className="form">
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
            </div>
          </div>

          <div className="form-section">
            <h3>Phân loại</h3>
            <div className="form-row">
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
              {imagePreviews.length > 0 && (
                <div className="file-preview">
                  {imagePreviews.map((preview, index) => (
                    <div key={index} className="image-preview-item">
                      <img src={preview} alt={`Preview ${index}`} />
                      <button
                        className="btn btn-remove"
                        onClick={() => handleRemoveImage(index)}
                      >
                        Xóa
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="form-section">
            <h3>Kích thước</h3>
            {sizes.map((size, index) => (
              <div key={index} className="size-row">
                <div className="form-group">
                  <label>Kích Thước</label>
                  <select
                    value={size.size_id}
                    onChange={(e) =>
                      handleSizeChange(index, "size_id", e.target.value)
                    }
                  >
                    <option value="">Chọn kích thước</option>
                    {sizeOptions?.map((option) => (
                      <option key={option.id} value={option.id}>
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
                {sizes.length > 1 && (
                  <button
                    className="btn btn-remove"
                    onClick={() => handleRemoveSize(index)}
                  >
                    Xóa
                  </button>
                )}
              </div>
            ))}
            <button className="btn btn-add-size" onClick={handleAddSize}>
              Thêm Size
            </button>
          </div>

          <div className="form-actions">
            <button
              className="btn btn-primary"
              onClick={handleConfirm}
              disabled={mutation.isLoading}
            >
              {mutation.isLoading ? "Đang xử lý..." : "Cập Nhật"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProduct;
