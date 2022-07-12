import { Router } from "express";

import * as paymentController from "../controllers/paymentController"
import * as schemas from "../schemas/index"

import { validateSchemaMiddleware } from "../middlewares/validateSchemaMiddleware";

const paymentRouter = Router();

paymentRouter.post("/payments/pos", validateSchemaMiddleware(schemas.paymentPosSchema), paymentController.paymentPos)

export default paymentRouter;