import {
  useEmployees,
  useCreateEmployee,
  useDeleteEmployee,
} from "../hooks/useEmployees";
import type { Employee } from "../shapes/employee";
import { Box, Typography } from "@mui/material";
import Container from "../components/Container";

const EmployeesPage = () => {
  const { data: employees, isLoading } = useEmployees();
  const createEmployee = useCreateEmployee();
  const deleteEmployee = useDeleteEmployee();

  if (isLoading) return <p>Chargement...</p>;

  return (
    <Container title="Employees Management">
      {<pre>{JSON.stringify(employees, null, 2)}</pre>}
    </Container>
  );
};

export default EmployeesPage;
