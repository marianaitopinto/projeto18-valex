import { AppError } from "../errors/appError";
import dayjs from "dayjs";
import Cryptr from "cryptr";
import bcrypt from "bcrypt";

import * as cardRepository from "../repositories/cardRepository";

export function createCardName(name: string) {
  const nameArray = name.toUpperCase().split(" ");
  let cardName: string = nameArray[0];

  for (let i = 1; i < nameArray.length - 1; i++) {
    if (nameArray[i].length >2) {
      cardName += ` ${nameArray[i][0]}`
    }
  }

  cardName += ` ${nameArray[nameArray.length -1]}`

  return cardName;
}

/*export function checkIfCardIsExpired(date: string) {
  const dateFormat = date.split("/");
  const isExpired = 

  if (isExpired) throw new AppError("The card is expired", 403);

  return;
}*/

export function checkCvv(securityCode: string, cardData: any) {
  const cryptr = new Cryptr("myTotallySecretKey");
  console.log(securityCode);
  console.log(cryptr.decrypt(cardData.securityCode));
  if (securityCode !== cryptr.decrypt(cardData.securityCode))
    throw new AppError("Unauthorized", 401);

  return;
}

export async function checkCardExist(cardId: number) {
  const cardData = await cardRepository.findById(cardId);
  if (!cardData) throw new AppError("The card was not found", 404);

  return cardData;
}

export function getBalance(recharges: any, payments: any) {
  let rechargesTotal = 0;
  let paymentsTotal = 0;

  recharges.map((recharge: any) => {
    rechargesTotal += recharge.amount;
  });

  payments.map((payment: any) => {
    paymentsTotal += payment.amount;
  });

  const balance = rechargesTotal - paymentsTotal;

  return balance;
}

export function checkPassword(password: string, encryptPassword: any) {
  console.log(password);
  console.log(encryptPassword);
  const check = bcrypt.compareSync(password, encryptPassword);
  console.log(check);
  if (!check) throw new AppError("Unauthorized", 401);

  return;
}
