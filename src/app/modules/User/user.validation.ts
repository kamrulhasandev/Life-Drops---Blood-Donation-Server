import z from "zod";

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9]).{8,}$/;

const createUserValidation = z.object({
  body: z.object({
    userName: z.string({
      required_error: "Username is Required.",
    }),
    email: z
      .string()
      .email({
        message: "Invalid email format.",
      })
      .nonempty({
        message: "Email is Required.",
      }),
    password: z
      .string()
      .min(8, {
        message: "Password must be at least 8 characters long.",
      })
      .regex(passwordRegex, {
        message:
          "Password must contain at least one uppercase letter, one lowercase letter, one special character, and one number.",
      }),
    firstName: z.string({
      required_error: "First Name is Required.",
    }),
    lastName: z.string({
      required_error: "Last Name is Required.",
    }),
    phoneNumber: z.string({
      required_error: "Phone Number is Required.",
    }),
    dateOfBirth: z.string().optional(),
    location: z.string({
      required_error: "Location is Required.",
    }),
    profilePhoto: z.string().optional(),
    lastDonationDate: z.string().optional(),
    canDonateBlood: z.boolean({
      required_error: "This field is Required.",
    }),
    bloodType: z.enum(
      [
        "A_POS",
        "A_NEG",
        "B_POS",
        "B_NEG",
        "AB_POS",
        "AB_NEG",
        "O_POS",
        "O_NEG",
      ],
      {
        required_error: "Blood type is Required.",
      }
    ),
  }),
});

const editProfileValidation = z.object({
  body: z.object({
    userName: z.string().optional(),
    email: z.string().email().optional(),
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    phoneNumber: z.string().optional(),
    dateOfBirth: z.string().optional(),
    location: z.string().optional(),
    profilePhoto: z.string().optional(),
    lastDonationDate: z.string().optional(),
    canDonateBlood: z.boolean().optional(),
  }),
});

export const userValidation = {
  createUserValidation,
  editProfileValidation,
};
