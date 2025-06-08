import React, { useState, useEffect, useRef } from "react";
import "./AddProduct.scss";
import { useMutation, useQuery } from "@tanstack/react-query";

import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Editor } from "@tinymce/tinymce-react";
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
  size_id: string; // size_id sẽ lưu _id từ sizeOptions
  stock: number;
}

interface SizeOption {
  id: string;
  name: string;
}

const AddProduct: React.FC = () => {
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
  const editorRef = useRef<any>(null);

  const handleEditorChange = (content: string) => {
    let updatedContent = content.replace(
      /<a[^>]*href=["'](.*?\.(jpg|jpeg|png|gif))["'][^>]*>.*?<\/a>/gi,
      '<img src="$1" alt="Image" height="370" width="490" />'
    );

    updatedContent = updatedContent.replace(
      /https?:\/\/.*?\.(jpg|jpeg|png|gif)(?![^<>]*>)/gi,
      '<img src="$1" alt="Image" height="370" width="490" />'
    );

    updatedContent = updatedContent.replace(
      /<img(?![^>]*height="[^"]*")[^>]*>/gi,
      (match) => match.replace(/>/, ' height="370" width="490" />')
    );

    updatedContent = updatedContent.replace(
      /<img[^>]*height="[^"]*"[^>]*width="[^"]*"[^>]*>/gi,
      (match) =>
        match
          .replace(/height="[^"]*"/, 'height="370"')
          .replace(/width="[^"]*"/, 'width="490"')
    );

    setProductInfo((prev) => ({ ...prev, description: updatedContent }));
  };

  const { data: sizeOptions } = useQuery<SizeOption[]>({
    queryKey: ["sizes"],
    queryFn: () => apiCustom.get("/size").then((res) => res.data.sizes),
    initialData: [
      { id: "681b33349dfe7219f4170319", name: "XS" },
      { id: "681b33349dfe7219f417031a", name: "S" },
      { id: "681b33349dfe7219f417031b", name: "M" },
      { id: "681b33349dfe7219f417031c", name: "XXL" }, // Thêm XXL vào dữ liệu mẫu
    ],
  });

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
      newSizes[index].size_id = value; // Lưu _id từ dropdown
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
    mutationFn: (info: ProductInfo & { sizes: Size[] }) => {
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
    const { nameProduct, descriptionShort, description, originalPrice } =
      productInfo;

    if (
      !nameProduct.trim() ||
      !descriptionShort.trim() ||
      !description.trim() ||
      !originalPrice
    ) {
      toast.error("⚠️ Vui lòng điền đầy đủ thông tin tất cả các trường!");
      return;
    }

    const imageUrls: string[] = [];
    for (const file of files) {
      const url = await upload(file, "product");
      imageUrls.push(url);
    }

    // Đảm bảo size_id là _id từ sizeOptions
    const formattedSizes = sizes
      .filter((size) => size.size_id) // Loại bỏ size không có size_id
      .map((size) => ({
        size_id: size.size_id, // size_id đã là _id từ dropdown
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
              <Editor
                apiKey="slkxn3po6ill32zhn1nahxuyjlhmvh226r9uawyyc4iam4tu"
                onInit={(_evt, editor) => (editorRef.current = editor)}
                initialValue="<p>Please enter the product information.</p>"
                init={{
                  height: 500,
                  menubar: false,
                  plugins: [
                    "advlist",
                    "lists",
                    "link",
                    "image",
                    "charmap",
                    "preview",
                    "anchor",
                    "searchreplace",
                    "visualblocks",
                    "code",
                    "fullscreen",
                    "insertdatetime",
                    "media",
                    "table",
                    "help",
                    "wordcount",
                    "paste",
                  ],
                  toolbar:
                    "undo redo | blocks | " +
                    "bold italic forecolor | alignleft aligncenter " +
                    "alignright alignjustify | bullist numlist outdent indent | " +
                    "removeformat | help | image",
                  content_style:
                    "body { font-family:Helvetica,Arial,sans-serif; font-size:14px } " +
                    "img { height: 370px !important; width: 490px !important; }",
                  paste_preprocess: (plugin, args) => {
                    args.content = args.content.replace(
                      /https?:\/\/.*?\.(jpg|jpeg|png|gif)/gi,
                      (match) =>
                        `<img src="${match}" alt="Image" height="370" width="490" />`
                    );
                  },
                  link_assume_external_targets: true,
                  link_context_toolbar: false,
                  extended_valid_elements: "img[src|alt|height|width]",
                }}
                onEditorChange={handleEditorChange}
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
              {mutation.isLoading ? "Đang xử lý..." : "Xác Nhận"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
