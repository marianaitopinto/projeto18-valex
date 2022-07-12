import { Router } from "express";

import * as rechargeController from "../controllers/rechargeController"
import * as schemas from "../schemas/index"

import validateApi from "../middlewares/validateApiMiddleware";
import { validateSchemaMiddleware } from "../middlewares/validateSchemaMiddleware";

const rechargeRouter = Router();

rechargeRouter.post("/recharge/:id", validateApi, validateSchemaMiddleware(schemas.rechargeSchema), rechargeController.recharge);

export default rechargeRouter;