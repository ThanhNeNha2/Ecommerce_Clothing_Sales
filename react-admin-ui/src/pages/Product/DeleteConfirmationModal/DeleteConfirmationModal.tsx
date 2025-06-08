import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@mui/material";
import "./DeleteConfirmationModal.scss";

interface DeleteConfirmationModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  productName: string;
  productImage: string;
}

const DeleteConfirmationModal = ({
  open,
  onClose,
  onConfirm,
  productName,
  productImage,
}: DeleteConfirmationModalProps) => {
  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="delete-dialog-title">
      <DialogTitle id="delete-dialog-title">Confirm Delete</DialogTitle>
      <DialogContent>
        <div className="delete-confirmation-content">
          <p>Are you sure you want to delete this product?</p>
          <div className="product-info">
            <img
              src={productImage}
              alt={productName}
              className="modal-product-image"
            />
            <p className="product-name">{productName}</p>
          </div>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={onConfirm} color="error" variant="contained">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteConfirmationModal;
