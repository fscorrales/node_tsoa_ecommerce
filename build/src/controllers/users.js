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
exports.UsersController = void 0;
const tsoa_1 = require("tsoa");
const users_1 = require("../services/users");
let UsersController = class UsersController extends tsoa_1.Controller {
    createOneCtrl(user, req) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = req.res;
            if (response == null) {
                throw new Error('Response object is missing');
            }
            try {
                const newUser = yield (0, users_1.createOne)(user);
                response.status(200).send(newUser);
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
                const users = yield (0, users_1.getAllActive)();
                if (users.length === 0) {
                    response.status(404).send('No users found');
                }
                else {
                    response.status(200).json(users);
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
                const users = yield (0, users_1.getAllDeleted)();
                if (users.length === 0) {
                    response.status(404).send('No users found');
                }
                else {
                    response.status(200).json(users);
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
                const users = yield (0, users_1.getAll)();
                if (users.length === 0) {
                    response.status(404).send('No users found');
                }
                else {
                    response.status(200).json(users);
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
                const user = yield (0, users_1.getOne)(id);
                response.status(200).json(user);
            }
            catch (error) {
                response.status(500).send(error.message);
            }
        });
    }
    updateOneCtrl(id, user, req) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = req.res;
            if (response == null) {
                throw new Error('Response object is missing');
            }
            try {
                const userUpdated = yield (0, users_1.updateOne)(id, user);
                response.status(200).json(userUpdated);
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
                const userDeleted = yield (0, users_1.deleteOne)(id);
                response.status(200).json(userDeleted);
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
                const userDeleted = yield (0, users_1.deleteOneHard)(id);
                response.status(200).json(userDeleted);
            }
            catch (error) {
                response.status(500).send(error.message);
            }
        });
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, tsoa_1.Post)(),
    __param(0, (0, tsoa_1.Body)()),
    __param(1, (0, tsoa_1.Request)())
], UsersController.prototype, "createOneCtrl", null);
__decorate([
    (0, tsoa_1.Get)(),
    __param(0, (0, tsoa_1.Request)())
], UsersController.prototype, "getAllActiveCtrl", null);
__decorate([
    (0, tsoa_1.Get)('deleted'),
    __param(0, (0, tsoa_1.Request)())
], UsersController.prototype, "getAllDeletedCtrl", null);
__decorate([
    (0, tsoa_1.Get)('include_deleted'),
    __param(0, (0, tsoa_1.Request)())
], UsersController.prototype, "getAllCtrl", null);
__decorate([
    (0, tsoa_1.Get)('{id}'),
    __param(0, (0, tsoa_1.Path)()),
    __param(1, (0, tsoa_1.Request)())
], UsersController.prototype, "getOneCtrl", null);
__decorate([
    (0, tsoa_1.Put)('{id}'),
    __param(0, (0, tsoa_1.Path)()),
    __param(1, (0, tsoa_1.Body)()),
    __param(2, (0, tsoa_1.Request)())
], UsersController.prototype, "updateOneCtrl", null);
__decorate([
    (0, tsoa_1.Delete)('{id}'),
    __param(0, (0, tsoa_1.Path)()),
    __param(1, (0, tsoa_1.Request)())
], UsersController.prototype, "deleteOneCtrl", null);
__decorate([
    (0, tsoa_1.Delete)('hard/{id}'),
    __param(0, (0, tsoa_1.Path)()),
    __param(1, (0, tsoa_1.Request)())
], UsersController.prototype, "deleteOneHardCtrl", null);
exports.UsersController = UsersController = __decorate([
    (0, tsoa_1.Route)('api/users'),
    (0, tsoa_1.Tags)('Users')
], UsersController);
