import * as companyRepository from "../repositories/companyRepository";
import { AppError } from "../errors/appError"

export async function validateApiKey(apiKey: string) {
    const companyInfo = await companyRepository.findByApiKey(apiKey)
    
    if (!companyInfo) throw new AppError("API key was not found", 404);

    return companyInfo;
}