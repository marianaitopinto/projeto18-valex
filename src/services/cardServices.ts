import { AppError } from "../errors/appError"
import { faker } from '@faker-js/faker';
//import Cryptr from "cryptr";
import dayjs from "dayjs";

import * as cardRepository from "../repositories/cardRepository"
import * as employeeRepository from "../repositories/employeeRepository"
import * as cardUtil from "../utils/cardUtils"

export async function createCard(employeeId: number, type: cardRepository.TransactionTypes) {
//VERIFICAR SE API É DE ALGUMA EMPRESA


//VERIFICAR SE EMPREGADO É CADASTRADO
const employeeInfo: any = await employeeRepository.findById(employeeId)
if (!employeeInfo) throw new AppError("The employee was not found", 404);

//VERIFICAR SE EMPREGADO JÁ POSSUI CARTÃO DO MESMO TIPO
const employeeCardType: any = await cardRepository.findByTypeAndEmployeeId(type, employeeId);
if (employeeCardType) throw new AppError("The employee already has a card of the same type", 409);

//GERAR NÚMERO DE CARTÃO - FAKER

//FORMATAR NOME PARA CARTÃO
const employeeName = await cardUtil.createCardName(employeeInfo.fullName);
//CRIAR DATA DE EXPIRAÇÃO

//CRIAR CÓDIGO CVV - FAKER E CRYPTR
const cardInfo = await createCardInfo(employeeInfo, employeeName, type)
console.log(cardInfo)

await cardRepository.insert(cardInfo);

}

export async function createCardInfo(employeeInfo: any, cardholderName: string, type: cardRepository.TransactionTypes) {

const number = faker.finance.creditCardNumber();
const securityCode = faker.finance.creditCardCVV();
//FIXME ENCRIPTAR CVV
const expirationDate = dayjs().add(5, 'years').format("MM/YY")

const card: cardRepository.CardInsertData = {
    employeeId: employeeInfo.id,
    number,
    cardholderName,
    securityCode,
    expirationDate,
    isVirtual: false,
    isBlocked: true,
    type
}

return card;
}