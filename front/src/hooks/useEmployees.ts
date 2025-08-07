import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import * as api from '../api/employees'
import type { Employee } from '../shapes/employee'

export const useEmployees = () => {
  return useQuery<Employee[]>({
    queryKey: ['employees'],
    queryFn: api.getEmployees,
    retry: false, // Disable automatic retries
  })
}

export const useEmployeeById = (id: number) => {
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
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['employees'] })
  })
}

export const useUpdateEmployee = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: { name: string; role: string } }) =>
      api.updateEmployee(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['employees'] })
  })
}

export const useDeleteEmployee = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: api.deleteEmployee,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['employees'] })
  })
}
