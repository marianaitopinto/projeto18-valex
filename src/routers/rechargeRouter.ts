import { Router } from "express";

import * as rechargeController from "../controllers/rechargeController"
import validateApi from "../middlewares/validateApiMiddleware";

const rechargeRouter = Router();

rechargeRouter.post("/recharge/:id", validateApi, rechargeController.recharge);

export default rechargeRouter;