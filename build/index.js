"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_1 = __importDefault(require("./routers/index"));
const errorHandlingMiddleware_1 = __importDefault(require("./middlewares/errorHandlingMiddleware"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(index_1.default);
app.use(errorHandlingMiddleware_1.default);
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server up and running on port ${port}`);
});
