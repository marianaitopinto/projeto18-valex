import { AppError } from "../errors/appError"
import * as cardRepository from "../repositories/cardRepository"
import * as employeeRepository from "../repositories/employeeRepository"


export async function createCard(employeeId: number, type: cardRepository.TransactionTypes) {
//VERIFICAR SE API É DE ALGUMA EMPRESA
//VERIFICAR SE EMPREGADO É CADASTRADO

const employeeInfo: any = await employeeRepository.findById(employeeId)
if (!employeeInfo) throw new AppError("The employee was not found", 404);

//VERIFICAR SE EMPREGADO JÁ POSSUI CARTÃO DO MESMO TIPO

}