import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Box,
  IconButton,
  Tooltip,
} from "@mui/material";
import EditIcon from "@mui/icons-material/EditOutlined";
import DeleteIcon from "@mui/icons-material/DeleteOutline";
import type { Device } from "../../shapes/device";

type DeviceCardProps = {
  device: Device;
  onEdit: (device: Device) => void;
  onDelete: (id: string) => void;
};

export const DeviceCard = ({ device, onEdit, onDelete }: DeviceCardProps) => {
  const ownerName =
    typeof device.owner === "object" && device.owner && "name" in device.owner
      ? device.owner.name
      : "Unassigned";

  return (
    <Card variant="outlined">
      <CardContent sx={{ pb: 1 }}>
        <Typography variant="h6" component="div" fontWeight="bold">
          {device.name}
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1.5 }}>
          <Typography variant="body2" color="text.secondary">
            Type
          </Typography>
          <Typography variant="body2">{device.type}</Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 0.5 }}>
          <Typography variant="body2" color="text.secondary">
            Owner
          </Typography>
          <Typography variant="body2">{ownerName}</Typography>
        </Box>
      </CardContent>
      <CardActions sx={{ justifyContent: "flex-end", pt: 0 }}>
        <Tooltip title="Edit">
          <IconButton size="small" onClick={() => onEdit(device)}>
            <EditIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton size="small" onClick={() => onDelete(device.id!)}>
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </CardActions>
    </Card>
  );
};
