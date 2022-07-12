import { Router } from "express";

import * as paymentController from "../controllers/paymentController"

const paymentRouter = Router();

paymentRouter.post("/payments/pos", paymentController.paymentPos)

export default paymentRouter;