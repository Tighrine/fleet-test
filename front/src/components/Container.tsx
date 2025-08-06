import { Typography, Paper } from "@mui/material";
import type { PropsWithChildren } from "react";

type ContainerProps = PropsWithChildren & {
  title: string;
};

function Container({ title, children }: ContainerProps) {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 4,
        borderRadius: "12px",
        border: "1px solid rgba(240, 240, 241, 255)",
      }}
    >
      {/* SECTION TITRE */}
      <Typography variant="h4" component="h1" fontWeight="bold" gutterBottom>
        {title}
      </Typography>
      {children}
    </Paper>
  );
}

export default Container;
