import express from "express";
import validateRequest from "../../middlewares/validationRequest";
import { userValidation } from "./user.validation";
import { UserController } from "./user.controller";
import { UserRole } from "@prisma/client";
import auth from "../../middlewares/auth";

const router = express.Router();

router.post(
  "/register",
  validateRequest(userValidation.createUserValidation),
  UserController.createUser
);
router.put(
  "/edit-profile",
  validateRequest(userValidation.editProfileValidation),
  auth(UserRole.USER, UserRole.ADMIN, UserRole.SUPER_ADMIN),
  UserController.editProfile
);

router.post(
  "/user-status/:id",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  UserController.changeUserStatus
);
router.post(
  "/user-role/:id",
  auth(UserRole.SUPER_ADMIN),
  UserController.changeUerRole
);

export const UserRoutes = router;
