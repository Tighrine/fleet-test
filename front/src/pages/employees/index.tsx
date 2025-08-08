import { useEmployees, useDeleteEmployee } from "../../hooks/useEmployees";
import type { Employee } from "../../shapes/employee";
import Container from "../../components/Container";
import Stack from "@mui/material/Stack";
import {
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import PeopleIcon from "@mui/icons-material/PeopleOutlineOutlined";
import { useEffect, useState } from "react";
import Button from "../../components/Button";
import Loading from "../../components/Loading";
import { EmptyState } from "../../components/EmptyState";
import { UpsertEmployeeDialog } from "./UpsertEmployeeDialog";
import { useIsMobile } from "../../hooks/useIsMobile";
import { showConfirmDialog } from "../../components/confirmation-dialog/store";
import EmployeeRow from "./EmployeeRow";
import EmployeeCard from "./EmployeeCard";
import CustomTextField from "../../components/CustomTextField";

const EmployeesPage = () => {
  const { data: employees, isLoading: isLoadingEmployees } = useEmployees();
  const { mutate: deleteEmployee } = useDeleteEmployee();

  const isMobile = useIsMobile();

  const [stateFilters, setStateFilters] = useState({
    name: "",
    role: "",
  });
  const [filteredEmployees, setFilteredEmployees] = useState<Employee[]>([]);
  const [addEmployeeDialogOpen, setAddEmployeeDialogOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<
    Employee | undefined
  >(undefined);

  useEffect(() => {
    if (employees) {
      setFilteredEmployees(employees);
    }
  }, [employees]);

  useEffect(() => {
    applyFilters();
  }, [stateFilters]);

  const applyFilters = () => {
    let filtered = employees || [];

    filtered = filtered.filter((employee: Employee) =>
      employee.name.toLowerCase().includes(stateFilters.name.toLowerCase())
    );
    filtered = filtered.filter((employee: Employee) =>
      employee.role.toLowerCase().includes(stateFilters.role.toLowerCase())
    );

    setFilteredEmployees(filtered);
  };

  if (isLoadingEmployees) return <Loading />;

  return (
    <Container title="Employees Management">
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={2}
        alignItems="center"
        sx={{ my: 4 }}
      >
        <CustomTextField
          placeholder="Employee Name"
          variant="outlined"
          size="small"
          value={stateFilters.name}
          onChange={(e) => {
            setStateFilters((prev) => ({
              ...prev,
              name: e.target.value,
            }));
          }}
        />
        <CustomTextField
          placeholder="Employee role"
          variant="outlined"
          size="small"
          value={stateFilters.role}
          onChange={(e) => {
            setStateFilters((prev) => ({
              ...prev,
              role: e.target.value,
            }));
          }}
        />
        <Button
          onClick={() => {
            setAddEmployeeDialogOpen(true);
            setSelectedEmployee(undefined);
          }}
          name="Add Employee"
          startIcon={<AddIcon />}
        />
      </Stack>

      {filteredEmployees.length === 0 ? (
        <EmptyState
          icon={<PeopleIcon />}
          title="No employees found"
          description="You can add a new employee using the button Add employee."
        />
      ) : null}
      {isMobile ? (
        <Stack spacing={2}>
          {filteredEmployees.map((employee) => (
            <EmployeeCard
              key={employee.id}
              employee={employee}
              onEdit={() => {
                setSelectedEmployee(employee);
                setAddEmployeeDialogOpen(true);
              }}
              onDelete={() => {
                showConfirmDialog({
                  title: "Delete Employee",
                  message: `Are you sure you want to delete ${employee.name}?`,
                  confirm: () => deleteEmployee(employee.id!),
                });
              }}
            />
          ))}
        </Stack>
      ) : (
        filteredEmployees.length > 0 && (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Role</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <EmployeeRow
                  employees={filteredEmployees}
                  onEdit={(employee) => {
                    setSelectedEmployee(employee);
                    setAddEmployeeDialogOpen(true);
                  }}
                  onDelete={(employee) => {
                    showConfirmDialog({
                      title: "Delete Employee",
                      message: `Are you sure you want to delete ${employee.name}?`,
                      confirm: () => deleteEmployee(employee.id!),
                    });
                  }}
                />
              </TableBody>
            </Table>
          </TableContainer>
        )
      )}
      <UpsertEmployeeDialog
        open={addEmployeeDialogOpen}
        onClose={() => setAddEmployeeDialogOpen(false)}
        employee={selectedEmployee}
      />
    </Container>
  );
};

export default EmployeesPage;
