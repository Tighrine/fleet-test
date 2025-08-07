import * as z from 'zod';

export const DeviceSchema = z.object({
  id: z.uuid().optional(),
  name: z.string().min(1, 'Name is required'),
  type: z.string().min(1, 'Type is required'),
  ownerId: z.uuid('Invalid Owner ID').optional(),
});