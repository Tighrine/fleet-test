import { EmployeeSchema } from "../shapes/employee";
import { NextFunction, Request, Response } from "express";

export const checkEmployeeSchema = (req: Request, res: Response, next: NextFunction) => {
    const result = EmployeeSchema.safeParse(req.body);
    if (!result.success) {
        return res.status(400).json({ message: "Bad request", errors: result.error });
    }
    next();
};