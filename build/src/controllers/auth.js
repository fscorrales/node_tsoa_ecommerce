"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
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
exports.AuthController = void 0;
const tsoa_1 = require("tsoa");
const auth_1 = require("../services/auth");
const users_1 = require("../services/users");
let AuthController = class AuthController extends tsoa_1.Controller {
    loginCtrl(user, req) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = req.res;
            if (response == null) {
                throw new Error('Response object is missing');
            }
            try {
                const token = yield (0, auth_1.login)(user);
                response
                    .cookie('access_token', token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    sameSite: 'strict',
                    maxAge: 1000 * 60 * 60 // 1 hora
                })
                    .send({ message: 'Inicio de sesión exitoso' });
            }
            catch (err) {
                response.status(401).send({ message: err.message });
            }
        });
    }
    registerCtrl(user, req) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = req.res;
            if (response == null) {
                throw new Error('Response object is missing');
            }
            try {
                const result = yield (0, users_1.createOne)(user);
                response.send(result);
            }
            catch (err) {
                if (err.message === 'User already exists') {
                    // Código 409 (conflict) para usuarios ya registrados
                    response.status(409).send('User already exists');
                }
                response.status(500).send('Ocurrió un error inesperado');
            }
        });
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, tsoa_1.Post)('login'),
    __param(0, (0, tsoa_1.Body)()),
    __param(1, (0, tsoa_1.Request)())
], AuthController.prototype, "loginCtrl", null);
__decorate([
    (0, tsoa_1.Post)('register'),
    __param(0, (0, tsoa_1.Body)()),
    __param(1, (0, tsoa_1.Request)())
], AuthController.prototype, "registerCtrl", null);
exports.AuthController = AuthController = __decorate([
    (0, tsoa_1.Route)('auth'),
    (0, tsoa_1.Tags)('Auth')
], AuthController);
