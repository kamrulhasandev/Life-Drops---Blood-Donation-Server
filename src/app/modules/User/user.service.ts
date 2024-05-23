import * as bcrypt from "bcrypt";
import prisma from "../../shared/prisma";
import ApiError from "../../error/AppError";
import httpStatus from "http-status";
import { UserStatus } from "@prisma/client";

const createUser = async (payload: any) => {
  const hashedPassword: string = await bcrypt.hash(payload.password, 12);

  const userData = {
    userName: payload.userName,
    email: payload.email,
    password: hashedPassword,
    firstName: payload.firstName,
    lastName: payload.lastName,
    phoneNumber: payload.phoneNumber,
    location: payload.location,
    canDonateBlood: payload.canDonateBlood,
    bloodType: payload.bloodType,
  };

  const isEmailExists = await prisma.user.findUnique({
    where: {
      email: payload.email,
    },
  });

  if (isEmailExists) {
    throw new ApiError(httpStatus.CONFLICT, "Email already exists!");
  }

  // Check if username already exists
  const isUserNameExists = await prisma.user.findUnique({
    where: {
      userName: payload.userName,
    },
  });

  if (isUserNameExists) {
    throw new ApiError(httpStatus.CONFLICT, "Username already exists!");
  }

  const result = await prisma.user.create({
    data: userData,
    select: {
      id: true,
      userName: true,
      email: true,
      bloodType: true,
    },
  });

  return result;
};

const editProfile = async (payload: any, user: any) => {
  if (payload.userName) {
    const userNameExists = await prisma.user.findUnique({
      where: {
        userName: payload.userName,
      },
    });
    if (userNameExists) {
      throw new ApiError(httpStatus.CONFLICT, "Username already exists!");
    }
  }

  if (payload.email) {
    const emailExists = await prisma.user.findUnique({
      where: {
        email: payload.email,
      },
    });
    if (emailExists) {
      throw new ApiError(httpStatus.CONFLICT, "Email already exists!");
    }
  }

  const result = await prisma.user.update({
    where: {
      id: user.id,
    },
    data: payload,
    select: {
      id: true,
      userName: true,
      email: true,
      firstName: true,
      lastName: true,
      phoneNumber: true,
      dateOfBirth: true,
      location: true,
      profilePhoto: true,
      lastDonationDate: true,
      canDonateBlood: true,
      bloodType: true,
    },
  });

  return result;
};

const changeUserStatus = async (id: string, status: UserStatus) => {
  const result = await prisma.user.update({
    where: {
      id: id,
    },
    data: {
      status: status,
    },
  });
  return { message: "User Status change successfully" };
};

enum UserRole {
  USER = "USER",
  ADMIN = "ADMIN",
  SUPER_ADMIN = "SUPER_ADMIN",
}

const changeUserRole = async (id: string, role: UserRole) => {
  const allowedRoles = [UserRole.USER, UserRole.ADMIN];

  if (!allowedRoles.includes(role)) {
    throw new Error("Invalid role. Only 'USER' and 'ADMIN' roles are allowed.");
  }

  const result = await prisma.user.update({
    where: {
      id: id,
    },
    data: {
      role: role,
    },
  });

  return { message: "User Role changed successfully", result };
};

const allDonor = async () => {
  const result = await prisma.user.findMany({
    where: {
      status: "ACTIVE",
    },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      location: true,
      profilePhoto: true,
      canDonateBlood: true,
      bloodType: true,
    },
  });

  return result;
};

const getSingleDonor = async (donorId: string) => {
  const result = await prisma.user.findUniqueOrThrow({
    where: {
      id: donorId,
    },
    select: {
      id: true,
      bloodType: true,
      canDonateBlood: true,
      dateOfBirth: true,
      email: true,
      firstName: true,
      lastName: true,
      location: true,
      phoneNumber: true,
      profilePhoto: true,
      lastDonationDate: true,
      userName: true,
    },
  });
  return result;
};

export const UserServices = {
  createUser,
  editProfile,
  changeUserStatus,
  changeUserRole,
  allDonor,
  getSingleDonor,
};
