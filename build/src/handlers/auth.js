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
exports.logout = exports.login = exports.register = void 0;
const authOld_1 = require("../controllers/authOld");
// Handler para manejar el regiter
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, authOld_1.registerCtrl)(req.body);
        res.send(result);
    }
    catch (err) {
        if (err.message === 'Usuario registrado') {
            // Código 409 (conflict) para usuarios ya registrados
            res.status(409).send('Usuario ya registrado');
        }
        res.status(500).send('Ocurrió un error inesperado');
    }
});
exports.register = register;
// Handler para manejar el login
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = yield (0, authOld_1.loginCtrl)(req.body);
        res
            .cookie('access_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 1000 * 60 * 60 // 1 hora
        })
            .send({ message: 'Inicio de sesión exitoso' });
    }
    catch (err) {
        res.status(401).send({ message: err.message });
    }
});
exports.login = login;
const logout = (_, res) => {
    try {
        console.log('Cierre de sesión');
        res
            .clearCookie('access_token')
            .status(200)
            .send({ message: 'Cierre de sesión exitoso' });
    }
    catch (error) {
        res.status(500).send({ message: error.message });
    }
};
exports.logout = logout;
