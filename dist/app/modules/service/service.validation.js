"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serviceValidation = void 0;
const zod_1 = require("zod");
const serviceValidationSchema = zod_1.z.object({
    name: zod_1.z.string(),
    description: zod_1.z.string(),
    price: zod_1.z.number(),
    duration: zod_1.z.number(),
    isDeleted: zod_1.z.boolean(),
});
const serviceUpdateValidationSchema = zod_1.z.object({
    name: zod_1.z.string().optional(),
    description: zod_1.z.string().optional(),
    price: zod_1.z.number().optional(),
    duration: zod_1.z.number().optional(),
    isDeleted: zod_1.z.boolean().optional(),
});
exports.serviceValidation = {
    serviceValidationSchema,
    serviceUpdateValidationSchema,
};
