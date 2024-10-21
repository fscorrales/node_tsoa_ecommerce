"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateLogin = exports.validateRegister = void 0;
const express_validator_1 = require("express-validator");
const main_1 = require("./main");
exports.validateRegister = [
    (0, express_validator_1.body)('username')
        .exists().withMessage('Username is required')
        .not().isEmpty().withMessage('Username cannot be empty')
        .isString().withMessage('Username must be a string')
        .escape()
        .trim(), // Sanitize: elimina espacios en blanco,
    (0, express_validator_1.body)('email')
        .exists().withMessage('Email is required')
        .isEmail().withMessage('Email must be valid')
        .normalizeEmail(), // Sanitize: normaliza el formato de correo electrónico
    (0, express_validator_1.body)('password')
        .exists().withMessage('Password is required')
        .not().isEmpty().withMessage('Password cannot be empty'),
    (0, express_validator_1.body)('role')
        .exists().withMessage('Role is required')
        .isIn(['seller', 'customer']).withMessage('Role must be either seller or customer'),
    (0, express_validator_1.body)('image')
        .optional() // optional field
        .not().isEmpty().withMessage('Image cannot be empty')
        .isString().withMessage('Image must be a string')
        .trim(), // Sanitize: elimina espacios en blanco,
    (req, res, next) => {
        (0, main_1.validateResult)(req, res, next);
    }
];
exports.validateLogin = [
    (0, express_validator_1.body)('username')
        .exists().withMessage('Username is required')
        .not().isEmpty().withMessage('Username cannot be empty')
        .isString().withMessage('Username must be a string')
        .escape()
        .trim(), // Sanitize: elimina espacios en blanco,
    (0, express_validator_1.body)('password')
        .exists().withMessage('Password is required')
        .not().isEmpty().withMessage('Password cannot be empty'),
    (req, res, next) => {
        (0, main_1.validateResult)(req, res, next);
    }
];
