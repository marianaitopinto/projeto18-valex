import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/appError";

export default async function handleError(
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (error instanceof AppError) {
    return res.status(error.statusCode).send({ message: error.message });
  }

  return res.status(500).send("Internal Server Error");
}
