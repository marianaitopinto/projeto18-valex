import { AppError } from "../errors/appError";
import * as cardUtil from "../utils/cardUtils";
import * as businessRepository from "../repositories/businessRepository";
import * as paymentRepository from "../repositories/paymentRepository";
import * as rechargeRepository from "../repositories/rechargeRepository";

export async function addPaymentPos(
  cardId: number,
  businessId: number,
  password: string,
  amount: number
) {
  const cardData = await cardUtil.checkCardExist(cardId);

  if (!cardData.password) throw new AppError("The card is not activate", 409);

  await cardUtil.checkIfCardIsExpired(cardData.expirationDate);

  if (cardData.isBlocked) throw new AppError("The card is blocked", 401);

  await cardUtil.checkPassword(password, cardData.password);

  const business = await businessRepository.findById(businessId);
  if (!business) throw new AppError("The business is not registered", 401);

  if (business.type !== cardData.type) throw new AppError("Type not authorized", 401);

  const recharges = await rechargeRepository.findByCardId(cardId);
  const payments = await paymentRepository.findByCardId(cardId);
  const balance = await cardUtil.getBalance(recharges, payments);
  if (balance < amount) throw new AppError("Insufficient funds ", 401);

  await paymentRepository.insert({ cardId, businessId, amount})
}
