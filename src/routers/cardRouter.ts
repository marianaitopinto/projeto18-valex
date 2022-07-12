import { Router } from "express";

import * as cardController from "../controllers/cardController";
import * as schemas from "../schemas/index"
import validateApi from "../middlewares/validateApiMiddleware";
import { validateSchemaMiddleware } from "../middlewares/validateSchemaMiddleware";

const cardRouter = Router();

cardRouter.post("/cards/create", validateApi, validateSchemaMiddleware(schemas.createCardSchema), cardController.createCard);
cardRouter.post("/cards/activate/:id", validateSchemaMiddleware(schemas.activateCardSchema), cardController.activateCard);
cardRouter.get("/cards/balance/:id", cardController.getBalance);
cardRouter.put("/cards/block/:id", validateSchemaMiddleware(schemas.passwordSchema), cardController.blockCard);
cardRouter.put("/cards/unblock/:id", validateSchemaMiddleware(schemas.passwordSchema), cardController.unblockCard);

export default cardRouter;
