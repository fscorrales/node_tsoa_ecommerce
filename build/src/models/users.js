"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Users = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    hash_password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['admin', 'seller', 'customer'],
        default: 'customer'
    },
    image: {
        type: String,
        required: false
    },
    deactivated_at: {
        type: Date,
        required: false
    }
}, {
    statics: {
        getDeleted: function (queryUser = {}) {
            return this.find(Object.assign({ deactivated_at: { $ne: null } }, queryUser)).lean();
        },
        getNotDeleted: function (queryUser = {}) {
            return this.find(Object.assign({ deactivated_at: { $eq: null } }, queryUser)).lean();
        }
    },
    versionKey: false,
    strict: true
});
exports.Users = mongoose_1.default.model('users', userSchema);
