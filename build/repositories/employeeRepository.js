"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findById = void 0;
const db_1 = require("../config/db");
async function findById(id) {
    const result = await db_1.connection.query("SELECT * FROM employees WHERE id=$1", [id]);
    return result.rows[0];
}
exports.findById = findById;
