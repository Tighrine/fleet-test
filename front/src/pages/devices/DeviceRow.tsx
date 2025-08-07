import { Box, IconButton, TableCell, TableRow } from "@mui/material";
import EditIcon from "@mui/icons-material/EditOutlined";
import DeleteIcon from "@mui/icons-material/DeleteOutline";
import type { Device } from "../../shapes/device";

type Props = {
  filteredDevices: Device[];
  setSelectedDevice: (device: Device | null) => void;
  setAddDeviceDialogOpen: (open: boolean) => void;
  handleDeleteDevice: (id: string) => void;
};

function DeviceRow(props: Props) {
  const {
    filteredDevices,
    setSelectedDevice,
    setAddDeviceDialogOpen,
    handleDeleteDevice,
  } = props;

  return (
    <>
      {filteredDevices.map((device) => (
        <TableRow
          key={device.id}
          sx={{
            "&:not(:last-child)": {
              borderBottom: "1px solid #e0e0e0",
            },
            "& td, & th": { border: 0 },
          }}
        >
          <TableCell component="th" scope="row">
            {device.name}
          </TableCell>
          <TableCell>{device.type}</TableCell>
          <TableCell>{device.owner?.name ?? "Unassigned"}</TableCell>
          <TableCell>
            <Box sx={{ display: "flex", gap: 1 }}>
              <IconButton
                size="small"
                aria-label="edit"
                onClick={() => {
                  setSelectedDevice(device);
                  setAddDeviceDialogOpen(true);
                }}
              >
                <EditIcon fontSize="small" />
              </IconButton>
              <IconButton
                size="small"
                aria-label="delete"
                onClick={() => handleDeleteDevice(device.id!)}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Box>
          </TableCell>
        </TableRow>
      ))}
    </>
  );
}

export default DeviceRow;
