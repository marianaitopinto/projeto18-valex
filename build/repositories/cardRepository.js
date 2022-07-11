"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = exports.update = exports.insert = exports.findByCardDetails = exports.findByTypeAndEmployeeId = exports.findById = exports.find = void 0;
const db_1 = require("../config/db");
const sqlUtils_1 = require("../utils/sqlUtils");
async function find() {
    const result = await db_1.connection.query("SELECT * FROM cards");
    return result.rows;
}
exports.find = find;
async function findById(id) {
    const result = await db_1.connection.query("SELECT * FROM cards WHERE id=$1", [id]);
    return result.rows[0];
}
exports.findById = findById;
async function findByTypeAndEmployeeId(type, employeeId) {
    const result = await db_1.connection.query(`SELECT * FROM cards WHERE type=$1 AND "employeeId"=$2`, [type, employeeId]);
    return result.rows[0];
}
exports.findByTypeAndEmployeeId = findByTypeAndEmployeeId;
async function findByCardDetails(number, cardholderName, expirationDate) {
    const result = await db_1.connection.query(` SELECT 
        * 
      FROM cards 
      WHERE number=$1 AND "cardholderName"=$2 AND "expirationDate"=$3`, [number, cardholderName, expirationDate]);
    return result.rows[0];
}
exports.findByCardDetails = findByCardDetails;
async function insert(cardData) {
    const { employeeId, number, cardholderName, securityCode, expirationDate, password, isVirtual, originalCardId, isBlocked, type, } = cardData;
    db_1.connection.query(`
    INSERT INTO cards ("employeeId", number, "cardholderName", "securityCode",
      "expirationDate", password, "isVirtual", "originalCardId", "isBlocked", type)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
  `, [
        employeeId,
        number,
        cardholderName,
        securityCode,
        expirationDate,
        password,
        isVirtual,
        originalCardId,
        isBlocked,
        type,
    ]);
}
exports.insert = insert;
async function update(id, cardData) {
    const { objectColumns: cardColumns, objectValues: cardValues } = (0, sqlUtils_1.mapObjectToUpdateQuery)({
        object: cardData,
        offset: 2,
    });
    db_1.connection.query(`
    UPDATE cards
      SET ${cardColumns}
    WHERE $1=id
  `, [id, ...cardValues]);
}
exports.update = update;
async function remove(id) {
    db_1.connection.query("DELETE FROM cards WHERE id=$1", [id]);
}
exports.remove = remove;
