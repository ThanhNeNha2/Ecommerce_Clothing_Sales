import mongoose from "mongoose";

const Category = mongoose.model("Category");

// CREATE CATEGORY
export const createCategory = async (req, res) => {
  try {
    const { name, parent_id, description } = req.body;

    // Kiểm tra parent_id nếu được cung cấp
    if (parent_id) {
      const parentCategory = await Category.findById(parent_id);
      if (!parentCategory) {
        return res.status(400).json({
          message: "Danh mục cha không tồn tại",
          idCode: 1,
        });
      }
    }

    // Kiểm tra name
    if (!name) {
      return res.status(400).json({
        message: "Tên danh mục là bắt buộc",
        idCode: 1,
      });
    }

    const category = await Category.create({
      name,
      parent_id: parent_id || null,
      description,
    });

    return res.status(200).json({
      message: "OK",
      idCode: 0,
      category,
    });
  } catch (error) {
    console.log("Error", error);
    return res.status(500).json({
      message: "Tạo danh mục không thành công",
      idCode: 1,
    });
  }
};

// GET ALL CATEGORIES
export const getAllCategories = async (req, res) => {
  try {
    const { page = 1, limit = 10, search } = req.query;

    const query = {};
    if (search) query.name = { $regex: search, $options: "i" };

    const categories = await Category.find(query)
      .populate("parent_id", "name")
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit))
      .lean();

    const formattedCategories = categories.map((category) => ({
      ...category,
      id: category._id,
      _id: undefined,
    }));

    const total = await Category.countDocuments(query);

    return res.status(200).json({
      message: "OK",
      idCode: 0,
      categories: formattedCategories,
      total,
      page: Number(page),
      pages: Math.ceil(total / Number(limit)),
    });
  } catch (error) {
    console.log("Error", error);
    return res.status(500).json({
      message: "Truy cập danh sách danh mục không thành công",
      idCode: 1,
    });
  }
};

// GET CATEGORY BY ID
export const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findOne({ _id: req.params.id }).populate(
      "parent_id",
      "name"
    );

    if (!category) {
      return res.status(404).json({
        message: "Danh mục không tồn tại",
        idCode: 1,
      });
    }

    return res.status(200).json({
      message: "OK",
      idCode: 0,
      category,
    });
  } catch (error) {
    console.log("Error", error);
    return res.status(500).json({
      message: "Truy cập danh mục không thành công",
      idCode: 1,
    });
  }
};

// UPDATE CATEGORY
export const updateCategory = async (req, res) => {
  try {
    const category = await Category.findOne({ _id: req.params.id });
    if (!category) {
      return res.status(404).json({
        message: "Danh mục không tồn tại",
        idCode: 1,
      });
    }

    const { parent_id, name } = req.body;

    // Kiểm tra parent_id nếu được cung cấp
    if (parent_id) {
      const parentCategory = await Category.findById(parent_id);
      if (!parentCategory) {
        return res.status(400).json({
          message: "Danh mục cha không tồn tại",
          idCode: 1,
        });
      }
    }

    // Kiểm tra name nếu được cung cấp
    if (name !== undefined && !name) {
      return res.status(400).json({
        message: "Tên danh mục không được rỗng",
        idCode: 1,
      });
    }

    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    ).populate("parent_id", "name");

    return res.status(200).json({
      message: "OK",
      idCode: 0,
      category: updatedCategory,
    });
  } catch (error) {
    console.log("Error", error);
    return res.status(500).json({
      message: "Cập nhật danh mục không thành công",
      idCode: 1,
    });
  }
};

// DELETE CATEGORY
export const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findOne({ _id: req.params.id });
    if (!category) {
      return res.status(404).json({
        message: "Danh mục không tồn tại",
        idCode: 1,
      });
    }

    // Kiểm tra xem danh mục có danh mục con hoặc sản phẩm liên quan không
    const childCategories = await Category.find({ parent_id: req.params.id });
    const products = await mongoose
      .model("Product")
      .find({ category_id: req.params.id });

    if (childCategories.length > 0 || products.length > 0) {
      return res.status(400).json({
        message:
          "Không thể xóa danh mục vì có danh mục con hoặc sản phẩm liên quan",
        idCode: 1,
      });
    }

    await Category.findByIdAndDelete(req.params.id);

    return res.status(200).json({
      message: "Xóa danh mục thành công",
      idCode: 0,
    });
  } catch (error) {
    console.log("Error", error);
    return res.status(500).json({
      message: "Xóa danh mục không thành công",
      idCode: 1,
    });
  }
};
