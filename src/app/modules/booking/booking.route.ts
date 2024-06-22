import { Router } from "express";
import {
  createBookingIntoDB,
  getAllBookings,
  getUserBookings,
} from "./booking.controller";
import { authorizedRoles, isAuthenticatedUser } from "../../middleware/auth";

const router = Router();
router.post(
  "/",
  isAuthenticatedUser,
  authorizedRoles("user"),
  createBookingIntoDB
);
router.get("/", isAuthenticatedUser, authorizedRoles("user"), getAllBookings);

router.get(
  "/my-bookings",
  isAuthenticatedUser,
  authorizedRoles("user"),
  getUserBookings
);

const bookingRoutes = router;
export default bookingRoutes;
