"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const VehicleType = zod_1.z.enum([
    "car",
    "truck",
    "SUV",
    "van",
    "motorcycle",
    "bus",
    "electricVehicle",
    "hybridVehicle",
    "bicycle",
    "tractor",
]);
const BookingValidationSchema = zod_1.z.object({
    customer: zod_1.z.string(),
    service: zod_1.z.string(),
    slot: zod_1.z.date(),
    vehicleType: VehicleType,
    vehicleBrand: zod_1.z.string(),
    vehicleModel: zod_1.z.string(),
    manufacturingYear: zod_1.z.number().int().positive(),
    registrationPlate: zod_1.z.string(),
});
exports.default = BookingValidationSchema;
