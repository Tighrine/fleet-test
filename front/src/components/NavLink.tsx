import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { Link } from "react-router-dom";

type NavLinkProps = {
  to: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  selected?: boolean;
};

function NavLink({ to, children, icon, selected }: NavLinkProps) {
  return (
    <Link to={to} style={{ textDecoration: "none", color: "inherit" }}>
      <ListItemButton
        selected={selected}
        sx={{
          "&.Mui-selected": {
            backgroundColor: "#f4f4f5",
          },
          "&.Mui-focusVisible": {
            backgroundColor: "#f4f4f5",
          },
        }}
      >
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText>{children}</ListItemText>
      </ListItemButton>
    </Link>
  );
}

export default NavLink;
