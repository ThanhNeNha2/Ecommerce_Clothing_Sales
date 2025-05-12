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
  const [addProduct, setAddProduct] = useState(32); // Số lượng sản phẩm tối đa từ API
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // State cho các bộ lọc
  const [filters, setFilters] = useState({
    search: "",
    category: "",
    gender: "",
    minPrice: "",
    maxPrice: "",
    isOnSale: false,
  });

  // State cho sắp xếp và số lượng hiển thị
  const [sort, setSort] = useState("Default");
  const [perPage, setPerPage] = useState(16);

  // Lấy tất cả sản phẩm từ API
  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const queryParams = new URLSearchParams();

      if (filters.search) queryParams.append("search", filters.search);
      if (filters.category) queryParams.append("category", filters.category);
      if (filters.gender) queryParams.append("gender", filters.gender);
      if (filters.minPrice) queryParams.append("minPrice", filters.minPrice);
      if (filters.maxPrice) queryParams.append("maxPrice", filters.maxPrice);
      if (filters.isOnSale) queryParams.append("isOnSale", true);
      queryParams.append("limit", addProduct);

      // Thêm tham số sắp xếp nếu API hỗ trợ
      if (sort !== "Default") {
        if (sort === "Price: Low to High")
          queryParams.append("sort", "price_asc");
        if (sort === "Price: High to Low")
          queryParams.append("sort", "price_desc");
        if (sort === "Newest") queryParams.append("sort", "created_at_desc");
      }

      const res = await instance.get(`/product?${queryParams.toString()}`);

      console.log("Dữ liệu sản phẩm từ API:", res.data.products);
      setProducts(res.data.products || []);
      setFilteredProducts(res.data.products || []);
    } catch (err) {
      console.error("Lỗi khi lấy sản phẩm:", err);
      setError("Không thể tải sản phẩm. Vui lòng thử lại sau.");
    } finally {
      setLoading(false);
    }
  };

  // Xử lý tìm kiếm
  const handleSearch = (e) => {
    e.preventDefault();
    fetchProducts();
  };

  // Xử lý thay đổi bộ lọc
  const handleFilterChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Xử lý thay đổi số lượng hiển thị trên mỗi trang
  const handlePerPageChange = (e) => {
    setPerPage(Number(e.target.value));
  };

  useEffect(() => {
    fetchProducts();
  }, []);
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
                onChange={handleFilterChange}
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
                  name="isOnSale"
                  checked={filters.isOnSale}
                  onChange={(e) =>
                    setFilters((prev) => ({
                      ...prev,
                      isOnSale: e.target.checked,
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

      {/* Hiển thị trạng thái tải và lỗi */}
      {loading && <div className="text-center py-4">Đang tải...</div>}
      {error && <div className="text-center py-4 text-red-500">{error}</div>}
      {!loading && !error && filteredProducts.length === 0 && (
        <div className="text-center py-4">Không tìm thấy sản phẩm nào.</div>
      )}

      <Products listProducts={products} />
      <div className="flex justify-center items-center mt-7">
        <button
          className="py-2 px-5 bg-white border border-colorMain text-colorMain text-base font-medium font-poppins hover:bg-gray-200 rounded"
          onClick={() => setAddProduct(addProduct + 32)}
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
