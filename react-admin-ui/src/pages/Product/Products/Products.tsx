import "./Products.scss";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Alert, CircularProgress } from "@mui/material";
import { Link } from "react-router-dom";
import { apiCustom } from "../../../custom/customApi";
import DeleteConfirmationModal from "../DeleteConfirmationModal/DeleteConfirmationModal";
import { useState } from "react";

const Products = () => {
  const queryClient = useQueryClient();
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<{
    id: string;
    name: string;
    image: string;
  } | null>(null);

  // State cho pagination
  const [limit, setLimit] = useState(32);
  const [allProducts, setAllProducts] = useState<any[]>([]);

  const { isLoading, data, error, isFetching } = useQuery({
    queryKey: ["allproduct", limit],
    queryFn: () =>
      apiCustom.get(`/product?limit=${limit}`).then((res) => res.data),
    onSuccess: (newData) => {
      // Cập nhật danh sách sản phẩm
      const products = Array.isArray(newData?.products)
        ? newData?.products
        : newData
        ? [newData]
        : [];
      setAllProducts(products);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => apiCustom.delete(`/product/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allproduct"] });
      setDeleteModalOpen(false);
    },
    onError: (error) => {
      alert(`Failed to delete product: ${error}`);
      setDeleteModalOpen(false);
    },
  });

  const productsRows = allProducts;
  const totalProducts = data?.total || 0;
  const hasMoreProducts = productsRows.length < totalProducts;

  if (isLoading && limit === 32) {
    return (
      <div className="flex justify-center p-5">
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return (
      <Alert severity="error" className="m-5">
        Error loading products: {error.message}
      </Alert>
    );
  }

  const handleDelete = (id: string, name: string, image: string) => {
    setSelectedProduct({ id, name, image });
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (selectedProduct) {
      deleteMutation.mutate(selectedProduct.id);
    }
  };

  const handleLoadMore = () => {
    setLimit((prevLimit) => prevLimit + 32);
  };

  return (
    <div className="products p-5">
      <div className="info flex justify-between items-center mb-5">
        <h1
          className="text-2xl font-bold"
          style={{
            color: "white",
          }}
        >
          Products ({productsRows.length}/{totalProducts})
        </h1>
        <Link to="/addProduct">
          <button className="add-product-button">Add New Product</button>
        </Link>
      </div>

      <div className="table-container">
        <table className="product-table">
          <thead>
            <tr className="table-header">
              <th className="table-cell">Image</th>
              <th className="table-cell">Name</th>
              <th className="table-cell">Category</th>
              <th className="table-cell">Price</th>
              <th className="table-cell">Stock</th>
              <th className="table-cell">Actions</th>
            </tr>
          </thead>
          <tbody>
            {productsRows.map((product) => (
              <tr key={product.id} className="table-row">
                <td className="table-cell">
                  <img
                    src={product.image_url[0]}
                    alt={product.nameProduct}
                    className="product-image"
                  />
                </td>
                <td className="table-cell">{product.nameProduct}</td>
                <td className="table-cell">
                  {product.mainCategory} ({product.subCategory.join(", ")})
                </td>
                <td className="table-cell">
                  {product.salePrice.toLocaleString()} VNĐ
                  {product.salePercentage > 0 && (
                    <span className="discount-text">
                      (-{product.salePercentage}%)
                    </span>
                  )}
                </td>
                <td className="table-cell">{product.stock_quantity}</td>
                <td className="table-cell">
                  <div className="action-buttons">
                    <Link to={`/UpdateProduct/${product.id}`}>
                      <button className="edit-button">Edit</button>
                    </Link>
                    <button
                      className="delete-button"
                      onClick={() =>
                        handleDelete(
                          product.id,
                          product.nameProduct,
                          product.image_url[0]
                        )
                      }
                      disabled={deleteMutation.isLoading}
                    >
                      {deleteMutation.isLoading ? "Deleting..." : "Delete"}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Load More Button */}
      {hasMoreProducts && (
        <div className="flex justify-center mt-5">
          <button
            className="load-more-button"
            onClick={handleLoadMore}
            disabled={isFetching}
            style={{
              padding: "12px 24px",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: isFetching ? "not-allowed" : "pointer",
              fontSize: "16px",
              fontWeight: "500",
              opacity: isFetching ? 0.7 : 1,
              transition: "all 0.3s ease",
            }}
          >
            {isFetching ? (
              <div className="flex items-center gap-2">
                <CircularProgress size={16} color="inherit" />
                Đang tải...
              </div>
            ) : (
              `Xem thêm sản phẩm (${
                totalProducts - productsRows.length
              } còn lại)`
            )}
          </button>
        </div>
      )}

      <DeleteConfirmationModal
        open={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        productName={selectedProduct?.name || ""}
        productImage={selectedProduct?.image || ""}
      />
    </div>
  );
};

export default Products;
