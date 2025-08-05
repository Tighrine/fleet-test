import { EmployeeSchema } from "../shapes/employee";
import { NextFunction, Request, Response } from "express";

export const checkEmployeeSchema = (req: Request, res: Response, next: NextFunction) => {
    try {
        EmployeeSchema.parse(req.body);
        next();
    } catch (error) {
        next(error);
    }
};