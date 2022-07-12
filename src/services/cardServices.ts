import { AppError } from "../errors/appError";
import { faker } from "@faker-js/faker";
import Cryptr from "cryptr";
import dayjs from "dayjs";
import bcrypt from "bcrypt";

import * as cardRepository from "../repositories/cardRepository";
import * as employeeRepository from "../repositories/employeeRepository";
import * as paymentRepository from "../repositories/paymentRepository";
import * as rechargeRepository from "../repositories/rechargeRepository";
import * as cardUtil from "../utils/cardUtils";

export async function createCard(
  employeeId: number,
  type: cardRepository.TransactionTypes
) {
  const employeeInfo: any = await employeeRepository.findById(employeeId);
  if (!employeeInfo) throw new AppError("The employee was not found", 404);

  const employeeCardType: any = await cardRepository.findByTypeAndEmployeeId(
    type,
    employeeId
  );
  if (employeeCardType)
    throw new AppError("The employee already has a card of the same type", 409);

  const employeeName = await cardUtil.createCardName(employeeInfo.fullName);

  const cardInfo = await createCardInfo(employeeInfo, employeeName, type);

  await cardRepository.insert(cardInfo);
}

export async function createCardInfo(
  employeeInfo: any,
  cardholderName: string,
  type: cardRepository.TransactionTypes
) {
  const number = faker.finance.creditCardNumber();
  const securityCode = faker.finance.creditCardCVV();
  const cryptr = new Cryptr("myTotallySecretKey");
  const encryptSecurityCode = cryptr.encrypt(securityCode);
  const expirationDate = dayjs().add(5, "years").format("MM/YY");

  const card: cardRepository.CardInsertData = {
    employeeId: employeeInfo.id,
    number,
    cardholderName,
    securityCode: encryptSecurityCode,
    expirationDate,
    isVirtual: false,
    isBlocked: true,
    type,
  };

  return card;
}

export async function activateCard(
  cardId: number,
  securityCode: string,
  password: string
) {
  const cardData = await cardUtil.checkCardExist(cardId);

  //await cardUtil.checkIfCardIsExpired(cardData.expirationDate);

  if (cardData.password)
    throw new AppError("The card is already activate", 409);

  await cardUtil.checkCvv(securityCode, cardData);

  const hashPassword = bcrypt.hashSync(password, 10);
  const updateData = { password: hashPassword };

  await cardRepository.update(cardId, updateData);
}

export async function getBalanceCard(cardId: number) {
  const cardData = await cardUtil.checkCardExist(cardId);

  const recharges = await rechargeRepository.findByCardId(cardId);
  const payments = await paymentRepository.findByCardId(cardId);

  const balance = await cardUtil.getBalance(recharges, payments);

  return { balance, transactions: payments, recharges };
}

export async function blockCard(cardId: number, password: string) {
  const cardData = await cardUtil.checkCardExist(cardId);

  if (cardData.isBlocked)
    throw new AppError("The card is already blocked", 401);

  //VERIFICAR SE ESTÁ EXPIRADO - ARRUMAR FUNÇÃO

  await cardUtil.checkPassword(password, cardData.password);

  await cardRepository.update(cardId, { isBlocked: true });
}

export async function unblockCard(cardId: number, password: string) {
  const cardData = await cardUtil.checkCardExist(cardId);

  if (!cardData.isBlocked)
    throw new AppError("The card is already unblocked", 401);

  //VERIFICAR SE ESTÁ EXPIRADO - ARRUMAR FUNÇÃO

  await cardUtil.checkPassword(password, cardData.password);

  await cardRepository.update(cardId, { isBlocked: false });
}
