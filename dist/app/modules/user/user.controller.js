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
exports.logInUser = exports.createUserIntoDB = void 0;
const catchAsync_1 = require("../../utils/catchAsync");
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const user_model_1 = require("./user.model");
const user_service_1 = __importDefault(require("./user.service"));
const { createUserService, logInUserService } = user_service_1.default;
exports.createUserIntoDB = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const isExist = yield user_model_1.User.isUserExistsByEmail(body.email);
    if (isExist) {
        return (0, sendResponse_1.default)(res, {
            success: false,
            message: "User already exist in this email",
            data: null,
            statusCode: 400,
        });
    }
    const result = yield createUserService(body);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "User registered successfully",
        data: result,
    });
}));
exports.logInUser = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { matched, token, notfound, user } = yield logInUserService(body);
    if (notfound === true) {
        return (0, sendResponse_1.default)(res, {
            message: "user not found for this email",
            success: false,
            data: null,
            statusCode: 404,
        });
    }
    if (matched === false) {
        return (0, sendResponse_1.default)(res, {
            message: "Password didn't matched",
            success: false,
            data: null,
            statusCode: 401,
        });
    }
    res.json({
        success: true,
        statusCode: 200,
        token,
        message: "User logged in successfully",
        data: user,
    });
}));
