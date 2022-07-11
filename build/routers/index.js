"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cardRouter_1 = __importDefault(require("./cardRouter"));
const routers = (0, express_1.Router)();
routers.use(cardRouter_1.default);
exports.default = routers;
