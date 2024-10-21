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
exports.loginCtrl = exports.registerCtrl = void 0;
const users_1 = require("./users");
const users_2 = require("../models/users");
const password_1 = require("../security/password");
const token_1 = require("../security/token");
// Controlador para registrarse
const registerCtrl = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const newUser = yield (0, users_1.createOneCtrl)(user);
    return newUser;
});
exports.registerCtrl = registerCtrl;
// Controlador para iniciar sesión (login)
const loginCtrl = (user) => __awaiter(void 0, void 0, void 0, function* () {
    // Buscar si el usuario con el email proporcionado existe en el arreglo de users
    const existedUser = yield users_2.Users.findOne({ username: user.username }).lean();
    if (existedUser == null) {
        throw new Error('Usuario no encontrado');
    }
    // Comparar la contraseña recibida sin hashear con la contraseña hasheada almacenada
    const isPasswordMatch = yield (0, password_1.verified)(user.password, existedUser.hash_password);
    if (!isPasswordMatch) {
        throw new Error('Contraseña incorrecta');
    }
    // Crear un token JWT con el id del usuario y el rol
    const token = (0, token_1.generateToken)(existedUser._id.toString(), existedUser.role);
    // Si todo coincide, retornar el usuario
    return token;
});
exports.loginCtrl = loginCtrl;
