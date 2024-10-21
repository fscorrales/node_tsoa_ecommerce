"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOneForever = exports.deleteOne = exports.updateOne = exports.createOne = exports.getOne = exports.getAllDeleted = exports.getAllActive = exports.getAll = void 0;
const products_1 = require("../controllers/products");
const getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allProducts = yield (0, products_1.getAllCtrl)(req.query);
        if (allProducts.length === 0) {
            res.status(404).send('No hay productos disponibles.');
        }
        else {
            res.send(allProducts); // Enviar todos los usuarios
        }
    }
    catch (error) {
        // Manejar cualquier error inesperado
        console.error(error.message);
        res
            .status(500)
            .send('Ocurrió un error inesperado. Intente nuevamente más tarde.');
    }
});
exports.getAll = getAll;
const getAllActive = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allProducts = yield (0, products_1.getAllActiveCtrl)(req.query);
        // Verificar si hay usuarios
        if (allProducts.length === 0) {
            res.status(404).send('No hay productos disponibles.');
        }
        else {
            res.send(allProducts); // Enviar todos los usuarios
        }
    }
    catch (error) {
        // Manejar cualquier error inesperado
        console.error(error.message);
        res
            .status(500)
            .send('Ocurrió un error inesperado. Intente nuevamente más tarde.');
    }
});
exports.getAllActive = getAllActive;
const getAllDeleted = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allProducts = yield (0, products_1.getAllDeletedCtrl)(req.query);
        // Verificar si hay usuarios
        if (allProducts.length === 0) {
            res.status(404).send('No hay productos disponibles.');
        }
        else {
            res.send(allProducts); // Enviar todos los usuarios
        }
    }
    catch (error) {
        // Manejar cualquier error inesperado
        console.error(error.message);
        res
            .status(500)
            .send('Ocurrió un error inesperado. Intente nuevamente más tarde.');
    }
});
exports.getAllDeleted = getAllDeleted;
const getOne = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const product = yield (0, products_1.getOneCtrl)(id);
        res.status(200).json(product);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});
exports.getOne = getOne;
const createOne = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newProduct = yield (0, products_1.createOneCtrl)(req.body);
        res.status(200).send(newProduct);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});
exports.createOne = createOne;
const updateOne = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const productUpdated = yield (0, products_1.updateOneCtrl)(id, req.body);
        res.status(200).json(productUpdated);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});
exports.updateOne = updateOne;
const deleteOne = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const productDeleted = yield (0, products_1.deleteOneCtrl)(id);
        res.status(200).json(productDeleted);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});
exports.deleteOne = deleteOne;
const deleteOneForever = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const productDeleted = yield (0, products_1.deleteOneForeverCtrl)(id);
        res.status(200).json(productDeleted);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});
exports.deleteOneForever = deleteOneForever;
