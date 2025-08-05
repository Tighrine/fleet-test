import { ZodError } from 'zod';

export function formatZodError(error: ZodError) {
  return error.issues.map(err => ({
    field: err.path.join('.'),
    message: err.message,
    code: err.code,
  }));
}
