import { CircularProgress } from "@mui/material";
import Box from "@mui/material/Box";

function Loading() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 4,
      }}
    >
      <CircularProgress />
    </Box>
  );
}

export default Loading;
