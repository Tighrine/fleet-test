import * as z from 'zod';

export const DeviceSchema = z.object({
  id: z.uuid().optional(),
  name: z.string().min(1, 'Name is required'),
  type: z.string().min(1, 'Type is required'),
  ownerId: z.union([z.uuid('Invalid Owner ID'), z.null()]).optional(),
});