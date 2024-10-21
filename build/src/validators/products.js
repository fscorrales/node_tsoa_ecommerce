"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateQuery = exports.validateUpdate = exports.validateCreate = void 0;
const express_validator_1 = require("express-validator");
const main_1 = require("./main");
const mongodb_1 = require("mongodb");
exports.validateCreate = [
    (0, express_validator_1.body)('name')
        .not().isEmpty().withMessage("Product's name cannot be empty")
        .isString().withMessage("Product's name must be a string")
        .escape(),
    (0, express_validator_1.body)('price')
        .not().isEmpty().withMessage('Price cannot be empty')
        .isNumeric().withMessage('Price must be a number'),
    (0, express_validator_1.body)('quantity')
        .not().isEmpty().withMessage('Quantity cannot be empty')
        .isNumeric().withMessage('Quantity must be a number'),
    (0, express_validator_1.body)('description')
        .not().isEmpty().withMessage('Description cannot be empty')
        .isString().withMessage('Description must be a string')
        .escape(),
    (0, express_validator_1.body)('image')
        .optional() // optional field
        .not().isEmpty().withMessage('Image cannot be empty')
        .isString().withMessage('Image must be a string')
        .trim(), // Sanitize: elimina espacios en blanco,
    (0, express_validator_1.body)('seller_id')
        .not().isEmpty().withMessage("Seller's ID cannot be empty")
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
exports.validateUpdate = [
    (0, express_validator_1.body)('username')
        .optional() // optional field
        .not().isEmpty().withMessage('Username cannot be empty')
        .isString().withMessage('Image must be a string')
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
    (0, express_validator_1.query)('name')
        .optional() // optional field
        .not().isEmpty().withMessage("Product's name cannot be empty")
        .isString().withMessage("Product's name must be a string")
        .escape(),
    (0, express_validator_1.query)('description')
        .optional() // optional field
        .not().isEmpty().withMessage('Description cannot be empty')
        .isString().withMessage('Description must be a string')
        .escape(),
    (0, express_validator_1.query)('image')
        .optional() // optional field
        .not().isEmpty().withMessage('Image cannot be empty')
        .isString().withMessage('Image must be a string')
        .trim(), // Sanitize: elimina espacios en blanco,
    (0, express_validator_1.query)('seller_id')
        .optional() // optional field
        .not().isEmpty().withMessage("Seller's ID cannot be empty")
        .custom((value) => {
        if (!mongodb_1.ObjectId.isValid(value)) {
            throw new Error('Invalid ObjectId');
        }
        return true;
    }),
    (0, express_validator_1.query)('_id')
        .optional() // optional field
        .not().isEmpty().withMessage("Product's ID cannot be empty")
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
