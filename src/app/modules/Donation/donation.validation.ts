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

const createBloodRequestValidation = z.object({
  body: z.object({
    donorId: z.string({
      required_error: "Donor id is Required",
    }),
    firstName: z.string({
      required_error: "firstName  is Required",
    }),
    lastName: z.string({
      required_error: "lastName  is Required",
    }),
    email: z
      .string({
        required_error: "email  is Required",
      })
      .email({
        message: "Invalid email format",
      }),
    phoneNumber: z
      .string({
        required_error: "phoneNumber  is Required",
      })
      .min(11, {
        message: "Phone number must be at least 11 digits",
      }),
    location: z.string({
      required_error: "location  is Required",
    }),
    donationDate: z.string({
      required_error: "donationDate  is Required",
    }),
    donationTime: z.string({
      required_error: "donationTime  is Required",
    }),
    profilePhoto: z.string().optional(),
    bloodType: BloodTypeEnum,

    hospitalName: z.string({
      required_error: "donationTime  is Required",
    }),
  }),
});

export const BloodRequestValidation = {
  createBloodRequestValidation,
};
