import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import * as api from '../api/devices'
import { showErrorDialog } from '../components/error-dialog/store'
import type { Device } from '../shapes/device'

export const useDevices = () => {
  return useQuery< Device[]>({
    queryKey: ['devices'],
    queryFn: api.getDevices,
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
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['devices'] }),
    onError: (error: Error) => {
      showErrorDialog({
        title: 'Error creating device',
        errorDetailMessage: error.message,
        errorMessage: 'An error occurred while creating the device. Please try again later.'
      });
      console.error('Error creating device:', error);
    }
  })
}

export const useUpdateDevice = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Device }) =>
      api.updateDevice(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['devices'] }),
    onError: (error: Error) => {
      showErrorDialog({
        title: 'Error updating device',
        errorDetailMessage: error.message,
        errorMessage: 'An error occurred while updating the device. Please try again later.'
      });
      console.error('Error updating device:', error);
    }
  })
}

export const useDeleteDevice = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: api.deleteDevice,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['devices'] }),
    onError: (error: Error) => {
      showErrorDialog({
        title: 'Error deleting device',
        errorDetailMessage: error.message,
        errorMessage: 'An error occurred while deleting the device. Please try again later.'
      });
      console.error('Error deleting device:', error);
    }
  })
}
