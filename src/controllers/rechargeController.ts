import { Request, Response } from "express";
import * as rechargeService from "../services/rechargeService"

export async function recharge(req: Request, res: Response) {
  const { id } = req.params;
  const { amount } = req.body;
  const cardId = parseInt(id);

  await rechargeService.rechargeCard(cardId, amount);

  res.sendStatus(200);
}
