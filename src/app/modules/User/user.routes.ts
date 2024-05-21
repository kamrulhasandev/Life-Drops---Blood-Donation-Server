import express from "express";
import validateRequest from "../../middlewares/validationRequest";
import { userValidation } from "./user.validation";
import { UserController } from "./user.controller";

const router = express.Router();

router.post(
  "/register",
  validateRequest(userValidation.createUserValidation),
  UserController.createUser
);

export const UserRoutes = router;
