import { NextFunction, Request, Response } from "express";
import { Schema } from "joi";

import { AppError } from "../errors/appError";

export function validateSchemaMiddleware(schema: Schema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const validation = schema.validate(req.body);
    if (validation.error) throw new AppError("Invalid schema", 422);
    next();
  };
}
