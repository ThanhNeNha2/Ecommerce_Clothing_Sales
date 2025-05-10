import { GridColDef } from "@mui/x-data-grid";
import DataTable from "../../components/dataTable/DataTable";
import "./Blogs.scss";
import { useQuery } from "@tanstack/react-query";
import { apiCustom } from "../../custom/customApi";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { CircularProgress, Alert } from "@mui/material";

const Posts = () => {
  const { isLoading, data, error } = useQuery({
    queryKey: ["allblog"],
    queryFn: () => apiCustom.get("/blog").then((res) => res.data),
  });

  const blogsRows = data?.blogs || [];

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "img",
      headerName: "ImagePost",
      width: 100,
      renderCell: (params) => {
        return (
          <img
            className="imgPost"
            src={params.row.imgMainBlog || "/noavatar.png"}
            alt=""
          />
        );
      },
    },
    {
      field: "titleBlog",
      type: "string",
      headerName: "Title Blog",
      width: 250,
    },
    {
      field: "descripShort",
      type: "string",
      headerName: "Description Short",
      width: 350,
    },
    {
      field: "description",
      type: "string",
      headerName: "Description",
      width: 200,
      renderCell: (params) => {
        // Hiển thị tóm tắt hoặc cắt bớt nội dung HTML
        const plainText =
          params.row.description.replace(/<[^>]+>/g, "").substring(0, 50) +
          "...";
        return <span>{plainText}</span>;
      },
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
        <h1>Blog</h1>
        <Link to={"/addBlog"}>
          <button className="BlogButton">Add New Blog</button>
        </Link>
      </div>
      <DataTable
        slug="blog"
        columns={columns}
        rows={blogsRows}
        infoSearch="titleBlog"
      />
    </div>
  );
};

export default Posts;
