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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-unused-vars */
const jwtToken_1 = __importDefault(require("../../utils/jwtToken"));
const user_model_1 = require("./user.model");
const user_utils_1 = require("./user.utils");
const createUserService = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.create(payload);
    const resultObj = result.toObject();
    const { password } = resultObj, rest = __rest(resultObj, ["password"]);
    return rest;
});
const logInUserService = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.isUserExistsByEmail(payload.email);
    if (!user) {
        return { notfound: true };
    }
    const plainPassword = payload.password;
    const hashedPassword = user.password;
    const isMatched = yield (0, user_utils_1.isPasswordMatched)(plainPassword, hashedPassword);
    if (!isMatched) {
        return { matched: false };
    }
    const tokenObj = { email: user.email, role: user.role };
    const token = (0, jwtToken_1.default)(tokenObj, "10d");
    //   const { address, email, name, phone, role } = user;
    const userResponse = yield user_model_1.User.findOne({ email: user.email });
    return { token, user: userResponse };
});
const userService = {
    createUserService,
    logInUserService,
};
exports.default = userService;
