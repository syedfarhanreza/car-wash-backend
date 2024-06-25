import { Router } from "express";
import { createUserIntoDB, logInUser } from "./user.controller";
import { validSchema } from "../../middleware/validator";
import { UserValidation } from "./user.validation";

const router = Router();
router.post(
  "/signup",
  validSchema(UserValidation.userValidationSchema),
  createUserIntoDB,
);
router.post(
  "/login",
  validSchema(UserValidation.loginValidationSchema),
  logInUser,
);

const userRoutes = router;
export default userRoutes;
