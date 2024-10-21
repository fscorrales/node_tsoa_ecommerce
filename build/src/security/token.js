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
exports.verifyToken = exports.generateToken = exports.authorizeAdminOrSeller = exports.authorizeAdminOrSameUser = exports.authorizeAdminOrSameSeller = exports.authorizeAdmin = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const base_config_1 = require("../config/base_config");
const products_1 = require("../services/products");
const generateToken = (id, role) => {
    const jwt = (0, jsonwebtoken_1.sign)({ id, role }, base_config_1.JWT_SECRET, {
        expiresIn: '1h' // verificar que la cookie expira en 1 hora
    });
    return jwt;
};
exports.generateToken = generateToken;
// Middleware para verificar el JWT
const verifyToken = (req, res, next) => {
    var _a, _b;
    try {
        const token = req.cookies.access_token;
        const payload = (0, jsonwebtoken_1.verify)(token, base_config_1.JWT_SECRET);
        if (((_a = payload.exp) !== null && _a !== void 0 ? _a : 0) > ((_b = payload.iat) !== null && _b !== void 0 ? _b : 0)) {
            // Continuar con la siguiente función
            next();
        }
        else {
            res.status(401).json({ error: 'Token expirado' });
        }
    }
    catch (error) {
        res.status(401).json({ error: 'Token invalido' });
    }
};
exports.verifyToken = verifyToken;
const authorizeAdmin = (req, res, next) => {
    const token = req.cookies.access_token;
    const user = (0, jsonwebtoken_1.verify)(token, base_config_1.JWT_SECRET);
    if (user.role !== 'admin') {
        res
            .status(403)
            .send('Acceso denegado: Se requieren privilegios de administrador');
    }
    else {
        // Si el usuario es admin, permitir que continúe
        next();
    }
};
exports.authorizeAdmin = authorizeAdmin;
const authorizeAdminOrSameUser = (req, res, next) => {
    const token = req.cookies.access_token;
    const user = (0, jsonwebtoken_1.verify)(token, base_config_1.JWT_SECRET);
    const { id } = req.params;
    if (user.role !== 'admin' && user.id !== id) {
        res
            .status(403)
            .send('Acceso denegado: Solo el propio usuario tiene permisos o el administrador');
    }
    else {
        // Si el usuario es admin, permitir que continúe
        next();
    }
};
exports.authorizeAdminOrSameUser = authorizeAdminOrSameUser;
const authorizeAdminOrSeller = (req, res, next) => {
    const token = req.cookies.access_token;
    const user = (0, jsonwebtoken_1.verify)(token, base_config_1.JWT_SECRET);
    if (user.role !== 'admin' && user.role !== 'seller') {
        res
            .status(403)
            .send('Acceso denegado: Se requieren privilegios de administrador o vendedor');
    }
    else {
        // Si el usuario es admin, permitir que continúe
        next();
    }
};
exports.authorizeAdminOrSeller = authorizeAdminOrSeller;
const authorizeAdminOrSameSeller = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.cookies.access_token;
        const user = (0, jsonwebtoken_1.verify)(token, base_config_1.JWT_SECRET);
        const { id } = req.params;
        const product = id !== undefined && id.trim() !== '' ? yield (0, products_1.getOne)(id, false) : { seller_id: req.body.seller_id };
        const sellerId = product.seller_id.toString();
        console.log(user.id, sellerId);
        if (user.role !== 'admin' && (user.id !== sellerId || user.role !== 'seller')) {
            res
                .status(403)
                .send('Acceso denegado: Solo el propio vendedor tiene permisos o el administrador');
        }
        else {
            // Si el usuario es admin, permitir que continúe
            next();
        }
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});
exports.authorizeAdminOrSameSeller = authorizeAdminOrSameSeller;
