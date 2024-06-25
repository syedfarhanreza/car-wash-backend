import { Router } from "express";
import { authorizedRoles, isAuthenticatedUser } from "../../middleware/auth";
import { validSchema } from "../../middleware/validator";
import {
  createServiceIntoDB,
  deleteServiceById,
  getAllServiceFromDB,
  getServiceById,
  updateServiceById,
} from "./service.controller";
import { serviceValidation } from "./service.validation";

const router = Router();
router.post(
  "/",
  isAuthenticatedUser,
  authorizedRoles("admin"),
  validSchema(serviceValidation.serviceValidationSchema),
  createServiceIntoDB,
);

router.get("/", getAllServiceFromDB);
router.get("/:id", getServiceById);
router.put(
  "/:id",
  isAuthenticatedUser,
  authorizedRoles("admin"),
  updateServiceById,
);
router.delete(
  "/:id",
  isAuthenticatedUser,
  authorizedRoles("admin"),
  deleteServiceById,
);

const serviceRoutes = router;

export default serviceRoutes;
