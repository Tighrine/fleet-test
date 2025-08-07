import * as zod from "zod";

export const EmployeeSchema = zod.object({
  id: zod.uuid().optional(),
  name: zod.string().min(2).max(100),
  role: zod.string().min(2).max(100),
});
