import * as z from 'zod';
import { EmployeeSchema } from './employee';

export const DeviceSchema = z.object({
  id: z.uuid().optional(),
  name: z.string().min(1, 'Name is required'),
  type: z.string().min(1, 'Type is required'),
  owner: EmployeeSchema.optional(),
});

export type Device = z.infer<typeof DeviceSchema>;
export const devicesType = ["Laptop", "Desktop", "Tablet", "Phone", "Display", "Printer", "Server", "Network device", "Other"] as const;