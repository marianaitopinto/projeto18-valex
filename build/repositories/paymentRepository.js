"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.insert = exports.findByCardId = void 0;
const db_1 = require("../config/db");
async function findByCardId(cardId) {
    const result = await db_1.connection.query(`SELECT 
      payments.*,
      businesses.name as "businessName"
     FROM payments 
      JOIN businesses ON businesses.id=payments."businessId"
     WHERE "cardId"=$1
    `, [cardId]);
    return result.rows;
}
exports.findByCardId = findByCardId;
async function insert(paymentData) {
    const { cardId, businessId, amount } = paymentData;
    db_1.connection.query(`INSERT INTO payments ("cardId", "businessId", amount) VALUES ($1, $2, $3)`, [cardId, businessId, amount]);
}
exports.insert = insert;
