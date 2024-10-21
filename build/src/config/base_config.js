"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MONGODB_URI = exports.JWT_SECRET = exports.SALT_ROUND = exports.PORT = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
_a = process.env, _b = _a.PORT, exports.PORT = _b === void 0 ? 3000 : _b, _c = _a.SALT_ROUND, exports.SALT_ROUND = _c === void 0 ? 10 : _c, _d = _a.JWT_SECRET, exports.JWT_SECRET = _d === void 0 ? 'super_secret_key' : _d, _e = _a.MONGODB_URI, exports.MONGODB_URI = _e === void 0 ? 'mongodb://127.0.0.1:27017/bootcamp_eCommerce_app' : _e;
