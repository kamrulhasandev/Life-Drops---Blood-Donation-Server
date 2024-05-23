import z from "zod";

const BloodTypeEnum = z.enum([
  "A_POS",
  "A_NEG",
  "B_POS",
  "B_NEG",
  "AB_POS",
  "AB_NEG",
  "O_POS",
  "O_NEG",
]);

const RequestStatusEnum = z.enum([
  "PENDING",
  "APPROVED",
  "REJECTED",
]);

const createBloodRequestValidation = z.object({
  body: z.object({
    donorId: z.string({
      required_error: "Donor id is required",
    }),
    firstName: z.string({
      required_error: "First name is required",
    }),
    lastName: z.string({
      required_error: "Last name is required",
    }),
    email: z
      .string({
        required_error: "Email is required",
      })
      .email({
        message: "Invalid email format",
      }),
    phoneNumber: z
      .string({
        required_error: "Phone number is required",
      })
      .min(11, {
        message: "Phone number must be at least 11 digits",
      }),
    location: z.string({
      required_error: "Location is required",
    }),
    donationDate: z.string({
      required_error: "Donation date is required",
    }),
    profilePhoto: z.string().optional(),
    bloodType: BloodTypeEnum,
    hospitalName: z.string({
      required_error: "Hospital name is required",
    }),
    reason: z.string({
      required_error: "Reason is required",
    }),
    description: z.string().optional(),
    status: RequestStatusEnum.default("PENDING"),
  }),
});

export const BloodRequestValidation = {
  createBloodRequestValidation,
};
