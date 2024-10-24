"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const products_1 = require("../handlers/products");
const products_2 = require("../validators/products");
const main_1 = require("../validators/main");
const token_1 = require("../security/token");
const productsRouter = (0, express_1.Router)();
productsRouter.get('/', products_2.validateQuery, products_1.getAllActive);
productsRouter.get('/deleted', token_1.verifyToken, token_1.authorizeAdmin, products_2.validateQuery, products_1.getAllDeleted);
productsRouter.get('/include_deleted', token_1.verifyToken, token_1.authorizeAdmin, products_2.validateQuery, products_1.getAll);
productsRouter.get('/:id', main_1.validateObjectId, products_1.getOne);
productsRouter.post('/', token_1.verifyToken, products_2.validateCreate, token_1.authorizeAdminOrSameSeller, products_1.createOne);
productsRouter.put('/:id', token_1.verifyToken, main_1.validateObjectId, token_1.authorizeAdminOrSameSeller, products_1.updateOne);
productsRouter.delete('/:id', token_1.verifyToken, main_1.validateObjectId, token_1.authorizeAdminOrSameSeller, products_1.deleteOne);
productsRouter.delete('/delete_forever/:id', token_1.verifyToken, token_1.authorizeAdmin, main_1.validateObjectId, products_1.deleteOneForever);
exports.default = productsRouter;
