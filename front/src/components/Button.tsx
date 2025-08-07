import { Button as MuiButton, type ButtonProps } from "@mui/material";

function Button({ onClick, name, startIcon, endIcon, ...props }: ButtonProps) {
  return (
    <MuiButton
      {...props}
      variant="contained"
      startIcon={startIcon}
      endIcon={endIcon}
      disableElevation
      onClick={onClick}
      sx={{
        backgroundColor: "black",
        color: "white",
        borderRadius: "8px",
        textTransform: "none",
        px: 3,
        py: 1,
        "&:hover": {
          backgroundColor: "#333",
        },
      }}
    >
      {name}
    </MuiButton>
  );
}

export default Button;
