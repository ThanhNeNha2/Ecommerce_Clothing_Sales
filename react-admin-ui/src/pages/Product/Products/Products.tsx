import "./Products.scss";
import { useQuery } from "@tanstack/react-query";
import { Alert, CircularProgress } from "@mui/material";
import { Link } from "react-router-dom";
import { apiCustom } from "../../../custom/customApi";

const Products = () => {
  const { isLoading, data, error } = useQuery({
    queryKey: ["allproduct"],
    queryFn: () => apiCustom.get("/product").then((res) => res.data),
  });

  // Ensure productsRows is always an array
  const productsRows = Array.isArray(data?.products)
    ? data?.products
    : data
    ? [data]
    : [];

  if (isLoading) {
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

  const handleDelete = (id: any) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      // Implement API call to delete product
      console.log(`Delete product with ID: ${id}`);
    }
  };

  return (
    <div className="products p-5">
      <div className="info flex justify-between items-center mb-5">
        <h1
          className="text-2xl font-bold "
          style={{
            color: "white",
          }}
        >
          Products
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
                      onClick={() => handleDelete(product.id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Products;
