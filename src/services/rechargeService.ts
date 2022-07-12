import { AppError } from "../errors/appError";
import * as cardUtil from "../utils/cardUtils";
import * as rechargeRepository from "../repositories/rechargeRepository";

export async function rechargeCard(cardId: number, amount: number) {
  const cardData = await cardUtil.checkCardExist(cardId);

  if (!cardData.password) throw new AppError("The card is not activate", 409);

  await cardUtil.checkIfCardIsExpired(cardData.expirationDate);

  const recharge = { cardId, amount };
  await rechargeRepository.insert(recharge);
}
