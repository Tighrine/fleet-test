import { ZodError } from 'zod';
import { Request, Response, NextFunction } from 'express';
import { formatZodError } from '../utils/formatZodError';

export const zodErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof ZodError) {
    return res.status(400).json({
      message: "Bad request",
      errors: formatZodError(err),
    });
  }

  next(err); // passe aux autres gestionnaires d'erreurs
}
