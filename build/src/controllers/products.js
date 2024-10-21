"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsController = void 0;
const tsoa_1 = require("tsoa");
const products_1 = require("../services/products");
let ProductsController = class ProductsController extends tsoa_1.Controller {
    createOneCtrl(product, req) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = req.res;
            if (response == null) {
                throw new Error('Response object is missing');
            }
            try {
                const newProduct = yield (0, products_1.createOne)(product);
                response.status(200).send(newProduct);
            }
            catch (error) {
                response.status(500).send(error.message);
            }
        });
    }
    getAllActiveCtrl(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = req.res;
            if (response == null) {
                throw new Error('Response object is missing');
            }
            try {
                const products = yield (0, products_1.getAllActive)();
                if (products.length === 0) {
                    response.status(404).send('No products found');
                }
                else {
                    response.status(200).json(products);
                }
            }
            catch (error) {
                response.status(500).send(error.message);
            }
        });
    }
    getAllDeletedCtrl(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = req.res;
            if (response == null) {
                throw new Error('Response object is missing');
            }
            try {
                const products = yield (0, products_1.getAllDeleted)();
                if (products.length === 0) {
                    response.status(404).send('No products found');
                }
                else {
                    response.status(200).json(products);
                }
            }
            catch (error) {
                response.status(500).send(error.message);
            }
        });
    }
    getAllCtrl(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = req.res;
            if (response == null) {
                throw new Error('Response object is missing');
            }
            try {
                const products = yield (0, products_1.getAll)();
                if (products.length === 0) {
                    response.status(404).send('No products found');
                }
                else {
                    response.status(200).json(products);
                }
            }
            catch (error) {
                response.status(500).send(error.message);
            }
        });
    }
    getOneCtrl(id, req) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = req.res;
            if (response == null) {
                throw new Error('Response object is missing');
            }
            try {
                const product = yield (0, products_1.getOne)(id);
                response.status(200).json(product);
            }
            catch (error) {
                response.status(500).send(error.message);
            }
        });
    }
    updateOneCtrl(id, product, req) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = req.res;
            if (response == null) {
                throw new Error('Response object is missing');
            }
            try {
                const productUpdated = yield (0, products_1.updateOne)(id, product);
                response.status(200).json(productUpdated);
            }
            catch (error) {
                response.status(500).send(error.message);
            }
        });
    }
    deleteOneCtrl(id, req) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = req.res;
            if (response == null) {
                throw new Error('Response object is missing');
            }
            try {
                const productDeleted = yield (0, products_1.deleteOne)(id);
                response.status(200).json(productDeleted);
            }
            catch (error) {
                response.status(500).send(error.message);
            }
        });
    }
    deleteOneHardCtrl(id, req) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = req.res;
            if (response == null) {
                throw new Error('Response object is missing');
            }
            try {
                const productDeleted = yield (0, products_1.deleteOneHard)(id);
                response.status(200).json(productDeleted);
            }
            catch (error) {
                response.status(500).send(error.message);
            }
        });
    }
};
exports.ProductsController = ProductsController;
__decorate([
    (0, tsoa_1.Post)(),
    __param(0, (0, tsoa_1.Body)()),
    __param(1, (0, tsoa_1.Request)())
], ProductsController.prototype, "createOneCtrl", null);
__decorate([
    (0, tsoa_1.Get)(),
    __param(0, (0, tsoa_1.Request)())
], ProductsController.prototype, "getAllActiveCtrl", null);
__decorate([
    (0, tsoa_1.Get)('deleted'),
    __param(0, (0, tsoa_1.Request)())
], ProductsController.prototype, "getAllDeletedCtrl", null);
__decorate([
    (0, tsoa_1.Get)('include_deleted'),
    __param(0, (0, tsoa_1.Request)())
], ProductsController.prototype, "getAllCtrl", null);
__decorate([
    (0, tsoa_1.Get)('{id}'),
    __param(0, (0, tsoa_1.Path)()),
    __param(1, (0, tsoa_1.Request)())
], ProductsController.prototype, "getOneCtrl", null);
__decorate([
    (0, tsoa_1.Put)('{id}'),
    __param(0, (0, tsoa_1.Path)()),
    __param(1, (0, tsoa_1.Body)()),
    __param(2, (0, tsoa_1.Request)())
], ProductsController.prototype, "updateOneCtrl", null);
__decorate([
    (0, tsoa_1.Delete)('{id}'),
    __param(0, (0, tsoa_1.Path)()),
    __param(1, (0, tsoa_1.Request)())
], ProductsController.prototype, "deleteOneCtrl", null);
__decorate([
    (0, tsoa_1.Delete)('hard/{id}'),
    __param(0, (0, tsoa_1.Path)()),
    __param(1, (0, tsoa_1.Request)())
], ProductsController.prototype, "deleteOneHardCtrl", null);
exports.ProductsController = ProductsController = __decorate([
    (0, tsoa_1.Route)('api/products'),
    (0, tsoa_1.Tags)('Products')
], ProductsController);
