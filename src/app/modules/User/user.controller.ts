import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import { UserServices } from "./user.service";
import sendResponse from "../../shared/sendResponse";
import httpStatus from "http-status";

const createUser = catchAsync(async (req: Request, res: Response) => {
  const result = await UserServices.createUser(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User registered successfully",
    data: result,
  });
});

const editProfile = catchAsync(
  async (req: Request & { user?: any }, res: Response) => {
    const user = req.user;
    const result = await UserServices.editProfile(req.body, user);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "User profile updated successfully",
      data: result,
    });
  }
);
const changeUserStatus = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;
  const result = await UserServices.changeUserStatus(id, status);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User Status updated successfully",
    data: result,
  });
});
const changeUerRole = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { role } = req.body;
  const result = await UserServices.changeUserRole(id, role);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User Role updated successfully",
    data: result,
  });
});

const allDonor = catchAsync(async (req: Request, res: Response) => {
  const result = await UserServices.allDonor();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All Donor Retrieve successfully",
    data: result,
  });
});

const getSingleDonor = catchAsync(async (req: Request, res: Response) => {
  const { donorId } = req.params;
  const result = await UserServices.getSingleDonor(donorId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All Donor Retrieve successfully",
    data: result,
  });
});

export const UserController = {
  createUser,
  editProfile,
  changeUserStatus,
  changeUerRole,
  allDonor,
  getSingleDonor,
};
