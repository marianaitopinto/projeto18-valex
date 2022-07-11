import { Request, Response } from "express";
import * as cardRepository from "../repositories/cardRepository"
import * as cardService from "../services/cardServices"

export async function createCard(req: Request, res: Response) {
    const { employeeId, type }: { employeeId: number; type: cardRepository.TransactionTypes; } = req.body;

    const newCard = await cardService.createCard(employeeId, type);

    res.status(201).send("Card created");
}