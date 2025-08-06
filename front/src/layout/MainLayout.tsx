import { Box, Paper } from "@mui/material";
import Sidebar from "./SideBar";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <Paper sx={{ display: "flex", height: "100vh" }}>
      <Sidebar />
      <Box sx={{ flex: 1, padding: "1rem" }} component="main">
        <Outlet />
      </Box>
    </Paper>
  );
};

export default MainLayout;
