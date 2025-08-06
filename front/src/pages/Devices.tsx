import { useEffect, useMemo, useState } from "react";
import { MaterialReactTable } from "material-react-table";

import type { Device } from "../shapes/device";
import { useDevices } from "../hooks/useDevices";
import { useEmployees } from "../hooks/useEmployees";
// Import des composants MUI
import {
  Box,
  Button,
  IconButton,
  MenuItem,
  Select,
  Stack,
  TextField,
  Tooltip,
} from "@mui/material";
import Loading from "../components/Loading";
import Container from "../components/Container";

// Import des icônes MUI
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/EditOutlined";
import DeleteIcon from "@mui/icons-material/DeleteOutline";

function DeviceManagement() {
  const {
    data: devices,
    isLoading: isLoadingDevices,
    isError: isErrorDevices,
    error: errorDevices,
  } = useDevices();
  const {
    data: employees,
    isLoading: isLoadingEmployees,
    isError: isErrorEmployees,
    error: errorEmployees,
  } = useEmployees();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredDevices, setFilteredDevices] = useState(devices || []);
  const [type, setType] = useState("");
  const [owner, setOwner] = useState("");

  const columns = useMemo(
    () => [
      {
        accessorKey: "name",
        header: "Name",
      },
      {
        accessorKey: "type",
        header: "Type",
      },
      {
        accessorKey: "owner",
        header: "Owner",
        accessorFn: (row: Device) =>
          typeof row.owner === "object" && row.owner && "name" in row.owner
            ? row.owner.name
            : "Unassigned",
      },
    ],
    []
  );

  useEffect(() => {
    if (isLoadingDevices || isLoadingEmployees) return;
    const lowercasedSearchTerm = searchTerm.toLowerCase();
    const filtered = devices.filter((device: Device) =>
      device.name.toLowerCase().includes(lowercasedSearchTerm)
    );
    setFilteredDevices(filtered);
  }, [devices, searchTerm, isLoadingDevices, isLoadingEmployees]);

  if (isLoadingDevices || isLoadingEmployees) return <Loading />;

  return (
    <Container title="Device Management">
      {/* SECTION FORMULAIRE D'AJOUT */}
      <Stack direction="row" spacing={2} alignItems="center" sx={{ my: 4 }}>
        <TextField
          placeholder="Device Name"
          variant="outlined"
          size="small"
          sx={{
            "& .MuiOutlinedInput-root": { borderRadius: "8px" },
          }}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Select
          value={type}
          onChange={(e) => setType(e.target.value)}
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
          ></MenuItem>
          <MenuItem value="Laptop">Laptop</MenuItem>
          <MenuItem value="Peripheral">Peripheral</MenuItem>
          <MenuItem value="Display">Display</MenuItem>
        </Select>
        <Select
          value={owner}
          onChange={(e) => setOwner(e.target.value)}
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
            aria-placeholder="Select Owner"
          ></MenuItem>
          <MenuItem value="John Doe">John Doe</MenuItem>
          <MenuItem value="Jane Smith">Jane Smith</MenuItem>
        </Select>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          disableElevation
          sx={{
            backgroundColor: "black",
            color: "white",
            borderRadius: "8px",
            textTransform: "none",
            px: 3,
            py: 1,
            "&:hover": {
              backgroundColor: "#333",
            },
          }}
        >
          Add Device
        </Button>
      </Stack>
      <MaterialReactTable
        columns={columns}
        data={devices}
        enableTopToolbar={false}
        enableBottomToolbar={false}
        enableColumnActions={false}
        enableSorting={false}
        enableRowActions
        positionActionsColumn="last"
        renderRowActions={({ row }) => (
          <Box sx={{ display: "flex", gap: "0.5rem" }}>
            <Tooltip title="Edit">
              <IconButton
                size="small"
                onClick={() => console.log("Edit device:", row.original.name)}
              >
                <EditIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete">
              <IconButton
                size="small"
                onClick={() => console.log("Delete device:", row.original.name)}
              >
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </Box>
        )}
        // == STYLISATION POUR CORRESPONDRE AU DESIGN ==
        // C'est ici que la magie opère pour obtenir le style exact de l'image.

        muiTableContainerProps={{
          sx: {
            // Enlever l'ombre par défaut pour un look plat
            boxShadow: "none",
          },
        }}
        muiTableHeadCellProps={{
          ...{
            align: "left", // ou 'center'
            sx: {
              color: "text.secondary",
              fontWeight: "bold",
              border: "none",
            },
          },
          // Renommer la colonne Action
          ...{ header: "Actions" },
        }}
        muiTableHeadRowProps={{
          sx: {
            // Ajouter SEULEMENT la bordure inférieure pour l'en-tête
            borderBottom: "1px solid #e0e0e0",
          },
        }}
        muiTableBodyCellProps={{
          sx: {
            // Enlever les bordures des cellules du corps pour un look propre
            border: "none",
            padding: "16px", // Ajuster l'espacement vertical
          },
        }}
        muiTableBodyRowProps={{
          sx: {
            // Ajouter la ligne de séparation sous chaque ligne de données
            borderBottom: "1px solid #e0e0e0",
            // Enlever le survol pour un design plus statique
            "&:hover .MuiTableCell-root": {
              backgroundColor: "transparent",
            },
          },
        }}
      />
    </Container>
  );
}

export default DeviceManagement;
