import { DeviceSchema } from "../shapes/device";
import { Request, Response, NextFunction } from "express";
import { checkId } from "./checkId";

export const checkDeviceSchema = (req: Request, res: Response, next: NextFunction) => {
  const result = DeviceSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ errors: result.error });
  }
  next();
};

export const checkDeviceSchemaWithId = (req: Request, res: Response, next: NextFunction) => {
    checkId(req, res, next);
    checkDeviceSchema(req, res, next);
};
