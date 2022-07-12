import { Request, Response } from "express";

import * as paymentService from "../services/paymentServices"

export async function paymentPos(req: Request, res: Response) {
    const { cardId, businessId, password, amount } : { cardId: number; businessId: number; password: string; amount: number } = req.body;

    await paymentService.addPaymentPos(cardId, businessId, password, amount);

    res.sendStatus(201);
}