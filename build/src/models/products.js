"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Products = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const productSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    image: {
        type: String,
        required: false
    },
    seller_id: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    deactivated_at: {
        type: Date,
        required: false
    }
}, {
    statics: {
        getDeleted: function (queryProduct = {}) {
            return this.find(Object.assign({ deactivated_at: { $ne: null } }, queryProduct)).lean();
        },
        getNotDeleted: function (queryProduct = {}) {
            return this.find(Object.assign({ deactivated_at: { $eq: null } }, queryProduct)).lean();
        }
    },
    versionKey: false,
    strict: true
});
exports.Products = mongoose_1.default.model('products', productSchema);
