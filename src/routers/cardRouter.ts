import { Router } from "express";

import * as cardController from "../controllers/cardController"

const cardRouter = Router();

cardRouter.post("/cards/create", cardController.createCard);

export default cardRouter;