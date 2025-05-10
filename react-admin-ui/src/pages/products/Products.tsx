import { useState } from "react";
import "./Products.scss";
import DataTable from "../../components/dataTable/DataTable";
import Add from "../../components/add/Add";
import { GridColDef } from "@mui/x-data-grid";
import { products } from "../../data";
import { useQuery } from "@tanstack/react-query";
import { Alert, CircularProgress } from "@mui/material";
import { apiCustom } from "../../custom/customApi";
import { Link } from "react-router-dom";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "image_url",
    headerName: "Image",
    width: 100,
    renderCell: (params) => {
      return <img src={params.row.image_url[0] || "/noavatar.png"} alt="" />;
    },
  },
  {
    field: "nameProduct",
    type: "string",
    headerName: "Name Product",
    width: 250,
  },
  {
    field: "mainCategory",
    headerName: "Category",
    width: 150,
    type: "string",
  },
  {
    field: "salePrice",
    type: "string",
    headerName: "Price",
    width: 100,
    renderCell: (params) => {
      return <span>{params.value} $</span>;
    },
  },
  {
    field: "gender",
    headerName: "Gender",
    type: "string",
    width: 150,
  },
  {
    field: "sizes",
    headerName: "Size",
    width: 200,
    renderCell: (params) => {
      const sizes = Array.isArray(params.row.sizes) ? params.row.sizes : [];
      if (sizes.length === 0) return <span>Không có kích thước</span>;
      console.log(" check thong tin params.row.sizes ", sizes);
      return (
        <div>
          {sizes.map((sizeObj: any, index: any) => (
            <span key={index}>
              {sizeObj.size_id.name || "N/A"} ({sizeObj.stock || "0"})
              {index < sizes.length - 1 ? " | " : ""}
            </span>
          ))}
        </div>
      );
    },
  },
];

const Products = () => {
  const { isLoading, data, error } = useQuery({
    queryKey: ["allproduct"],
    queryFn: () => apiCustom.get("/product").then((res) => res.data),
  });

  // Kiểm tra và đảm bảo productsRows luôn là mảng
  const productsRows = Array.isArray(data?.products)
    ? data?.products
    : data
    ? [data]
    : [];

  console.log("check productsRows ", productsRows);

  if (isLoading) {
    return (
      <div
        style={{ display: "flex", justifyContent: "center", padding: "20px" }}
      >
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return (
      <Alert severity="error" style={{ margin: "20px" }}>
        Lỗi khi tải danh sách sản phẩm: {(error as Error).message}
      </Alert>
    );
  }

  return (
    <div className="products">
      <div className="info">
        <h1>Products</h1>
        <Link to={"/addProduct"}>
          <button className="ProductButton">Add New Products</button>{" "}
        </Link>
      </div>
      <DataTable
        slug="products"
        columns={columns}
        rows={productsRows}
        infoSearch="name"
      />
    </div>
  );
};

export default Products;
