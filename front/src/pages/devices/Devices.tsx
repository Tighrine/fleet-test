import { useCallback, useEffect, useState } from "react";
import { devicesType } from "../../shapes/device";
import type { Device } from "../../shapes/device";

import { useDeleteDevice, useDevices } from "../../hooks/useDevices";
import { useEmployees } from "../../hooks/useEmployees";

import Button from "../../components/Button";
import { UpsertDeviceDialog } from "./UpsertDeviceDialog";

import {
  Box,
  IconButton,
  MenuItem,
  Select,
  Stack,
  TextField,
  useMediaQuery,
  useTheme,
  TableCell,
  Table,
  TableHead,
  TableRow,
  TableContainer,
  Paper,
  TableBody,
  Typography,
} from "@mui/material";
import Loading from "../../components/Loading";
import Container from "../../components/Container";

import EditIcon from "@mui/icons-material/EditOutlined";
import DeleteIcon from "@mui/icons-material/DeleteOutline";
import AddIcon from "@mui/icons-material/Add";
import DevicesIcon from "@mui/icons-material/Devices";
import { DeviceCard } from "./DeviceCard";
import { EmptyState } from "../../components/EmptyState";
import { showConfirmDialog } from "../../components/confirmation-dialog/store";

function DeviceManagement() {
  const { data: devices, isLoading: isLoadingDevices } = useDevices();
  const { mutate: deleteDevice } = useDeleteDevice();
  const { data: employees, isLoading: isLoadingEmployees } = useEmployees();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [stateFilters, setStateFilters] = useState({
    type: "none",
    ownerId: "none",
    searchTerm: "",
  });
  const [filteredDevices, setFilteredDevices] = useState(devices || []);
  const [addDeviceDialogOpen, setAddDeviceDialogOpen] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);

  useEffect(() => {
    if (devices) {
      setFilteredDevices(devices);
    }
  }, [devices]);

  useEffect(() => {
    applyFilters();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stateFilters, devices]);

  const applyFilters = useCallback(() => {
    let filtered = devices || [];

    filtered = filtered.filter((device: Device) =>
      device.name.toLowerCase().includes(stateFilters.searchTerm.toLowerCase())
    );
    if (stateFilters.type && stateFilters.type !== "none") {
      filtered = filtered.filter(
        (device: Device) =>
          device.type.toLocaleLowerCase() ===
          stateFilters.type.toLocaleLowerCase()
      );
    }
    if (stateFilters.ownerId && stateFilters.ownerId !== "none") {
      filtered = filtered.filter(
        (device: Device) => device.ownerId === stateFilters.ownerId
      );
    }
    setFilteredDevices(filtered);
  }, [devices, stateFilters]);

  const handleDeleteDevice = (id: string) => {
    showConfirmDialog({
      title: "Delete Device",
      message: "Are you sure you want to delete this device?",
      confirm: () => {
        deleteDevice(id);
      },
    });
  };

  if (isLoadingDevices || isLoadingEmployees) return <Loading />;

  return (
    <Container title="Device Management">
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={2}
        alignItems="center"
        sx={{ my: 4 }}
      >
        <TextField
          placeholder="Device Name"
          variant="outlined"
          size="small"
          sx={{
            "& .MuiOutlinedInput-root": { borderRadius: "8px" },
          }}
          value={stateFilters.searchTerm}
          onChange={(e) => {
            setStateFilters((prev) => ({
              ...prev,
              searchTerm: e.target.value,
            }));
          }}
        />
        <Select
          value={stateFilters.type}
          onChange={(e) => {
            setStateFilters((prev) => ({ ...prev, type: e.target.value }));
          }}
          displayEmpty
          size="small"
          sx={{
            minWidth: 200,
            "& .MuiOutlinedInput-root": { borderRadius: "8px" },
          }}
        >
          <MenuItem
            sx={{ height: "37px" }}
            value="none"
            aria-placeholder="Select Type"
          >
            <Typography color="textDisabled">Select Type</Typography>
          </MenuItem>
          {devicesType.map((deviceType) => (
            <MenuItem key={deviceType} value={deviceType}>
              {deviceType}
            </MenuItem>
          ))}
        </Select>
        <Select
          value={stateFilters.ownerId}
          onChange={(e) => {
            setStateFilters((prev) => ({ ...prev, ownerId: e.target.value }));
          }}
          displayEmpty
          size="small"
          sx={{
            minWidth: 200,
            "& .MuiOutlinedInput-root": { borderRadius: "8px" },
          }}
        >
          <MenuItem
            sx={{ height: "37px", color: "textDisabled" }}
            value="none"
            aria-placeholder="Select Owner"
          >
            <Typography color="textDisabled">Select Owner</Typography>
          </MenuItem>
          {employees?.map(({ id, name }) => (
            <MenuItem key={id} value={id}>
              {name}
            </MenuItem>
          ))}
        </Select>
        <Button
          onClick={() => {
            setAddDeviceDialogOpen(true);
            setSelectedDevice(null);
          }}
          name="Add Device"
          startIcon={<AddIcon />}
        />
      </Stack>

      {filteredDevices.length === 0 ? (
        <EmptyState
          icon={<DevicesIcon />}
          title="No devices found"
          description="You can add a new device using the button Add device."
        />
      ) : null}

      {isMobile ? (
        <Stack spacing={2}>
          {filteredDevices.map((device) => (
            <DeviceCard
              key={device.id}
              device={device}
              onEdit={() => {
                setSelectedDevice(device);
                setAddDeviceDialogOpen(true);
              }}
              onDelete={() => handleDeleteDevice(device.id!)}
            />
          ))}
        </Stack>
      ) : (
        filteredDevices.length > 0 && (
          <TableContainer
            component={Paper}
            sx={{
              boxShadow: "none",
            }}
          >
            <Table aria-label="Device list">
              <TableHead>
                <TableRow sx={{ borderBottom: "1px solid #e0e0e0" }}>
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                      color: "text.secondary",
                      border: 0,
                    }}
                  >
                    Name
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                      color: "text.secondary",
                      border: 0,
                    }}
                  >
                    Type
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                      color: "text.secondary",
                      border: 0,
                    }}
                  >
                    Owner
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                      color: "text.secondary",
                      border: 0,
                    }}
                  >
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>

              {/* 3. Le corps de la table */}
              <TableBody>
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
              </TableBody>
            </Table>
          </TableContainer>
        )
      )}
      <UpsertDeviceDialog
        open={addDeviceDialogOpen}
        onClose={() => setAddDeviceDialogOpen(false)}
        owners={employees}
        device={selectedDevice || undefined}
      />
    </Container>
  );
}

export default DeviceManagement;
