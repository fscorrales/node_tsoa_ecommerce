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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const base_config_1 = require("./base_config");
// const COLLECTIONS = ['products', 'users', 'orders']
const connectDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const uri = base_config_1.MONGODB_URI !== null && base_config_1.MONGODB_URI !== void 0 ? base_config_1.MONGODB_URI : '';
    if (uri.length > 0) {
        yield mongoose_1.default.connect(uri);
    }
    else {
        throw Error('MongoDB connection failed!');
    }
});
exports.connectDB = connectDB;
const db = mongoose_1.default.connection;
db.on('error', () => {
    console.log('MongoDB connection error. Please make sure MongoDB is running.');
    process.exit(1);
});
db.once('open', () => {
    console.log('MongoDB connected successfully!');
});
