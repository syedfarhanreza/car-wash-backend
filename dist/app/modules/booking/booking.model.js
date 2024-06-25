"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const booking_utils_1 = require("./booking.utils");
const bookingSchema = new mongoose_1.Schema({
    customer: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    service: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: "Service",
    },
    slot: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: "Slot",
    },
    vehicleType: {
        type: String,
        enum: booking_utils_1.vehicleTypes,
        required: true,
    },
    vehicleBrand: {
        type: String,
        required: true,
    },
    vehicleModel: {
        type: String,
        required: true,
    },
    manufacturingYear: {
        type: Number,
        required: true,
    },
    registrationPlate: {
        type: String,
        unique: true,
        required: true,
    },
}, {
    timestamps: true,
});
const Booking = (0, mongoose_1.model)("Booking", bookingSchema);
exports.default = Booking;
