import * as z from 'zod';

export const DeviceSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, 'Name is required'),
  type: z.string().min(1, 'Type is required'),
  ownerId: z.number().int().positive('Owner ID must be a positive integer').optional(),
});