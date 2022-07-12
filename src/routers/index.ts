import { Router } from "express";

import cardRouter from "./cardRouter";
import rechargeRouter from "./rechargeRouter";
import paymentRouter from "./paymentRouter";

const routers = Router();

routers.use(cardRouter);
routers.use(rechargeRouter);
routers.use(paymentRouter);

export default routers;
