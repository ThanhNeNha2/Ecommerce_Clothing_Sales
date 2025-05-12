import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import CoverImg from "../../components/Cover/CoverImg";
import Products from "../../components/Products/Products";
import Quality from "../../components/Quality/Quality";
import Footer from "../../components/Footer/Footer";
import { IoList } from "react-icons/io5";
import { TbGridDots } from "react-icons/tb";
import { CgScreenWide } from "react-icons/cg";
import { instance } from "../../Custom/Axios/AxiosCustom";

const ListProduct = () => {
  const [addProduct, setAddProduct] = useState(32);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State cho các bộ lọc
  const [filters, setFilters] = useState({
    search: "", // Tìm kiếm theo nameProduct
    category: "", // Lọc theo mainCategory hoặc subCategory
    gender: "", // Lọc theo gender
    minPrice: "", // Lọc theo giá
    maxPrice: "",
    onSale: false, // Lọc sản phẩm có giảm giá
  });

  // State cho sắp xếp và số lượng hiển thị
  const [sort, setSort] = useState("Default");
  const [perPage, setPerPage] = useState(16);

  // Lấy tất cả sản phẩm từ API
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await instance.get(`/product?limit=${addProduct}`);
      console.log("check thong tin san pham ", res.data.products);
      setProducts(res.data.products || []);
      setFilteredProducts(res.data.products || []);
    } catch (err) {
      console.error("Lỗi khi lấy sản phẩm:", err);
      setError("Không thể tải sản phẩm. Vui lòng thử lại sau.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchProducts();
  }, [addProduct]);

  // Xử lý lọc và sắp xếp
  useEffect(() => {
    let filtered = [...products];

    // Tìm kiếm theo nameProduct
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter((product) =>
        product.nameProduct?.toLowerCase().includes(searchLower)
      );
    }

    // Lọc theo mainCategory hoặc subCategory
    if (filters.category) {
      filtered = filtered.filter(
        (product) =>
          product.mainCategory === filters.category ||
          product.subCategory.includes(filters.category)
      );
    }

    // Lọc theo gender
    if (filters.gender) {
      filtered = filtered.filter(
        (product) => product.gender === filters.gender
      );
    }

    // Lọc theo giá (tính giá sau giảm giá nếu có)
    if (filters.minPrice) {
      filtered = filtered.filter((product) => {
        const priceAfterDiscount = product.salePercentage
          ? product.originalPrice * (1 - product.salePercentage / 100)
          : product.originalPrice;
        return priceAfterDiscount >= Number(filters.minPrice);
      });
    }
    if (filters.maxPrice) {
      filtered = filtered.filter((product) => {
        const priceAfterDiscount = product.salePercentage
          ? product.originalPrice * (1 - product.salePercentage / 100)
          : product.originalPrice;
        return priceAfterDiscount <= Number(filters.maxPrice);
      });
    }

    // Lọc sản phẩm có giảm giá
    if (filters.onSale) {
      filtered = filtered.filter(
        (product) => product.salePercentage && product.salePercentage > 0
      );
    }

    // Sắp xếp
    if (sort === "Price: Low to High") {
      filtered.sort((a, b) => {
        const priceA = a.salePercentage
          ? a.originalPrice * (1 - a.salePercentage / 100)
          : a.originalPrice;
        const priceB = b.salePercentage
          ? b.originalPrice * (1 - b.salePercentage / 100)
          : b.originalPrice;
        return priceA - priceB;
      });
    } else if (sort === "Price: High to Low") {
      filtered.sort((a, b) => {
        const priceA = a.salePercentage
          ? a.originalPrice * (1 - a.salePercentage / 100)
          : a.originalPrice;
        const priceB = b.salePercentage
          ? b.originalPrice * (1 - b.salePercentage / 100)
          : b.originalPrice;
        return priceB - priceA;
      });
    } else if (sort === "Newest") {
      // Giả định API có trường createdAt
      filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    setFilteredProducts(filtered);
  }, [filters, sort, products]);

  // Xử lý thay đổi bộ lọc
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  // Xử lý tìm kiếm
  const handleSearch = (e) => {
    e.preventDefault();
    setFilters((prev) => ({ ...prev, search: e.target.search.value }));
  };

  // Xử lý thay đổi số lượng hiển thị trên mỗi trang
  const handlePerPageChange = (e) => {
    setPerPage(Number(e.target.value));
    setAddProduct(Number(e.target.value));
  };

  if (loading) return <div className="text-center py-8">Đang tải...</div>;
  if (error)
    return <div className="text-center py-8 text-red-500">{error}</div>;

  return (
    <div>
      <Header />
      <CoverImg namePage={"Shop"} />
      <div
        className="px-6 sm:px-10 md:px-20 pb-6 mb-10"
        style={{ background: "#F9F1E7" }}
      >
        {/* Top Section */}
        <div className="w-full h-16 flex items-center justify-between border-b border-gray-200">
          {/* Left Side */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 text-gray-700 hover:text-gray-900">
                <IoList className="text-xl" />
                <span className="font-poppins font-medium">Filter</span>
              </button>
              <div className="flex items-center gap-3 text-gray-700">
                <TbGridDots className="text-xl" />
                <CgScreenWide className="text-xl" />
              </div>
            </div>
            <hr className="h-8 border-l border-gray-300 mx-4" />
            <span className="font-poppins text-sm text-gray-600">
              Showing 1-{Math.min(perPage, filteredProducts.length)} of{" "}
              {filteredProducts.length} results
            </span>
          </div>
          {/* Right Side */}
          <div className="flex items-center gap-4">
            <select
              value={perPage}
              onChange={handlePerPageChange}
              className="border border-gray-300 px-3 py-1.5 rounded-md font-poppins font-medium text-gray-700 hover:bg-gray-50"
            >
              <option value="16">16 per page</option>
              <option value="32">32 per page</option>
              <option value="48">48 per page</option>
            </select>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="border border-gray-300 px-3 py-1.5 rounded-md font-poppins font-medium text-gray-700 hover:bg-gray-50"
            >
              <option value="Default">Default</option>
              <option value="Price: Low to High">Price: Low to High</option>
              <option value="Price: High to Low">Price: High to Low</option>
              <option value="Newest">Newest</option>
            </select>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-6">
          <div className="flex flex-col items-center py-3">
            <span className="font-poppins font-medium text-lg text-gray-800">
              Find Your Style
            </span>
          </div>
          <form
            onSubmit={handleSearch}
            className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6"
          >
            <div className="flex flex-col">
              <span className="text-sm text-gray-600">Search by Name</span>
              <input
                type="text"
                name="search"
                placeholder="Tìm kiếm sản phẩm..."
                className="border border-gray-300 py-1.5 px-3 rounded-md text-sm text-gray-700 hover:bg-gray-50"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-gray-600">Category</span>
              <select
                name="category"
                value={filters.category}
                onChange={handleFilterChange}
                className="border border-gray-300 py-1.5 px-3 rounded-md text-sm text-gray-700 hover:bg-gray-50"
              >
                <option value="">All</option>
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
            <div className="flex flex-col">
              <span className="text-sm text-gray-600">Gender</span>
              <select
                name="gender"
                value={filters.gender}
                onChange={handleFilterChange}
                className="border border-gray-300 py-1.5 px-3 rounded-md text-sm text-gray-700 hover:bg-gray-50"
              >
                <option value="">All</option>
                <option value="Men">Men</option>
                <option value="Women">Women</option>
                <option value="Kids">Kids</option>
                <option value="Unisex">Unisex</option>
              </select>
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-gray-600">Min Price</span>
              <input
                type="number"
                name="minPrice"
                value={filters.minPrice}
                onChange={handleFilterChange}
                placeholder="0"
                className="border border-gray-300 py-1.5 px-3 rounded-md text-sm text-gray-700 hover:bg-gray-50"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-gray-600">Max Price</span>
              <input
                type="number"
                name="maxPrice"
                value={filters.maxPrice}
                onChange={handleFilterChange}
                placeholder="1000000"
                className="border border-gray-300 py-1.5 px-3 rounded-md text-sm text-gray-700 hover:bg-gray-50"
              />
            </div>
            <div className="flex items-end">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="onSale"
                  checked={filters.onSale}
                  onChange={(e) =>
                    setFilters((prev) => ({
                      ...prev,
                      onSale: e.target.checked,
                    }))
                  }
                />
                <span className="text-sm text-gray-600">On Sale</span>
              </label>
            </div>
            <div className="flex items-end">
              <button
                type="submit"
                className="px-6 py-2 bg-[#B88E2F] text-white font-medium rounded-md hover:bg-[#a47926] transition-colors duration-200"
              >
                Search
              </button>
            </div>
          </form>
        </div>
      </div>
      <Products value={perPage} products={filteredProducts.slice(0, perPage)} />
      <div className="flex justify-center items-center mt-7">
        <button
          className="py-2 px-5 bg-white border border-colorMain text-colorMain text-base font-medium font-poppins hover:bg-gray-200 rounded"
          onClick={() => setAddProduct(addProduct + 32)}
          disabled={filteredProducts.length <= perPage}
        >
          Show More
        </button>
      </div>
      <Quality />
      <Footer />
    </div>
  );
};

export default ListProduct;
