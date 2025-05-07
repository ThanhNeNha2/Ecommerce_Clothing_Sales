import mongoose from "mongoose";

const Product = mongoose.model("Product");
const Category = mongoose.model("Category");
const Size = mongoose.model("Size");

// CREATE PRODUCT
export const createProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      originalPrice,
      salePercentage,
      stock_quantity,
      category_id,
      image_url,
      sizes,
    } = req.body;

    // Kiểm tra category_id
    const category = await Category.findById(category_id);
    if (!category) {
      return res.status(400).json({
        message: "Danh mục không tồn tại",
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

    // Kiểm tra salePercentage
    const validPercentages = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50];
    if (!validPercentages.includes(salePercentage)) {
      return res.status(400).json({
        message:
          "Phần trăm giảm giá phải là một trong: " +
          validPercentages.join(", "),
        idCode: 1,
      });
    }

    // Tính salePrice
    const salePrice = originalPrice * (1 - salePercentage / 100);

    const product = await Product.create({
      name,
      description,
      originalPrice,
      salePrice,
      salePercentage,
      stock_quantity,
      category_id,
      image_url,
      sizes,
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
export const getAllProducts = async (req, res) => {
  try {
    const { page = 1, limit = 10, search, category } = req.query;

    const query = {};
    if (search) query.name = { $regex: search, $options: "i" };
    if (category) query.category_id = category;

    const products = await Product.find(query)
      .populate("category_id", "name")
      .populate("sizes.size_id", "name")
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit))
      .lean();

    const formattedProducts = products.map((product) => ({
      ...product,
      id: product._id,
      _id: undefined,
    }));

    const total = await Product.countDocuments(query);

    return res.status(200).json({
      message: "OK",
      idCode: 0,
      products: formattedProducts,
      total,
      page: Number(page),
      pages: Math.ceil(total / Number(limit)),
    });
  } catch (error) {
    console.log("Error", error);
    return res.status(500).json({
      message: "Truy cập danh sách sản phẩm không thành công",
      idCode: 1,
    });
  }
};

// GET PRODUCT BY ID
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findOne({ _id: req.params.id })
      .populate("category_id", "name")
      .populate("sizes.size_id", "name");

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
      category_id,
      sizes,
      originalPrice,
      salePrice,
      salePercentage,
      image_url,
    } = req.body;

    // Kiểm tra category_id nếu được cung cấp
    if (category_id) {
      const category = await Category.findById(category_id);
      if (!category) {
        return res.status(400).json({
          message: "Danh mục không tồn tại",
          idCode: 1,
        });
      }
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

    // Kiểm tra salePrice <= originalPrice nếu được cung cấp
    if (originalPrice !== undefined && salePrice !== undefined) {
      if (salePrice > originalPrice) {
        return res.status(400).json({
          message: "Giá giảm không được lớn hơn giá gốc",
          idCode: 1,
        });
      }
    }

    // Kiểm tra salePercentage nếu được cung cấp
    if (
      salePercentage !== undefined &&
      originalPrice !== undefined &&
      salePrice !== undefined
    ) {
      const calculatedPercentage = Math.round(
        ((originalPrice - salePrice) / originalPrice) * 100
      );
      if (calculatedPercentage !== salePercentage) {
        return res.status(400).json({
          message: "Phần trăm giảm giá không khớp với giá gốc và giá giảm",
          idCode: 1,
        });
      }
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    )
      .populate("category_id", "name")
      .populate("sizes.size_id", "name");

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
