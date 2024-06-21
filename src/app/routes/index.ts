import express from "express";
import userRoutes from "../modules/user/user.route";
import serviceRoutes from "../modules/service/service.route";
import { slotRoutes } from "../modules/slot/slot.route";

const router = express.Router();

const moduleRoute = [
  {
    path: "/auth",
    route: userRoutes,
  },
  {
    path: "/services",
    route: serviceRoutes,
  },
  {
    path: "/services",
    route: slotRoutes,
  },
  {
    path: "/slots",
    route: slotRoutes,
  },
];

moduleRoute.forEach((route) => router.use(route.path, route.route));

export default router;
