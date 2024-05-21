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

export const DonationServices = {
  createBloodRequest,
};
