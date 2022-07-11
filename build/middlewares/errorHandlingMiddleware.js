"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
async function handleError(error, req, res, next) {
    if (error.type == "Not Found") {
        return res.status(404).send(`${error.type}`);
    }
    return res.status(500).send("Internal Server Error");
}
exports.default = handleError;
