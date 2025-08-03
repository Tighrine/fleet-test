import { EmployeeSchema } from "../shapes/employee";
import { NextFunction, Request, Response } from "express";
import { checkId } from "./checkId";

export const checkEmployeeSchema = (req: Request, res: Response, next: NextFunction) => {
    const result = EmployeeSchema.safeParse(req.body);
    if (!result.success) {
        return res.status(400).json({ errors: result.error });
    }
    next();
};

export const checkEmployeeSchemaWithId = (req: Request, res: Response, next: NextFunction) => {
    checkId(req, res, next);
    checkEmployeeSchema(req, res, next);
};