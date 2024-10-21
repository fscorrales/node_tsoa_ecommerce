"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = __importDefault(require("./auth"));
const products_1 = __importDefault(require("./products"));
const users_1 = __importDefault(require("./users"));
const mainRouter = (0, express_1.Router)();
mainRouter.use('/auth', auth_1.default);
mainRouter.use('/users', users_1.default);
mainRouter.use('/products', products_1.default);
exports.default = mainRouter;
