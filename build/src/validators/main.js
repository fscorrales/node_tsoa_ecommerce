"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateObjectId = exports.validateResult = void 0;
const express_validator_1 = require("express-validator");
const mongodb_1 = require("mongodb");
const validateResult = (req, res, next) => {
    try {
        (0, express_validator_1.validationResult)(req).throw();
        next();
    }
    catch (error) {
        res.status(403);
        res.send({ errors: error.array() });
    }
};
exports.validateResult = validateResult;
exports.validateObjectId = [
    (0, express_validator_1.param)('id')
        .exists().withMessage('ID is required')
        .not().isEmpty().withMessage('ID cannot be empty')
        .custom((value) => {
        if (!mongodb_1.ObjectId.isValid(value)) {
            throw new Error('Invalid ObjectId');
        }
        return true;
    }),
    (req, res, next) => {
        (0, exports.validateResult)(req, res, next);
    }
];
