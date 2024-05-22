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
      requesterId: user.id,
    },
    include: {
      donor: {
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
          canDonateBlood: true,
          lastDonationDate: true,
          bloodType: true,
          status: true,
        },
      },
      requester: {
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
          canDonateBlood: true,
          lastDonationDate: true,
          bloodType: true,
          status: true,
        },
      },
    },
  });

  if (result.length === 0) {
    return "Currently no request found";
  }

  return result;
};

// const updateRequestStatus = async (
//   requestId: string,
//   status:
// ) => {
//   await prisma.request.findFirstOrThrow({
//     where: {
//       id: requestId,
//     },
//   });

//   const updateStatus = await prisma.request.update({
//     where: {
//       id: requestId,
//     },
//     data: { requestStatus: status },
//   });
//   return updateStatus;
// };

export const DonationServices = {
  createBloodRequest,
  getMyDonation,
};
