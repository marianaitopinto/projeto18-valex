import { Router } from "express";

import * as cardController from "../controllers/cardController";
import validateApi from "../middlewares/validateApiMiddleware";

const cardRouter = Router();

cardRouter.post("/cards/create", validateApi, cardController.createCard);
cardRouter.post("/cards/activate/:id", cardController.activateCard);
cardRouter.get("/cards/transactions/:id", cardController.getTransactions);

export default cardRouter;
