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
const users_1 = require("../models/users");
const password_1 = require("../security/password");
// Controlador para crear un nuevo usuario
const createOne = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const existedUser = yield users_1.Users.findOne({
        $or: [
            { email: user.email },
            { username: user.username }
        ]
    });
    if (existedUser != null) {
        throw new Error('User already exists');
    }
    const hashPassword = yield (0, password_1.encrypt)(user.password);
    const { password: _ } = user, userWithoutPassword = __rest(user, ["password"]);
    const newUser = yield users_1.Users.create(Object.assign(Object.assign({}, userWithoutPassword), { hash_password: hashPassword }));
    return newUser;
});
exports.createOne = createOne;
// Controlador para obtener todos los usuarios
const getAllActive = (...args_1) => __awaiter(void 0, [...args_1], void 0, function* (queryUser = {}) {
    const users = yield users_1.Users.getNotDeleted(queryUser);
    return users.map((_a) => {
        var { hash_password: _ } = _a, userWithoutPassword = __rest(_a, ["hash_password"]);
        return userWithoutPassword;
    });
});
exports.getAllActive = getAllActive;
const getAllDeleted = (...args_1) => __awaiter(void 0, [...args_1], void 0, function* (queryUser = {}) {
    const users = yield users_1.Users.getDeleted(queryUser);
    return users.map((_a) => {
        var { hash_password: _ } = _a, userWithoutPassword = __rest(_a, ["hash_password"]);
        return userWithoutPassword;
    });
});
exports.getAllDeleted = getAllDeleted;
const getAll = (...args_1) => __awaiter(void 0, [...args_1], void 0, function* (queryUser = {}) {
    const users = yield users_1.Users.find(queryUser).lean();
    return users.map((_a) => {
        var { hash_password: _ } = _a, userWithoutPassword = __rest(_a, ["hash_password"]);
        return userWithoutPassword;
    });
});
exports.getAll = getAll;
const getOne = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield users_1.Users.findById(id).lean();
    if (user == null) {
        throw new Error('User not found');
    }
    const { hash_password: _ } = user, userWithoutPassword = __rest(user, ["hash_password"]);
    return userWithoutPassword;
});
exports.getOne = getOne;
const updateOne = (id, user) => __awaiter(void 0, void 0, void 0, function* () {
    const existedUser = yield users_1.Users.findOne({
        $or: [
            { email: user.email },
            { username: user.username }
        ],
        _id: { $ne: id }
    });
    if (existedUser != null) {
        throw new Error('El username y/o email ya existe');
    }
    const userUpdated = yield users_1.Users.findByIdAndUpdate(id, user, { new: true }).lean();
    if (userUpdated == null) {
        throw new Error('User not found');
    }
    const { hash_password: _ } = userUpdated, userUpdatedWithoutPassword = __rest(userUpdated, ["hash_password"]);
    return userUpdatedWithoutPassword;
});
exports.updateOne = updateOne;
const deleteOne = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const userDeleted = yield users_1.Users.findByIdAndUpdate(id, { deactivated_at: Date.now() }, { new: true }).lean();
    if (userDeleted == null) {
        throw new Error('User not found');
    }
    const { hash_password: _ } = userDeleted, userDeletedWithoutPassword = __rest(userDeleted, ["hash_password"]);
    return userDeletedWithoutPassword;
});
exports.deleteOne = deleteOne;
const deleteOneHard = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const userDeleted = yield users_1.Users.findByIdAndDelete(id).lean();
    if (userDeleted == null) {
        throw new Error('User not found');
    }
    const { hash_password: _ } = userDeleted, userDeletedWithoutPassword = __rest(userDeleted, ["hash_password"]);
    return userDeletedWithoutPassword;
});
exports.deleteOneHard = deleteOneHard;
