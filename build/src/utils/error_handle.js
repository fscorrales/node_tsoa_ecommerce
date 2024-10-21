"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tsoaNotFoundHandler = exports.tsoaErrorHandler = exports.handleHttp = void 0;
const tsoa_1 = require("tsoa");
const handleHttp = (res, error, errorRaw) => {
    console.log(errorRaw);
    res.status(500);
    res.send({ error });
};
exports.handleHttp = handleHttp;
const tsoaErrorHandler = (err, req, res, next) => {
    if (err instanceof tsoa_1.ValidateError) {
        console.warn(`Caught Validation Error for ${req.path}:`, err.fields);
        res.status(422).json({
            message: 'Validation Failed',
            details: err === null || err === void 0 ? void 0 : err.fields
        });
    }
    if (err instanceof Error) {
        res.status(500).json({
            message: 'Internal Server Error'
        });
    }
    next();
};
exports.tsoaErrorHandler = tsoaErrorHandler;
const tsoaNotFoundHandler = (_, res, next) => {
    res.status(404).send({
        message: 'Not Found'
    });
    next();
};
exports.tsoaNotFoundHandler = tsoaNotFoundHandler;
