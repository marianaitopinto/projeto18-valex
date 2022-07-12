import { Request, Response } from "express";
import * as cardRepository from "../repositories/cardRepository"
import * as cardService from "../services/cardServices"

export async function createCard(req: Request, res: Response) {
    const { employeeId, type }: { employeeId: number; type: cardRepository.TransactionTypes; } = req.body;

    const newCard = await cardService.createCard(employeeId, type);

    res.status(201).send("Card created");
}

export async function activateCard(req: Request, res: Response) {
    const { id } = req.params;
    const { securityCode, password } : { securityCode: string; password: string }  = req.body;
    const cardId = parseInt(id)
    console.log(id)

    await cardService.activateCard(cardId, securityCode, password);

    res.sendStatus(201);
}

export async function getTransactions(req: Request, res: Response) {
    const { id } = req.params;
    
}