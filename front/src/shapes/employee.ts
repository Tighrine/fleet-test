import * as zod from "zod";

export const EmployeeSchema = zod.object({
  id: zod.string().optional(),
  name: zod.string().min(2).max(100),
  role: zod.string().min(2).max(100),
});

export type Employee = zod.infer<typeof EmployeeSchema>;
