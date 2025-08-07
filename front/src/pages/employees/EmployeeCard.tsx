import {
  Box,
  Card,
  CardActions,
  CardContent,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  EditNoteOutlined as EditIcon,
  DeleteOutlineOutlined as DeleteIcon,
} from "@mui/icons-material";
import type { Employee } from "../../shapes/employee";

type Props = {
  employee: Employee;
  onEdit: (employee: Employee) => void;
  onDelete: (employee: Employee) => void;
};

function EmployeeCard(props: Props) {
  const { employee, onEdit, onDelete } = props;
  return (
    <Card variant="outlined">
      <CardContent sx={{ pb: 1 }}>
        <Typography variant="h6" component="div" fontWeight="bold">
          {employee.name}
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 0.5 }}>
          <Typography variant="body2" color="text.secondary">
            Role
          </Typography>
          <Typography variant="body2">{employee.role}</Typography>
        </Box>
      </CardContent>
      <CardActions sx={{ justifyContent: "flex-end", pt: 0 }}>
        <Tooltip title="Edit">
          <IconButton size="small" onClick={() => onEdit(employee)}>
            <EditIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton size="small" onClick={() => onDelete(employee)}>
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </CardActions>
    </Card>
  );
}

export default EmployeeCard;
