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
exports.getAllAvailableSlots = exports.createSlotsIntoDB = void 0;
const catchAsync_1 = require("../../utils/catchAsync");
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const service_model_1 = require("../service/service.model");
const slot_service_1 = __importDefault(require("./slot.service"));
const { createSlot, getAllAvailableSlotsService } = slot_service_1.default;
exports.createSlotsIntoDB = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const isServiceExist = yield service_model_1.Service.findById(body.service);
    if (!isServiceExist) {
        return (0, sendResponse_1.default)(res, {
            success: false,
            statusCode: 404,
            message: "There is no available Service on this id. invalid service id",
            data: null,
        });
    }
    const result = yield createSlot(body, isServiceExist.duration);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "Slots created successfully",
        data: result,
    });
}));
exports.getAllAvailableSlots = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const query = req.query;
    const result = yield getAllAvailableSlotsService(query);
    if (result.length > 0) {
        return (0, sendResponse_1.default)(res, {
            success: true,
            statusCode: 200,
            message: "Available slots retrieved successfully",
            data: result,
        });
    }
    (0, sendResponse_1.default)(res, {
        message: "No data found",
        success: false,
        statusCode: 404,
        data: [],
    });
}));
