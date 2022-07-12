import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/appError";

import * as companyService from "../services/companyService";

export default async function validateApi(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const apiKey = req.headers["x-apy-key"] as string;

  if (!apiKey) throw new AppError("API key is missing", 400);

  const company = await companyService.validateApiKey(apiKey);

  res.locals.company = company;
  console.log(company);
  next();
}
