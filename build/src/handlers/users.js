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
exports.deleteOneForever = exports.deleteOne = exports.updateOne = exports.getMe = exports.getOne = exports.getAll = exports.getAllDeleted = exports.getAllActive = exports.createOne = void 0;
const users_1 = require("../controllers/users");
const jsonwebtoken_1 = require("jsonwebtoken");
const base_config_1 = require("../config/base_config");
const createOne = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newUser = yield (0, users_1.createOneCtrl)(req.body);
        res.status(200).send(newUser);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});
exports.createOne = createOne;
const getAllActive = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allUsers = yield (0, users_1.getAllActiveCtrl)(req.query);
        // Verificar si hay usuarios
        if (allUsers.length === 0) {
            res.status(404).send('No hay usuarios disponibles.');
        }
        else {
            res.send(allUsers); // Enviar todos los usuarios
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
        const allUsers = yield (0, users_1.getAllDeletedCtrl)(req.query);
        // Verificar si hay usuarios
        if (allUsers.length === 0) {
            res.status(404).send('No hay usuarios disponibles.');
        }
        else {
            res.send(allUsers); // Enviar todos los usuarios
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
const getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allUsers = yield (0, users_1.getAllCtrl)(req.query);
        // Verificar si hay usuarios
        if (allUsers.length === 0) {
            res.status(404).send('No hay usuarios disponibles.');
        }
        else {
            res.send(allUsers); // Enviar todos los usuarios
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
const getOne = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const user = yield (0, users_1.getOneCtrl)(id);
        res.status(200).json(user);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});
exports.getOne = getOne;
const getMe = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.cookies.access_token;
        const userLogged = (0, jsonwebtoken_1.verify)(token, base_config_1.JWT_SECRET);
        const user = yield (0, users_1.getOneCtrl)(userLogged.id);
        res.status(200).json(user);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});
exports.getMe = getMe;
const updateOne = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const userUpdated = yield (0, users_1.updateOneCtrl)(id, req.body);
        res.status(200).json(userUpdated);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});
exports.updateOne = updateOne;
const deleteOne = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const userDeleted = yield (0, users_1.deleteOneCtrl)(id);
        res.status(200).json(userDeleted);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});
exports.deleteOne = deleteOne;
const deleteOneForever = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const userDeleted = yield (0, users_1.deleteOneForeverCtrl)(id);
        res.status(200).json(userDeleted);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});
exports.deleteOneForever = deleteOneForever;
