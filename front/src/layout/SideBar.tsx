import { Drawer, List, Typography, Box } from "@mui/material";
import PeopleAltIcon from "@mui/icons-material/PeopleAltOutlined";
import ComputerIcon from "@mui/icons-material/Computer";
import { useLocation } from "react-router-dom";
import NavLink from "../components/NavLink";

type DrawerProps = {
  drawerWidth: string;
  mobileOpen: boolean;
  handleDrawerToggle: () => void;
};

const DrawerContent = () => {
  const location = useLocation();
  const links = [
    { to: "/employees", label: "Employees", icon: <PeopleAltIcon /> },
    { to: "/devices", label: "Devices", icon: <ComputerIcon /> },
  ];

  return (
    <>
      <Box sx={{ p: 2 }}>
        <Typography variant="h5" fontWeight="bold">
          Dashboard
        </Typography>
      </Box>
      <List>
        {links.map(({ to, label, icon }) => (
          <NavLink
            key={to}
            to={to}
            icon={icon}
            selected={location.pathname.startsWith(to)}
          >
            {label}
          </NavLink>
        ))}
      </List>
    </>
  );
};

export default function Sidebar({
  drawerWidth,
  mobileOpen,
  handleDrawerToggle,
}: DrawerProps) {
  return (
    <Box
      component="nav"
      sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
    >
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        }}
      >
        <DrawerContent />
      </Drawer>

      {/* Drawer pour Desktop (permanent) */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", md: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
            borderRight: "1px solid #e0e0e0",
            backgroundColor: "#fafafa",
          },
        }}
        open
      >
        <DrawerContent />
      </Drawer>
    </Box>
  );
}
