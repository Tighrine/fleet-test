// Créez un nouveau fichier, par exemple : src/components/EmptyState.tsx

import React from "react";
import { Box, Typography } from "@mui/material";

interface EmptyStateProps {
  icon: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export const EmptyState = ({
  icon,
  title,
  description,
  action,
}: EmptyStateProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        p: 3,
        my: 5,
      }}
    >
      <Box
        sx={{
          color: "text.disabled",
          mb: 2,
        }}
      >
        {icon}
      </Box>

      <Typography variant="h6" fontWeight="bold" gutterBottom>
        {title}
      </Typography>

      {description && (
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      )}

      {action && <Box sx={{ mt: 3 }}>{action}</Box>}
    </Box>
  );
};
