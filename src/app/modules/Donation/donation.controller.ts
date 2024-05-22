import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import { DonationServices } from "./donation.service";
import sendResponse from "../../shared/sendResponse";
import httpStatus from "http-status";

const createBloodRequest = catchAsync(
  async (req: Request & { user?: any }, res: Response) => {
    const user = req.user;
    const result = await DonationServices.createBloodRequest(req.body, user);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Request successfully made",
      data: result,
    });
  }
);

const getMyDonation = catchAsync(
  async (req: Request & { user?: any }, res: Response) => {
    const user = req.user;
    const result = await DonationServices.getMyDonation(user);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Donation requests retrieved successfully",
      data: result,
    });
  }
);

const updateRequestStatus = catchAsync(async (req: Request, res: Response) => {
  const { requestId } = req.params;

  const result = await DonationServices.updateRequestStatus(
    requestId,
    req.body.status
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Donation request status successfully updated",
    data: result,
  });
});

export const DonationController = {
  createBloodRequest,
  getMyDonation,
  updateRequestStatus,
};
