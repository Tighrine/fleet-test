import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import * as api from '../api/devices'

export const useDevices = () => {
  return useQuery({
    queryKey: ['devices'],
    queryFn: api.getDevices
  })
}

export const useDeviceById = (id: number) => {
  return useQuery({
    queryKey: ['device', id],
    queryFn: () => api.getDeviceById(id),
    enabled: !!id // Only fetch if id is provided
  })
}

export const useCreateDevice = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: api.createDevice,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['devices'] })
  })
}

export const useUpdateDevice = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: { name: string; type: string } }) =>
      api.updateDevice(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['devices'] })
  })
}

export const useDeleteDevice = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: api.deleteDevice,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['devices'] })
  })
}
