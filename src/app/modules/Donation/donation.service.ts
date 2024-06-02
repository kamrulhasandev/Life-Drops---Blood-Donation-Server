import httpStatus from "http-status";
import ApiError from "../../error/AppError";
import prisma from "../../shared/prisma";

const createBloodRequest = async (payload: any, user: any) => {
  const result = await prisma.$transaction(async (tc) => {
    const isDonorExists = await tc.user.findUnique({
      where: {
        id: payload.donorId,
        status: "ACTIVE",
      },
    });

    if (!isDonorExists) {
      throw new ApiError(httpStatus.NOT_FOUND, "Donor Not found.");
    }

    const createRequest = await tc.bloodRequest.create({
      data: {
        requesterId: user.id,
        ...payload,
      },
      select: {
        id: true,
        email: true,
        phoneNumber: true,
        location: true,
        donor: {
          select: {
            id: true,
            email: true,
            bloodType: true,
            location: true,
            canDonateBlood: true,
          },
        },
      },
    });
    return createRequest;
  });
  return result;
};

const getMyDonation = async (user: any) => {
  const result = await prisma.bloodRequest.findMany({
    where: {
      donorId: user.id,
    },
    select: {
      id: true,
      status: true,
      hospitalName: true,
      description: true,
      email: true,
      location: true,
      phoneNumber: true,
      reason: true,
      profilePhoto: true,
      bloodType: true,
      donationDate: true,
      firstName: true,
      lastName: true,
    },
  });

  return result;
};

const updateRequestStatus = async (requestId: string, status: any) => {
  await prisma.bloodRequest.findFirstOrThrow({
    where: {
      id: requestId,
    },
  });

  const updateStatus = await prisma.bloodRequest.update({
    where: {
      id: requestId,
    },
    data: { status },
  });
  return updateStatus;
};

const getSentDonationRequest = async (user: any) => {
  const result = await prisma.bloodRequest.findMany({
    where: {
      requesterId: user.id,
    },
    select: {
      id: true,
      status: true,
      donor: {
        select: {
          firstName: true,
          lastName: true,
          bloodType: true,
          email: true,
          phoneNumber: true,
          location: true,
          profilePhoto: true,
        },
      },
    },
  });
  return result;
};

const getAllDonation = async () => {
  const result = await prisma.bloodRequest.findMany({
    select: {
      id: true,
      status: true,
      bloodType: true,
      donationDate: true,
      donor: {
        select: {
          firstName: true,
          lastName: true,
        },
      },
      requester: {
        select: {
          firstName: true,
          lastName: true,
        },
      },
    },
  });
  return result
};

export const DonationServices = {
  createBloodRequest,
  getMyDonation,
  updateRequestStatus,
  getSentDonationRequest,
  getAllDonation,
};
