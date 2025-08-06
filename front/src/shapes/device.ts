import * as z from 'zod';
import { EmployeeSchema } from './employee';

export const DeviceSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, 'Name is required'),
  type: z.string().min(1, 'Type is required'),
  owner: z.union([z.number().int().positive('Owner ID must be a positive integer'), EmployeeSchema]).optional(),
});

export type Device = z.infer<typeof DeviceSchema>;