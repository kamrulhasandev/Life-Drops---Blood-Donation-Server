import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import { AuthServices } from "./auth.service";
import sendResponse from "../../shared/sendResponse";
import config from "../../config";

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthServices.loginUser(req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "User logged in successfully !",
    data: {
      accessToken: result.accessToken,
    },
  });
});

const changePassword = catchAsync(
  async (req: Request & { user?: any }, res: Response) => {
    const user = req.user;
    const result = await AuthServices.changePassword(user, req.body);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Password Change successfully !",
      data: result,
    });
  }
);
const getMyProfile = catchAsync(
  async (req: Request & { user?: any }, res: Response) => {
    const user = req.user;
    const result = await AuthServices.getMyProfile(user);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "profile retrieved successfully !",
      data: result,
    });
  }
);

const refreshToken = catchAsync(async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;

  const result = await AuthServices.refreshToken(refreshToken);

  // set refresh token into cookie
  const cookieOptions = {
    secure: config.env === 'production',
    httpOnly: true,
  };

  res.cookie('refreshToken', refreshToken, cookieOptions);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'User logged in successfully !',
    data: result,
  });
});

export const AuthController = {
  loginUser,
  changePassword,
  getMyProfile,
  refreshToken
};
