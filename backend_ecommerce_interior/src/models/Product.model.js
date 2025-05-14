import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    nameProduct: {
      type: String,
      required: true,
      trim: true,
    },
    descriptionShort: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    originalPrice: {
      type: Number,
      required: true,
      min: 0,
    },
    salePrice: {
      type: Number,
      min: 0,
    },
    gender: {
      type: String,
      enum: ["Men", "Women", "Unisex", "Kids"],
      required: true,
    },
    mainCategory: {
      type: String,
      enum: [
        "Topwear",
        "Bottomwear",
        "OnePiece",
        "Footwear",
        "Accessories",
        "Underwear",
        "Sportswear",
        "Sleepwear",
        "Swimwear",
      ],
      required: true,
    },
    subCategory: {
      type: [String],
      enum: [
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
        "Jeans",
        "Trousers",
        "Shorts",
        "Skirt",
        "Leggings",
        "Joggers",
        "Dress",
        "Jumpsuit",
        "Overalls",
        "Sneakers",
        "Loafers",
        "Boots",
        "Sandals",
        "Heels",
        "Hat",
        "Cap",
        "Belt",
        "Scarf",
        "Gloves",
        "Bag",
        "Sunglasses",
        "Watch",
        "Jewelry",
        "Underwear",
        "Tracksuit",
        "Sportswear",
        "Sleepwear",
        "Swimwear",
      ],
      required: true,
    },
    salePercentage: {
      type: Number,
      default: 0,
      enum: [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50],
      min: 0,
      max: 100,
    },
    stock_quantity: {
      type: Number,
      required: true,
      min: 0,
    },
    image_url: {
      type: [String],
      required: true,
    },
    sizes: [
      {
        size_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Size",
          required: true,
        },
        stock: {
          type: Number,
          required: true,
          min: 0,
        },
      },
    ],
  },
  { timestamps: true }
);

// Pre-save hook để kiểm tra và cập nhật salePrice, salePercentage
productSchema.pre("save", function (next) {
  // Nếu salePrice không được cung cấp, đặt bằng originalPrice
  if (this.salePrice === undefined || this.salePrice === null) {
    this.salePrice = this.originalPrice;
  }

  // Kiểm tra salePrice <= originalPrice
  if (this.salePrice > this.originalPrice) {
    return next(
      new Error("Sale price must be less than or equal to original price")
    );
  }

  // Tính salePercentage
  this.salePercentage =
    Math.round(
      ((this.originalPrice - this.salePrice) / this.originalPrice) * 100
    ) || 0;

  // Đảm bảo salePercentage nằm trong enum
  if (
    ![0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50].includes(this.salePercentage)
  ) {
    this.salePercentage =
      Math.min(
        ...[0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50].filter(
          (val) => val >= this.salePercentage
        )
      ) || 0;
  }

  // Kiểm tra stock_quantity khớp với tổng stock trong sizes
  const totalStock = this.sizes.reduce((sum, size) => sum + size.stock, 0);
  if (totalStock !== this.stock_quantity) {
    return next(new Error("Total stock in sizes must match stock_quantity"));
  }

  next();
});

// Index cho tìm kiếm và lọc
productSchema.index({
  nameProduct: "text",
  mainCategory: 1,
  subCategory: 1,
  gender: 1,
  salePercentage: 1,
  salePrice: 1,
});

export default mongoose.model("Product", productSchema);
