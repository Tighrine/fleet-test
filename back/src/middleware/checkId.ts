import { NextFunction, Request, Response } from "express";

export function checkId(req: Request, res: Response, next: NextFunction) {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: 'Invalid or missing ID in URL' });
  }

  next();
}
