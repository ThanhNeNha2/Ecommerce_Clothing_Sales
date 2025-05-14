import mongoose from "mongoose";

import Size from "../models/Size.model";
import Product from "../models/Product.model";
// Kiểm tra subCategory hợp lệ với mainCategory
const validateCategory = (mainCategory, subCategory) => {
  const categoryMap = {
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

  // Đảm bảo subCategory là 1 string hoặc mảng string
  if (Array.isArray(subCategory)) {
    return subCategory.every((item) =>
      categoryMap[mainCategory]?.includes(item)
    );
  } else {
    return categoryMap[mainCategory]?.includes(subCategory);
  }
};

// CREATE PRODUCT
export const createProduct = async (req, res) => {
  try {
    const {
      nameProduct,
      description,
      descriptionShort,
      originalPrice,
      salePercentage,
      stock_quantity,
      image_url,
      sizes,
      gender,
      mainCategory,
      subCategory,
    } = req.body;

    // Kiểm tra mainCategory và subCategory
    if (!validateCategory(mainCategory, subCategory)) {
      return res.status(400).json({
        message: `subCategory "${subCategory}" không hợp lệ với mainCategory "${mainCategory}"`,
        idCode: 1,
      });
    }

    // Kiểm tra sizes
    if (sizes && sizes.length > 0) {
      for (const size of sizes) {
        const sizeExists = await Size.findById(size.size_id);
        if (!sizeExists) {
          return res.status(400).json({
            message: `Kích cỡ ${size.size_id} không tồn tại`,
            idCode: 1,
          });
        }
      }
    }

    // Kiểm tra image_url
    if (!image_url || image_url.length === 0) {
      return res.status(400).json({
        message: "Cần ít nhất một hình ảnh sản phẩm",
        idCode: 1,
      });
    }

    // Kiểm tra originalPrice
    if (originalPrice < 0) {
      return res.status(400).json({
        message: "Giá gốc không được âm",
        idCode: 1,
      });
    }

    // Tính salePrice
    const salePrice = Math.round(originalPrice * (1 - salePercentage / 100));

    const product = await Product.create({
      nameProduct,
      description,
      descriptionShort,
      originalPrice,
      salePrice,
      salePercentage,
      stock_quantity,
      image_url,
      sizes,
      gender,
      mainCategory,
      subCategory,
    });

    return res.status(200).json({
      message: "OK",
      idCode: 0,
      product,
    });
  } catch (error) {
    console.log("Error", error);
    return res.status(500).json({
      message: "Tạo sản phẩm không thành công",
      idCode: 1,
    });
  }
};

// GET ALL PRODUCTS
// export const getAllProducts = async (req, res) => {
//   try {
//     const {
//       page = 1,
//       limit = 10,
//       search,
//       gender,
//       mainCategory,
//       subCategory,
//     } = req.query;

//     const query = {};
//     if (search) query.$text = { $search: search };
//     if (gender) query.gender = gender;
//     if (mainCategory) query.mainCategory = mainCategory;
//     if (subCategory) query.subCategory = subCategory;

//     const products = await Product.find(query)
//       .populate("sizes.size_id", "name")
//       .skip((Number(page) - 1) * Number(limit))
//       .limit(Number(limit))
//       .lean();

//     const formattedProducts = products.map((product) => ({
//       ...product,
//       id: product._id,
//       _id: undefined,
//     }));

//     const total = await Product.countDocuments(query);

//     return res.status(200).json({
//       message: "OK",
//       idCode: 0,
//       products: formattedProducts,
//       total,
//       page: Number(page),
//       pages: Math.ceil(total / Number(limit)),
//     });
//   } catch (error) {
//     console.log("Error", error);
//     return res.status(500).json({
//       message: "Truy cập danh sách sản phẩm không thành công",
//       idCode: 1,
//     });
//   }
// };
export const getAllProducts = async (req, res) => {
  try {
    const {
      limit = 32,
      search,
      gender,
      mainCategory,
      subCategory,
      minPrice,
      maxPrice,
      minSalePercentage,
      maxSalePercentage,
      isNew,
      isOnSale,
      sortByPrice,
    } = req.query;

    // Xây dựng query
    const query = {};

    // Tìm kiếm theo tên sản phẩm (dùng $regex để hỗ trợ tiếng Việt)
    if (search) {
      query.nameProduct = { $regex: search, $options: "i" }; // Không phân biệt hoa thường
    }

    // Lọc theo gender
    if (gender) {
      query.gender = gender;
    }

    // Lọc theo mainCategory
    if (mainCategory) {
      query.mainCategory = mainCategory;
    }

    // Lọc theo subCategory (subCategory là mảng, dùng $in)
    if (subCategory) {
      query.subCategory = { $in: [subCategory] };
    }

    // Lọc theo salePrice
    if (minPrice || maxPrice) {
      query.salePrice = {};
      if (minPrice) query.salePrice.$gte = Number(minPrice);
      if (maxPrice) query.salePrice.$lte = Number(maxPrice);
    }

    // Lọc theo salePercentage
    if (minSalePercentage || maxSalePercentage) {
      query.salePercentage = {};
      if (minSalePercentage)
        query.salePercentage.$gte = Number(minSalePercentage);
      if (maxSalePercentage)
        query.salePercentage.$lte = Number(maxSalePercentage);
    }

    // Lọc sản phẩm mới nhất (salePercentage = 0)
    if (isNew === "true") {
      query.salePercentage = 0;
    }

    // Lọc sản phẩm đang giảm giá (salePercentage > 0)
    if (isOnSale === "true") {
      query.salePercentage = { $gt: 0 };
    }

    // Xây dựng sort  sort options
    const sortOptions = {};
    if (sortByPrice) {
      if (sortByPrice === "asc") {
        sortOptions.salePrice = 1; // Từ bé đến lớn
      } else if (sortByPrice === "desc") {
        sortOptions.salePrice = -1; // Từ lớn đến bé
      }
    }

    // Truy vấn sản phẩm
    const products = await Product.find(query)
      .populate("sizes.size_id", "name")
      .sort(sortOptions)
      .limit(Number(limit))
      .lean();

    // Định dạng lại kết quả
    const formattedProducts = products.map((product) => ({
      ...product,
      id: product._id,
      _id: undefined,
    }));

    // Tổng số sản phẩm
    const total = await Product.countDocuments(query);

    return res.status(200).json({
      message: "OK",
      idCode: 0,
      products: formattedProducts,
      total,
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({
      message: "Truy cập danh sách sản phẩm không thành công",
      idCode: 1,
    });
  }
};
// GET PRODUCT BY ID
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findOne({ _id: req.params.id }).populate(
      "sizes.size_id",
      "nameProduct"
    );

    if (!product) {
      return res.status(404).json({
        message: "Sản phẩm không tồn tại",
        idCode: 1,
      });
    }

    return res.status(200).json({
      message: "OK",
      idCode: 0,
      product,
    });
  } catch (error) {
    console.log("Error", error);
    return res.status(500).json({
      message: "Truy cập sản phẩm không thành công",
      idCode: 1,
    });
  }
};

// UPDATE PRODUCT
export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findOne({ _id: req.params.id });
    if (!product) {
      return res.status(404).json({
        message: "Sản phẩm không tồn tại",
        idCode: 1,
      });
    }

    const {
      sizes,
      originalPrice,
      salePercentage,
      image_url,
      mainCategory,
      subCategory,
    } = req.body;

    // Kiểm tra mainCategory và subCategory nếu được cung cấp
    if (
      mainCategory &&
      subCategory &&
      !validateCategory(mainCategory, subCategory)
    ) {
      return res.status(400).json({
        message: `subCategory "${subCategory}" không hợp lệ với mainCategory "${mainCategory}"`,
        idCode: 1,
      });
    }

    // Kiểm tra sizes nếu được cung cấp
    if (sizes && sizes.length > 0) {
      for (const size of sizes) {
        const sizeExists = await Size.findById(size.size_id);
        if (!sizeExists) {
          return res.status(400).json({
            message: `Kích cỡ ${size.size_id} không tồn tại`,
            idCode: 1,
          });
        }
      }
    }

    // Kiểm tra image_url nếu được cung cấp
    if (image_url && image_url.length === 0) {
      return res.status(400).json({
        message: "Cần ít nhất một hình ảnh sản phẩm",
        idCode: 1,
      });
    }

    // Tính salePrice nếu originalPrice và salePercentage được cung cấp
    let salePrice = product.salePrice;
    if (originalPrice !== undefined && salePercentage !== undefined) {
      salePrice = originalPrice * (1 - salePercentage / 100);
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { ...req.body, salePrice },
      {
        new: true,
        runValidators: true,
      }
    ).populate("sizes.size_id", "nameProduct");

    return res.status(200).json({
      message: "OK",
      idCode: 0,
      product: updatedProduct,
    });
  } catch (error) {
    console.log("Error", error);
    return res.status(500).json({
      message: "Cập nhật sản phẩm không thành công",
      idCode: 1,
    });
  }
};

// DELETE PRODUCT
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findOne({ _id: req.params.id });
    if (!product) {
      return res.status(404).json({
        message: "Sản phẩm không tồn tại",
        idCode: 1,
      });
    }

    await Product.findByIdAndDelete(req.params.id);

    return res.status(200).json({
      message: "Xóa sản phẩm thành công",
      idCode: 0,
    });
  } catch (error) {
    console.log("Error", error);
    return res.status(500).json({
      message: "Xóa sản phẩm không thành công",
      idCode: 1,
    });
  }
};
