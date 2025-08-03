import { DeviceSchema } from "../shapes/device";
import { Request, Response, NextFunction } from "express";

export const checkDeviceSchema = (req: Request, res: Response, next: NextFunction) => {
  const result = DeviceSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ message: "Bad request", errors: result.error });
  }
  next();
};
