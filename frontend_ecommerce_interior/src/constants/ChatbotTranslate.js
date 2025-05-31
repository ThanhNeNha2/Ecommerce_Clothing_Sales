// faqConfig.js
const faqConfig = {
  patterns: [
    {
      examples: [
        "sản phẩm dưới {price}",
        "tìm sản phẩm nhỏ hơn {price}",
        "hàng giá dưới {price} đồng",
      ],
      keys: {
        maxPrice: "{price}",
      },
    },
    {
      examples: [
        "sản phẩm trên {price}",
        "tìm sản phẩm lớn hơn {price}",
        "hàng giá trên {price} đồng",
      ],
      keys: {
        minPrice: "{price}",
      },
    },
    {
      examples: [
        "sản phẩm cho {gender}",
        "hàng dành cho {gender}",
        "tìm đồ cho {gender}",
      ],
      keys: {
        gender: "{gender}",
      },
    },
    {
      examples: [
        "loại {category}",
        "tìm sản phẩm loại {category}",
        "hàng thuộc loại {category}",
      ],
      keys: {
        mainCategory: "{category}",
      },
    },
    {
      examples: [
        "phụ loại {subCategory}",
        "tìm sản phẩm phụ loại {subCategory}",
        "hàng thuộc phụ loại {subCategory}",
      ],
      keys: {
        subCategory: "{subCategory}",
      },
    },
    {
      examples: [
        "sản phẩm từ {minPrice} đến {maxPrice} cho {gender} loại {category}",
        "tìm hàng giá từ {minPrice} đến {maxPrice} dành cho {gender} loại {category}",
        "đồ từ {minPrice} đến {maxPrice} cho {gender} thuộc loại {category}",
      ],
      keys: {
        minPrice: "{minPrice}",
        maxPrice: "{maxPrice}",
        gender: "{gender}",
        mainCategory: "{category}",
      },
    },
  ],
  translationMap: {
    gender: {
      nam: "Men",
      nữ: "Women",
      unisex: "Unisex",
      trẻ: "Kids",
      "trẻ em": "Kids",
    },
    mainCategory: {
      "áo trên": "Topwear",
      "quần dưới": "Bottomwear",
      "đồ liền thân": "OnePiece",
      "giày dép": "Footwear",
      "phụ kiện": "Accessories",
      "đồ lót": "Underwear",
      "đồ thể thao": "Sportswear",
      "đồ ngủ": "Sleepwear",
      "đồ bơi": "Swimwear",
    },
    subCategory: {
      "áo thun": "T-Shirt",
      áo: "Shirt",
      "áo polo": "Polo",
      "áo hoodie": "Hoodie",
      "áo len": "Sweater",
      "áo khoác": "Jacket",
      blazer: "Blazer",
      "áo ba lỗ": "Tank Top",
      "áo croptop": "Crop Top",
      "áo măng tô": "Coat",
      "áo khoác măng tô": "Trench Coat",
      "áo chống gió": "Windbreaker",
      "áo bomber": "Bomber Jacket",
      "áo khoác denim": "Denim Jacket",
      "quần jeans": "Jeans",
      "quần dài": "Trousers",
      "quần ngắn": "Shorts",
      váy: "Skirt",
      "quần legging": "Leggings",
      "quần jogger": "Joggers",
      đầm: "Dress",
      "đồ liền thân": "Jumpsuit",
      "quần yếm": "Overalls",
      "giày thể thao": "Sneakers",
      "giày lười": "Loafers",
      bốt: "Boots",
      sandal: "Sandals",
      "giày cao gót": "Heels",
      mũ: "Hat",
      "nón lưỡi trai": "Cap",
      "dây nịt": "Belt",
      khăn: "Scarf",
      "găng tay": "Gloves",
      túi: "Bag",
      "kính râm": "Sunglasses",
      "đồng hồ": "Watch",
      "trang sức": "Jewelry",
      "đồ lót": "Underwear",
      "bộ đồ thể thao": "Tracksuit",
      "đồ thể thao": "Sportswear",
      "đồ ngủ": "Sleepwear",
      "đồ bơi": "Swimwear",
    },
  },
};

// Hàm chuyển đổi từ tiếng Việt sang tiếng Anh
const translateToEnglish = (value, type) => {
  if (!value || !faqConfig.translationMap[type]) return value;
  return faqConfig.translationMap[value.toLowerCase()] || value;
};

export { faqConfig, translateToEnglish };
