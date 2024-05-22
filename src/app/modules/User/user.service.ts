import * as bcrypt from "bcrypt";
import prisma from "../../shared/prisma";
import ApiError from "../../error/AppError";
import httpStatus from "http-status";

const createUser = async (payload: any) => {
  const hashedPassword: string = await bcrypt.hash(payload.password, 12);

  const userData = {
    userName: payload.userName,
    email: payload.email,
    password: hashedPassword,
    firstName: payload.firstName,
    lastName: payload.lastName,
    phoneNumber: payload.phoneNumber,
    dateOfBirth: payload.dateOfBirth,
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

export const UserServices = {
  createUser,
  editProfile,
};
