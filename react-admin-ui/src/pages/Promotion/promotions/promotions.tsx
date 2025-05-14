import { GridColDef } from "@mui/x-data-grid";
import DataTable from "../../../components/dataTable/DataTable";
import "./promotions.scss";
import { useQuery } from "@tanstack/react-query";
import { apiCustom } from "../../../custom/customApi";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { CircularProgress, Alert } from "@mui/material";

const Promotions = () => {
  const { isLoading, data, error } = useQuery({
    queryKey: ["promotions"],
    queryFn: () => apiCustom.get("/promotions").then((res) => res.data),
  });

  const promotionsRows = data?.promotions || [];

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 200 },

    {
      field: "code",
      type: "string",
      headerName: "Name Code",
      width: 150,
    },
    {
      field: "discount_type",
      type: "string",
      headerName: "Discount type",
      align: "center", // canh giữa nội dung
      headerAlign: "center", // canh giữa tiêu đề cột
      width: 150,
    },
    {
      field: "discount_value",
      headerName: "Discount value",
      align: "center", // canh giữa nội dung
      headerAlign: "center", // canh giữa tiêu đề cột
      width: 150,
      renderCell: (params) => {
        const type = params.row.discount_type;
        const value = params.value;

        return <span>{type === "percentage" ? `${value}%` : `$${value}`}</span>;
      },
    },
    {
      field: "deadline",
      headerName: "Deadline",
      width: 250,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
        const start = new Date(params.row.start_date).toLocaleDateString(
          "vi-VN",
          {
            timeZone: "Asia/Ho_Chi_Minh",
          }
        );
        const end = new Date(params.row.end_date).toLocaleDateString("vi-VN", {
          timeZone: "Asia/Ho_Chi_Minh",
        });

        return `${start} - ${end}`;
      },
    },
    {
      field: "quantity",
      type: "string",
      align: "center", // canh giữa nội dung
      headerAlign: "center", // canh giữa tiêu đề cột
      headerName: "Quantity",
      width: 130,
    },
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
        Lỗi khi tải danh sách blog: {(error as Error).message}
      </Alert>
    );
  }

  return (
    <div className="posts">
      <div className="info">
        <h1>Promotion</h1>
        <Link to={"/addPromotion"}>
          <button className="BlogButton">Add New Promotion</button>
        </Link>
      </div>
      <DataTable
        slug="blog"
        columns={columns}
        rows={promotionsRows}
        infoSearch="titleBlog"
      />
    </div>
  );
};

export default Promotions;
