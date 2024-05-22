import express from "express";
import { DonationController } from "./donation.controller";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";
import validateRequest from "../../middlewares/validationRequest";
import { BloodRequestValidation } from "./donation.validation";

const router = express.Router();

router.post(
  "/donation-request",
  validateRequest(BloodRequestValidation.createBloodRequestValidation),
  auth(UserRole.USER, UserRole.ADMIN, UserRole.SUPER_ADMIN),
  DonationController.createBloodRequest
);

router.get(
  "/donation-request",
  auth(UserRole.USER, UserRole.ADMIN, UserRole.SUPER_ADMIN),
  DonationController.getMyDonation
);

export const DonationRoutes = router;
