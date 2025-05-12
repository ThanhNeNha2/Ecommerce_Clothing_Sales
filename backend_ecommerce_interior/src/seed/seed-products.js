const sizes = [
  { id: "681b33349dfe7219f4170319", name: "XS" },
  { id: "681b33349dfe7219f417031a", name: "S" },
  { id: "681b33349dfe7219f417031b", name: "M" },
  { id: "681b33349dfe7219f417031c", name: "L" },
  { id: "681b33349dfe7219f417031d", name: "XL" },
  { id: "681b33349dfe7219f417031e", name: "XXL" },
  { id: "681b33349dfe7219f417031f", name: "XXXL" },
  { id: "681b33349dfe7219f4170320", name: "Free Size" },
  { id: "681b33349dfe7219f4170321", name: "28" },
  { id: "681b33349dfe7219f4170322", name: "30" },
  { id: "681b33349dfe7219f4170323", name: "32" },
  { id: "681b33349dfe7219f4170324", name: "34" },
  { id: "681b33349dfe7219f4170325", name: "36" },
];

const imageUrls = [
  "https://i.pinimg.com/736x/62/f0/10/62f010dc8252da0dc949fb30179b5089.jpg",
  "https://i.pinimg.com/736x/09/a8/4b/09a84b2931d51baf3c2ff52a4d027c5e.jpg",
  "https://i.pinimg.com/736x/9f/f0/2c/9ff02c1a3374114b38f59e6678825c3b.jpg",
  "https://i.pinimg.com/736x/43/31/0e/43310e4d60f5dfd48459ccc8ede02b17.jpg",
  "https://i.pinimg.com/736x/c5/7f/95/c57f95143b8555222275a738ef119f8a.jpg",
  "https://i.pinimg.com/736x/24/8b/ac/248bac6e5d0bfa896d5f7ba6f468f00e.jpg",
  "https://i.pinimg.com/736x/42/ad/5c/42ad5c8006535a4a3eeb9f3556f52e94.jpg",
];

const mainCategories = [
  "Topwear",
  "Bottomwear",
  "OnePiece",
  "Footwear",
  "Accessories",
  "Underwear",
  "Sportswear",
  "Sleepwear",
  "Swimwear",
];
const subCategoriesByMain = {
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
const genders = ["Men", "Women", "Unisex", "Kids"];
const salePercentages = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50];
const descriptions = [
  "Chất liệu cao cấp, phong cách hiện đại.",
  "Thiết kế thời thượng, dễ phối đồ.",
  "Thoáng mát, phù hợp mọi dịp.",
  "Bền bỉ, thích hợp thời tiết lạnh.",
  "Năng động, trẻ trung.",
];
const shortDescriptions = [
  "Thời trang, tiện lợi.",
  "Đơn giản, nổi bật.",
  "Chất lượng, thoải mái.",
  "Phong cách, dễ phối.",
  "Thời thượng, cá tính.",
];

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function getRandomElements(array, count) {
  const shuffled = shuffleArray([...array]);
  let result = [];
  while (result.length < count) {
    result = result.concat(shuffled);
  }
  return result.slice(0, count);
}

const products = [];
for (let i = 0; i < 50; i++) {
  const mainCategory =
    mainCategories[getRandomInt(0, mainCategories.length - 1)];
  const subCategory = getRandomElements(
    subCategoriesByMain[mainCategory],
    getRandomInt(1, 3)
  );
  const sizeCount = getRandomInt(2, 4);
  const selectedSizes = getRandomElements(sizes, sizeCount);
  const stockQuantities = selectedSizes.map(() => getRandomInt(5, 20));
  const totalStock = stockQuantities.reduce((sum, qty) => sum + qty, 0);
  const originalPrice = getRandomInt(100000, 2000000);
  const salePercentage =
    salePercentages[getRandomInt(0, salePercentages.length - 1)];
  const salePrice = Math.floor(
    originalPrice - (originalPrice * salePercentage) / 100
  );

  products.push({
    nameProduct: `${subCategory[0]} ${mainCategory} ${i + 1}`,
    description: `${
      descriptions[getRandomInt(0, descriptions.length - 1)]
    } Phù hợp cho ${mainCategory.toLowerCase()}.`,
    descriptionShort:
      shortDescriptions[getRandomInt(0, shortDescriptions.length - 1)],
    originalPrice: originalPrice,
    salePercentage: salePercentage,
    salePrice: salePrice, // Thêm trường salePrice
    stock_quantity: totalStock,
    gender: genders[getRandomInt(0, genders.length - 1)],
    mainCategory: mainCategory,
    subCategory: subCategory,
    image_url: getRandomElements(imageUrls, 5),
    sizes: selectedSizes.map((size, index) => ({
      size_id: size.id,
      stock: stockQuantities[index],
    })),
  });
}

db.products.insertMany(products);
