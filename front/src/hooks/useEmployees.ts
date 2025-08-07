import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import * as api from '../api/employees'
import type { Employee } from '../shapes/employee'
import { showErrorDialog } from '../components/error-dialog/store'

export const useEmployees = () => {
  return useQuery<Employee[]>({
    queryKey: ['employees'],
    queryFn: api.getEmployees,
    retry: false, // Disable automatic retries
  })
}

export const useEmployeeById = (id: string) => {
    return useQuery({
        queryKey: ['employee', id],
        queryFn: () => api.getEmployeeById(id),
        enabled: !!id // Only fetch if id is provided
    })
}

export const useCreateEmployee = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: api.createEmployee,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['employees'] }),
    onError: (error: Error) => {
      showErrorDialog({
        title: 'Error creating employee',
        errorDetailMessage: error.message,
        errorMessage: 'An error occurred while creating the employee. Please try again later.'
      });
    }
  })
}

export const useUpdateEmployee = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: { name: string; role: string } }) =>
      api.updateEmployee(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['employees'] }),
    onError: (error: Error) => {
      showErrorDialog({
        title: 'Error updating employee',
        errorDetailMessage: error.message,
        errorMessage: 'An error occurred while updating the employee. Please try again later.'
      });
    }
  })
}

export const useDeleteEmployee = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: api.deleteEmployee,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['employees'] }),
    onError: (error: Error) => {
      showErrorDialog({
        title: 'Error deleting employee',
        errorDetailMessage: error.message,
        errorMessage: 'An error occurred while deleting the employee. Please try again later.'
      });
    }
  })
}
