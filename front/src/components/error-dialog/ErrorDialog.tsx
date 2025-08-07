import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import {
  Box,
  Button,
  Collapse,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material";
import { closeErrorDialog, useErrorDialog } from "./store";

const ErrorDialog = () => {
  const error = useErrorDialog();
  const [showDetails, setShowDetails] = useState(false);

  const handleToggleDetails = () => {
    setShowDetails((prev) => !prev);
  };

  const handleClose = () => {
    closeErrorDialog();
  };

  return (
    <Dialog open={Boolean(error?.errorMessage)}>
      <DialogTitle
        variant="h6"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box>{error?.title}</Box>
        <IconButton onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Typography variant="body1">
          {error?.errorMessage ??
            "An error occurred with the performed action."}
        </Typography>

        <Box sx={{ mt: 2 }}>
          <Button
            variant="contained"
            onClick={handleToggleDetails}
            sx={{
              backgroundColor: "#e3e6fd",
              color: "#000",
              textTransform: "none",
              borderRadius: "8px",
              "&:hover": { backgroundColor: "#c5ccfa" },
            }}
          >
            {showDetails ? "Hide details" : "View details"}
          </Button>
        </Box>

        <Collapse in={showDetails}>
          <Box
            sx={{
              mt: 2,
              p: 2,
              bgcolor: "#f0f1f6",
              borderRadius: "8px",
              maxHeight: 150,
              overflowY: "auto",
            }}
          >
            <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 1 }}>
              Error details
            </Typography>
            <Typography variant="body2" sx={{ whiteSpace: "pre-wrap" }}>
              {error?.errorDetailMessage}
            </Typography>
          </Box>
        </Collapse>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleClose}
          sx={{
            textTransform: "none",
            color: "#616161",
          }}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ErrorDialog;
