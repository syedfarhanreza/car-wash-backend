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
exports.authorizedRoles = exports.isAuthenticatedUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const catchAsync_1 = require("../utils/catchAsync");
const sendResponse_1 = __importDefault(require("../utils/sendResponse"));
const user_model_1 = require("../modules/user/user.model");
exports.isAuthenticatedUser = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const getToken = req.header("Authorization");
    if (!getToken) {
        return (0, sendResponse_1.default)(res, {
            data: null,
            message: "Invalid authentication",
            success: false,
            statusCode: 401,
        });
    }
    const token = getToken.split(" ")[1];
    const decoded = jsonwebtoken_1.default.verify(token, config_1.default.jwt_access_secret);
    if (!decoded) {
        return (0, sendResponse_1.default)(res, {
            data: null,
            message: "Invalid authentication",
            success: false,
            statusCode: 401,
        });
    }
    const user = yield user_model_1.User.findOne({ email: decoded === null || decoded === void 0 ? void 0 : decoded.email }).select("-password");
    if (!user) {
        return (0, sendResponse_1.default)(res, {
            data: null,
            message: "User not found",
            success: false,
            statusCode: 404,
        });
    }
    req.user = user;
    next();
}));
const authorizedRoles = (...roles) => {
    return (req, res, next) => {
        var _a;
        if (!roles.includes((_a = req.user) === null || _a === void 0 ? void 0 : _a.role)) {
            return res.json({
                success: false,
                statusCode: 401,
                message: "You have no access to this route",
            });
        }
        next();
    };
};
exports.authorizedRoles = authorizedRoles;
