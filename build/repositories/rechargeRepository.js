"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.insert = exports.findByCardId = void 0;
const db_1 = require("../config/db");
async function findByCardId(cardId) {
    const result = await db_1.connection.query(`SELECT * FROM recharges WHERE "cardId"=$1`, [cardId]);
    return result.rows;
}
exports.findByCardId = findByCardId;
async function insert(rechargeData) {
    const { cardId, amount } = rechargeData;
    db_1.connection.query(`INSERT INTO recharges ("cardId", amount) VALUES ($1, $2)`, [cardId, amount]);
}
exports.insert = insert;
