import React, { useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button as MuiButton,
  Divider,
} from "@mui/material";

import { useForm, Controller } from "react-hook-form";
import type { Employee } from "../../shapes/employee";
import Button from "../../components/Button";
import CustomTextField from "../../components/CustomTextField";
import { useCreateEmployee, useUpdateEmployee } from "../../hooks/useEmployees";

type UpsertEmployeeDialogProps = {
  open: boolean;
  onClose: () => void;
  employee?: Employee; // Optional employee prop for editing
};

export const UpsertEmployeeDialog: React.FC<UpsertEmployeeDialogProps> = ({
  open,
  onClose,
  employee,
}) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Employee>();

  const {
    mutate: createEmployee,
    error: createError,
    isError: isCreateError,
  } = useCreateEmployee();
  const {
    mutate: updateEmployee,
    error: updateError,
    isError: isUpdateError,
  } = useUpdateEmployee();

  useEffect(() => {
    if (open) {
      if (employee) {
        reset(employee);
      } else {
        reset({
          name: "",
          role: "",
        });
      }
    }
  }, [employee, open, reset]);

  const handleClose = () => {
    reset({});
    onClose();
  };

  const submitHandler = async (data: Employee) => {
    if (employee) {
      await updateEmployee({
        id: employee.id!,
        data,
      });
      if (isUpdateError) {
        console.error("Error updating employee:", updateError);
        return;
      }
    } else {
      await createEmployee(data);
      if (isCreateError) {
        console.error("Error creating employee:", createError);
        return;
      }
    }
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle
        sx={{
          backgroundColor: "black",
          color: "white",
          textAlign: "center",
          fontWeight: "bold",
        }}
      >
        {employee ? "Edit Employee" : "Add New Employee"}
      </DialogTitle>
      <form onSubmit={handleSubmit(submitHandler)}>
        <DialogContent>
          <Controller
            name="name"
            control={control}
            defaultValue=""
            rules={{ required: "Employee name is required" }}
            render={({ field }) => (
              <CustomTextField
                {...field}
                label="Employee Name"
                fullWidth
                margin="normal"
                error={!!errors.name}
                helperText={errors.name?.message}
              />
            )}
          />
          <Controller
            name="role"
            control={control}
            defaultValue=""
            rules={{ required: "Employee role is required" }}
            render={({ field }) => (
              <CustomTextField
                {...field}
                label="Employee Role"
                fullWidth
                margin="normal"
                error={!!errors.role}
                helperText={errors.role?.message}
              />
            )}
          />
        </DialogContent>
        <Divider />
        <DialogActions>
          <MuiButton
            variant="outlined"
            onClick={handleClose}
            sx={{
              color: "black",
              borderColor: "black",
              "&:hover": {
                borderColor: "gray",
              },
            }}
          >
            <span>Cancel</span>
          </MuiButton>
          <Button type="submit" name={employee ? "Update" : "Create"} />
        </DialogActions>
      </form>
    </Dialog>
  );
};
