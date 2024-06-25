"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_route_1 = __importDefault(require("../modules/user/user.route"));
const service_route_1 = __importDefault(require("../modules/service/service.route"));
const slot_route_1 = require("../modules/slot/slot.route");
const booking_route_1 = __importDefault(require("../modules/booking/booking.route"));
const router = express_1.default.Router();
const moduleRoute = [
    {
        path: "/auth",
        route: user_route_1.default,
    },
    {
        path: "/services",
        route: service_route_1.default,
    },
    {
        path: "/services",
        route: slot_route_1.slotRoutes,
    },
    {
        path: "/slots",
        route: slot_route_1.slotRoutes,
    },
    {
        path: "/bookings",
        route: booking_route_1.default,
    },
    {
        path: "/",
        route: booking_route_1.default,
    },
];
moduleRoute.forEach((route) => router.use(route.path, route.route));
exports.default = router;
