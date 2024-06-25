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
Object.defineProperty(exports, "__esModule", { value: true });
const service_model_1 = require("./service.model");
const createService = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield service_model_1.Service.create(payload);
    return result;
});
const getSingleService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield service_model_1.Service.findById(id);
    return result;
});
const getAllServices = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield service_model_1.Service.find({ isDeleted: false });
    return result;
});
const updateSingleService = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield service_model_1.Service.findByIdAndUpdate(id, payload, { new: true });
    return result;
});
const deleteSingleService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield service_model_1.Service.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
    return result;
});
const servicesService = {
    createService,
    getSingleService,
    getAllServices,
    updateSingleService,
    deleteSingleService,
};
exports.default = servicesService;
