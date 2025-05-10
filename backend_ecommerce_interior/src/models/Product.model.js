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
        // Topwear
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

        // Bottomwear
        "Jeans",
        "Trousers",
        "Shorts",
        "Skirt",
        "Leggings",
        "Joggers",

        // OnePiece
        "Dress",
        "Jumpsuit",
        "Overalls",

        // Footwear
        "Sneakers",
        "Loafers",
        "Boots",
        "Sandals",
        "Heels",

        // Accessories
        "Hat",
        "Cap",
        "Belt",
        "Scarf",
        "Gloves",
        "Bag",
        "Sunglasses",
        "Watch",
        "Jewelry",

        // Underwear
        "Underwear",

        // Sportswear
        "Tracksuit",
        "Sportswear",

        // Sleepwear
        "Sleepwear",

        // Swimwear
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

// Index cho tìm kiếm và lọc
productSchema.index({ name: "text", mainCategory: 1, subCategory: 1 });

export default mongoose.model("Product", productSchema);
