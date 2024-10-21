"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateQuery = exports.validateUpdate = exports.validateCreate = void 0;
const express_validator_1 = require("express-validator");
const main_1 = require("./main");
const mongodb_1 = require("mongodb");
exports.validateCreate = [
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
        .isIn(['seller', 'customer', 'admin']).withMessage('Role must be either seller, customer or admin'),
    (0, express_validator_1.body)('image')
        .optional() // optional field
        .not().isEmpty().withMessage('Image cannot be empty')
        .isString().withMessage('Image must be a string')
        .trim(), // Sanitize: elimina espacios en blanco,
    (req, res, next) => {
        (0, main_1.validateResult)(req, res, next);
    }
];
exports.validateUpdate = [
    (0, express_validator_1.body)('username')
        .optional() // optional field
        .not().isEmpty().withMessage('Username cannot be empty')
        .isString().withMessage('Username must be a string')
        .escape()
        .trim(), // Sanitize: elimina espacios en blanco,
    (0, express_validator_1.body)('email')
        .optional() // optional field
        .isEmail().withMessage('Email must be valid')
        .normalizeEmail(), // Sanitize: normaliza el formato de correo electrónico
    (0, express_validator_1.body)('image')
        .optional() // optional field
        .not().isEmpty().withMessage('Image cannot be empty')
        .isString().withMessage('Image must be a string')
        .trim(), // Sanitize: elimina espacios en blanco,
    (req, res, next) => {
        (0, main_1.validateResult)(req, res, next);
    }
];
exports.validateQuery = [
    (0, express_validator_1.body)('username')
        .optional() // optional field
        .not().isEmpty().withMessage('Username cannot be empty')
        .isString().withMessage('Username must be a string')
        .escape()
        .trim(), // Sanitize: elimina espacios en blanco,
    (0, express_validator_1.body)('role')
        .optional() // optional field
        .isIn(['seller', 'customer', 'admin']).withMessage('Role must be either seller, customer or admin'),
    (0, express_validator_1.body)('email')
        .optional() // optional field
        .isEmail().withMessage('Email must be valid')
        .normalizeEmail(), // Sanitize: normaliza el formato de correo electrónico
    (0, express_validator_1.body)('image')
        .optional() // optional field
        .not().isEmpty().withMessage('Image cannot be empty')
        .isString().withMessage('Image must be a string')
        .trim(), // Sanitize: elimina espacios en blanco,
    (0, express_validator_1.query)('_id')
        .optional() // optional field
        .not().isEmpty().withMessage("User's ID cannot be empty")
        .custom((value) => {
        if (!mongodb_1.ObjectId.isValid(value)) {
            throw new Error('Invalid ObjectId');
        }
        return true;
    }),
    (req, res, next) => {
        (0, main_1.validateResult)(req, res, next);
    }
];
