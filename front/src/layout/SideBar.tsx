import { Drawer, List, Typography, Box } from "@mui/material";
import PeopleAltIcon from "@mui/icons-material/PeopleAltOutlined";
import ComputerIcon from "@mui/icons-material/Computer";
import { useLocation } from "react-router-dom";
import NavLink from "../components/NavLink";

const drawerWidth = "17em";

export default function Sidebar() {
  const location = useLocation();
  const links = [
    { to: "/employees", label: "Employees", icon: <PeopleAltIcon /> },
    { to: "/devices", label: "Devices", icon: <ComputerIcon /> },
  ];
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: "border-box",
          backgroundColor: "#fafafa",
        },
        borderRight: "1px solid rgba(240,240,241,255)",
      }}
    >
      <Box sx={{ padding: 1 }}>
        <Typography variant="h4" fontWeight="599">
          Dashboard
        </Typography>
      </Box>

      <List>
        {links.map(({ to, label, icon }) => (
          <NavLink
            key={to}
            to={to}
            icon={icon}
            selected={location.pathname === to}
          >
            {label}
          </NavLink>
        ))}
      </List>
    </Drawer>
  );
}
