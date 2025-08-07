import { NextFunction, Request, Response } from "express";

export function checkId(req: Request, res: Response, next: NextFunction) {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: 'Invalid or missing employee ID' });
  }

  next(); // continue to the next middleware or route
}
