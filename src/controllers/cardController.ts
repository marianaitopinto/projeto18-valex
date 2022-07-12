import { Request, Response } from "express";
import * as cardRepository from "../repositories/cardRepository";
import * as cardService from "../services/cardServices";

export async function createCard(req: Request, res: Response) {
  const {
    employeeId,
    type,
  }: { employeeId: number; type: cardRepository.TransactionTypes } = req.body;

  await cardService.createCard(employeeId, type);

  res.status(201).send("Card created");
}

export async function activateCard(req: Request, res: Response) {
  const { id } = req.params;
  const { securityCode, password }: { securityCode: string; password: string } =
    req.body;
  const cardId = parseInt(id);

  await cardService.activateCard(cardId, securityCode, password);

  res.sendStatus(201);
}

export async function getBalance(req: Request, res: Response) {
  const { id } = req.params;
  const cardId = parseInt(id);

  const balance = await cardService.getBalanceCard(cardId);

  res.send(balance);
}

export async function blockCard(req: Request, res: Response) {
  const { id } = req.params;
  const { password } = req.body;
  const cardId = parseInt(id);

  await cardService.blockCard(cardId, password);

  res.sendStatus(200);
}

export async function unblockCard(req: Request, res: Response) {
  const { id } = req.params;
  const { password } = req.body;
  const cardId = parseInt(id);

  await cardService.unblockCard(cardId, password);

  res.sendStatus(200);
}
