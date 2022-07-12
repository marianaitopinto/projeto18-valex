import { AppError } from "../errors/appError";
import dayjs from "dayjs";
import Cryptr from "cryptr";

import * as cardRepository from "../repositories/cardRepository"

export function createCardName(name: string) {
  const nameArray = name.toUpperCase().split(" ");
  const cardName = [];

  for (let i = 0; i <= nameArray.length; i++) {
    if (i === nameArray.length - 1 || i === 0) {
      cardName.push(nameArray[i]);
    }

    //FIX-ME INSERIR OS NOMES DO MEIO
  }

  return cardName.join(" ");
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
    console.log(cryptr.decrypt(cardData.securityCode))
  if (securityCode !== cryptr.decrypt(cardData.securityCode))
    throw new AppError("Unauthorized", 401);

  return;
}

export async function checkCardExist(cardId: number) {
    const cardData = await cardRepository.findById(cardId);
    if (!cardData) throw new AppError("The card was not found", 404);

    return cardData;
}