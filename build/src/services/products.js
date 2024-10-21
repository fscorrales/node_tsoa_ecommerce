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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOneHard = exports.deleteOne = exports.updateOne = exports.getOne = exports.getAll = exports.getAllDeleted = exports.getAllActive = exports.createOne = void 0;
const products_1 = require("../models/products");
const users_1 = require("../models/users");
// Controlador para crear un nuevo usuario
const createOne = (product) => __awaiter(void 0, void 0, void 0, function* () {
    const existedUser = yield users_1.Users.findById(product.seller_id);
    if (existedUser == null) {
        throw new Error('Seller not found by ID');
    }
    console.log(product);
    const newProduct = yield products_1.Products.create(product);
    return newProduct;
});
exports.createOne = createOne;
const getAllActive = (...args_1) => __awaiter(void 0, [...args_1], void 0, function* (queryProduct = {}) {
    const products = yield products_1.Products.getNotDeleted(queryProduct);
    return products;
});
exports.getAllActive = getAllActive;
const getAllDeleted = (...args_1) => __awaiter(void 0, [...args_1], void 0, function* (queryProduct = {}) {
    const products = yield products_1.Products.getDeleted(queryProduct);
    return products;
});
exports.getAllDeleted = getAllDeleted;
const getAll = (...args_1) => __awaiter(void 0, [...args_1], void 0, function* (queryProduct = {}) {
    return yield products_1.Products.find(queryProduct);
});
exports.getAll = getAll;
const getOne = (id_1, ...args_1) => __awaiter(void 0, [id_1, ...args_1], void 0, function* (id, populate = true) {
    let product = null;
    if (populate) {
        product = yield products_1.Products.findById(id).populate({ path: 'seller_id', select: '-hash_password' }).lean();
    }
    else {
        product = yield products_1.Products.findById(id);
    }
    if (product == null) {
        throw new Error('Product not found');
    }
    return product;
});
exports.getOne = getOne;
const updateOne = (id, product) => __awaiter(void 0, void 0, void 0, function* () {
    const { seller_id: sellerId } = product, productWithoutSellerId = __rest(product, ["seller_id"]);
    const productUpdated = yield products_1.Products.findByIdAndUpdate(id, productWithoutSellerId, { new: true }).lean();
    if (productUpdated == null) {
        throw new Error('Product not found');
    }
    return productUpdated;
});
exports.updateOne = updateOne;
const deleteOne = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const productDeleted = yield products_1.Products.findByIdAndUpdate(id, { deactivated_at: Date.now() }, { new: true }).lean();
    if (productDeleted == null) {
        throw new Error('Product not found');
    }
    return productDeleted;
});
exports.deleteOne = deleteOne;
const deleteOneHard = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const productDeleted = yield products_1.Products.findByIdAndDelete(id).lean();
    if (productDeleted == null) {
        throw new Error('Product not found');
    }
    return productDeleted;
});
exports.deleteOneHard = deleteOneHard;
