import { Router } from "express";
import { authorizedRoles, isAuthenticatedUser } from "../../middleware/auth";
import { createSlotsIntoDB, getAllAvailableSlots } from "./slot.controller";

const router = Router();
router.post(
  "/slots",
  isAuthenticatedUser,
  authorizedRoles("admin"),
  createSlotsIntoDB
);
router.get("/availability", getAllAvailableSlots);
export const slotRoutes = router;
