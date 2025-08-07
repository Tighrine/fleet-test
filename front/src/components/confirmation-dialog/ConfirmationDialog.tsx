import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material";
import { closeConfirmDialog, useConfirmationDialog } from "./store";
import Button from "../Button";

const ConfirmationDialog = () => {
  const confirmation = useConfirmationDialog();

  const handleClose = () => {
    closeConfirmDialog();
  };

  const handleConfirm = () => {
    confirmation?.confirm?.();
    closeConfirmDialog();
  };

  return (
    <Dialog open={Boolean(confirmation?.message)}>
      <DialogTitle
        variant="h6"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box>{confirmation?.title}</Box>
        <IconButton onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Typography variant="body1">
          {confirmation?.message ?? "Please confirm your action."}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleConfirm} name="Confirm" />
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;
