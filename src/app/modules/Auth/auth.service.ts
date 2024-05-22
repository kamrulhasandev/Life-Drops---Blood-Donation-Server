import httpStatus from "http-status";
import ApiError from "../../error/AppError";
import prisma from "../../shared/prisma";
import { AuthUtils } from "./auth.utils";
import { jwtHelpers } from "../../helpers/jwtHelpers";
import config from "../../config";
import { JwtPayload, Secret } from "jsonwebtoken";
import * as bcrypt from "bcrypt";
import { hashedPassword } from "../../helpers/hashedPassword";

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

const changePassword = async (
  user: JwtPayload | null,
  payload: any
): Promise<void> => {
  const { oldPassword, newPassword } = payload;

  const isUserExist = await prisma.user.findUnique({
    where: {
      id: user?.id,
      status: "ACTIVE",
    },
  });

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "User does not exist");
  }

  if (
    isUserExist.password &&
    !(await AuthUtils.comparePasswords(oldPassword, isUserExist.password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Old Password is incorrect");
  }

  const hashPassword = await hashedPassword(newPassword);

  await prisma.user.update({
    where: {
      id: isUserExist.id,
    },
    data: {
      password: hashPassword,
    },
  });
};

export const AuthServices = {
  loginUser,
  changePassword,
};
