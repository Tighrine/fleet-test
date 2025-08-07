import { DeviceSchema } from "../shapes/device";
import { Request, Response, NextFunction } from "express";

export const checkDeviceSchema = (req: Request, _: Response, next: NextFunction) => {
    try {
        DeviceSchema.parse(req.body);
        next();
    } catch (error) {
        next(error);
    }
};