import httpStatus from "http-status";
import ApiError from "../../error/AppError";
import prisma from "../../shared/prisma";
import { AuthUtils } from "./auth.utils";
import { jwtHelpers } from "../../helpers/jwtHelpers";
import config from "../../config";
import { JwtPayload, Secret } from "jsonwebtoken";
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

const getMyProfile = async (user: any) => {
  console.log(user);
  const result = await prisma.user.findUniqueOrThrow({
    where: {
      id: user.id,
    },
    select: {
      id: true,
      email: true,
      bloodType: true,
      location: true,
      canDonateBlood: true,
      dateOfBirth: true,
      firstName: true,
      lastName: true,
      lastDonationDate: true,
      phoneNumber: true,
      profilePhoto: true,
      status: true,
      userName: true,
    },
  });

  return result;
};

const refreshToken = async (token: string) => {
  let verifiedToken = null;
  try {
    verifiedToken = jwtHelpers.verifyToken(
      token,
      config.jwt.refresh_secret as Secret
    );
  } catch (err) {
    throw new ApiError(httpStatus.FORBIDDEN, "Invalid Refresh Token");
  }

  const { userId } = verifiedToken;

  const isUserExist = await prisma.user.findUnique({
    where: {
      id: userId,
      status: "ACTIVE",
    },
  });
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "User does not exist");
  }

  const newAccessToken = jwtHelpers.createToken(
    {
      userId: isUserExist.id,
      role: isUserExist.role,
    },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  return {
    accessToken: newAccessToken,
  };
};

export const AuthServices = {
  loginUser,
  changePassword,
  getMyProfile,
  refreshToken
};
