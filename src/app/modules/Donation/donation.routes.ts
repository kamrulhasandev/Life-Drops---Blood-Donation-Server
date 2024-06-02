import express from "express";
import { DonationController } from "./donation.controller";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";
import validateRequest from "../../middlewares/validationRequest";
import { BloodRequestValidation } from "./donation.validation";

const router = express.Router();

router.get(
  "/donation",
  auth(UserRole.USER, UserRole.ADMIN, UserRole.SUPER_ADMIN),
  DonationController.getAllDonation
);

router.get(
  "/received-donation-request",
  auth(UserRole.USER, UserRole.ADMIN, UserRole.SUPER_ADMIN),
  DonationController.getMyDonation
);

router.get(
  "/sent-donation-request",
  auth(UserRole.USER, UserRole.ADMIN, UserRole.SUPER_ADMIN),
  DonationController.getSentDonationRequest
);

router.post(
  "/donation-request",
  validateRequest(BloodRequestValidation.createBloodRequestValidation),
  auth(UserRole.USER, UserRole.ADMIN, UserRole.SUPER_ADMIN),
  DonationController.createBloodRequest
);

router.put(
  "/donation-request/:requestId",
  auth(UserRole.USER, UserRole.ADMIN, UserRole.SUPER_ADMIN),
  DonationController.updateRequestStatus
);

export const DonationRoutes = router;
