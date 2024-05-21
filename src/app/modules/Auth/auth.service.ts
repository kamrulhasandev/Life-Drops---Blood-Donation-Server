import httpStatus from "http-status";
import ApiError from "../../error/AppError";
import prisma from "../../shared/prisma";
import { AuthUtils } from "./auth.utils";
import { jwtHelpers } from "../../helpers/jwtHelpers";
import config from "../../config";
import { Secret } from "jsonwebtoken";

const loginUser = async (payload: {
  emailOrUserName: string;
  password: string;
}) => {
  const { emailOrUserName, password } = payload;

  if (!emailOrUserName) {
    throw new Error("Please provide either email or username.");
  }

  let user;

  if (emailOrUserName.includes("@")) {
    user = await prisma.user.findUnique({
      where: {
        email: emailOrUserName,
      },
    });
  } else {
    user = await prisma.user.findUnique({
      where: {
        userName: emailOrUserName,
      },
    });
  }

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "Wrong userName or Email");
  }

  // Compare passwords
  const passwordMatch = await AuthUtils.comparePasswords(
    password,
    user.password
  );

  if (!passwordMatch) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Incorrect password.");
  }

  const accessToken = jwtHelpers.createToken(
    {
      id: user.id,
      userName: user.userName,
      role: user.role,
      email: user.email,
    },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  const refreshToken = jwtHelpers.createToken(
    {
      id: user.id,
      userName: user.userName,
      role: user.role,
      email: user.email,
    },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string
  );

  return {
    accessToken,
    refreshToken,
  };
};

export const AuthServices = {
  loginUser,
};
