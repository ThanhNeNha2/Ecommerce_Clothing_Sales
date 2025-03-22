import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import "./dataTable.scss";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiCustom } from "../../custom/customApi";
// import { useMutation, useQueryClient } from "@tanstack/react-query";

type Props = {
  columns: GridColDef[];
  rows: object[];
  slug: string;
  infoSearch: string;
};

const DataTable = (props: Props) => {
  console.log("check ", props);

  // TEST THE API

  const [showModal, setShowModal] = useState(false);
  const [selectedInfo, setSelectedInfo] = useState("");
  const [getIdDelete, setGetIdDelete] = useState("");

  const handleDelete = (info: string, id: string) => {
    setSelectedInfo(info);
    setGetIdDelete(id);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (id: string) => {
      return apiCustom.delete(`/${props.slug}/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries([`all${props.slug}`]);
    },
  });
  const handleConfirm = (id: string) => {
    mutation.mutate(id);
    setShowModal(false);
  };

  const actionColumn = {
    field: "action",
    headerName: "Action",
    width: 100,
    renderCell: (params: any) => {
      // thong tin search
      const search = props.infoSearch;

      return (
        <div className="action">
          <Link to={`/${props.slug}/${params.row.id}`}>
            <img src="/view.svg" alt="" />
          </Link>
          <div
            className="delete"
            onClick={() => handleDelete(params.row[search], params.row.id)}
          >
            <img src="/delete.svg" alt="" />
          </div>
        </div>
      );
    },
  };
  return (
    <div className="dataTable">
      <DataGrid
        className="dataGrid"
        rows={props.rows}
        columns={[...props.columns, actionColumn]}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        slots={{ toolbar: GridToolbar }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
        disableColumnFilter
        disableDensitySelector
        disableColumnSelector
      />{" "}
      {showModal && (
        <div className="modalOverlay">
          <div className="contentP">
            <h2>Delete User</h2>
            <hr />
            <p>
              Bạn chắc chắn muốn xóa {props.slug} với {props.infoSearch} là:{" "}
              {selectedInfo}
            </p>
            <div className="btnP">
              <button className="pCancel" onClick={handleCloseModal}>
                Cancel
              </button>
              <button
                className="pConfirm"
                onClick={() => {
                  handleConfirm(getIdDelete);
                }}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataTable;
