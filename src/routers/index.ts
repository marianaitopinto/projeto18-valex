import { Router } from "express";

import cardRouter from "./cardRouter";

const routers = Router();

routers.use(cardRouter);

export default routers;