import { Box, IconButton, TableCell, TableRow } from "@mui/material";
import EditIcon from "@mui/icons-material/EditOutlined";
import DeleteIcon from "@mui/icons-material/DeleteOutline";
import type { Employee } from "../../shapes/employee";

type Props = {
  employees: Employee[];
  onEdit: (employee: Employee) => void;
  onDelete: (employee: Employee) => void;
};

function EmployeeRow(props: Props) {
  const { employees, onEdit, onDelete } = props;

  return (
    <>
      {employees.map((employee) => (
        <TableRow
          sx={{
            "&:not(:last-child)": {
              borderBottom: "1px solid #e0e0e0",
            },
            "& td, & th": { border: 0 },
          }}
        >
          <TableCell component="th" scope="row">
            {employee.name}
          </TableCell>
          <TableCell>{employee.role}</TableCell>
          <TableCell>
            <Box sx={{ display: "flex", gap: 1 }}>
              <IconButton
                size="small"
                aria-label="edit"
                onClick={() => onEdit(employee)}
              >
                <EditIcon fontSize="small" />
              </IconButton>
              <IconButton
                size="small"
                aria-label="delete"
                onClick={() => onDelete(employee)}
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

export default EmployeeRow;
