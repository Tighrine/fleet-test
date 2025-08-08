import { useCallback, useEffect, useState } from "react";
import { devicesType } from "../../shapes/device";
import type { Device } from "../../shapes/device";

import { useDeleteDevice, useDevices } from "../../hooks/useDevices";
import { useEmployees } from "../../hooks/useEmployees";

import Button from "../../components/Button";
import { UpsertDeviceDialog } from "./UpsertDeviceDialog";

import {
  MenuItem,
  Select,
  Stack,
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

import AddIcon from "@mui/icons-material/Add";
import DevicesIcon from "@mui/icons-material/Devices";
import { DeviceCard } from "./DeviceCard";
import { EmptyState } from "../../components/EmptyState";
import { showConfirmDialog } from "../../components/confirmation-dialog/store";
import { useIsMobile } from "../../hooks/useIsMobile";
import DeviceRow from "./DeviceRow";
import CustomTextField from "../../components/CustomTextField";
import { CustomFormControl } from "../../components/CustomFromControl";

function DeviceManagement() {
  const { data: devices, isLoading: isLoadingDevices } = useDevices();
  const { mutate: deleteDevice } = useDeleteDevice();
  const { data: employees, isLoading: isLoadingEmployees } = useEmployees();
  const isMobile = useIsMobile();

  const [stateFilters, setStateFilters] = useState({
    type: "none",
    ownerId: "",
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
    if (stateFilters.ownerId === "none") {
      filtered = filtered.filter((device: Device) => !device.owner);
    } else if (stateFilters.ownerId && stateFilters.ownerId !== "") {
      filtered = filtered.filter(
        (device: Device) => device.owner?.id === stateFilters.ownerId
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
        <CustomTextField
          placeholder="Device Name"
          variant="outlined"
          size="small"
          value={stateFilters.searchTerm}
          onChange={(e) => {
            setStateFilters((prev) => ({
              ...prev,
              searchTerm: e.target.value,
            }));
          }}
        />
        <CustomFormControl>
          <Select
            value={stateFilters.type}
            onChange={(e) => {
              setStateFilters((prev) => ({ ...prev, type: e.target.value }));
            }}
            displayEmpty
            size="small"
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
        </CustomFormControl>
        <CustomFormControl>
          <Select
            value={stateFilters.ownerId}
            onChange={(e) => {
              setStateFilters((prev) => ({ ...prev, ownerId: e.target.value }));
            }}
            displayEmpty
            size="small"
          >
            <MenuItem
              sx={{ height: "37px", color: "textDisabled" }}
              value=""
              aria-placeholder="Select Owner"
            >
              <Typography color="textDisabled">Select Owner</Typography>
            </MenuItem>
            <MenuItem value="none" aria-placeholder="unassigned device">
              <Typography>Unassigned</Typography>
            </MenuItem>
            {employees?.map(({ id, name }) => (
              <MenuItem key={id} value={id}>
                {name}
              </MenuItem>
            ))}
          </Select>
        </CustomFormControl>
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
                  {["Name", "Type", "Owner", "Actions"].map((header) => (
                    <TableCell
                      key={header}
                      sx={{
                        fontWeight: "bold",
                        color: "text.secondary",
                        border: 0,
                      }}
                    >
                      {header}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                <DeviceRow
                  filteredDevices={filteredDevices}
                  setSelectedDevice={setSelectedDevice}
                  setAddDeviceDialogOpen={setAddDeviceDialogOpen}
                  handleDeleteDevice={handleDeleteDevice}
                />
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
