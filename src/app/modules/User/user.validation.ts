import z from "zod";

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
      .min(6, {
        message: "Password must be at least 6 characters long.",
      })
      .regex(/[a-z]/, {
        message: "Password must contain at least one lowercase letter.",
      })
      .regex(/[A-Z]/, {
        message: "Password must contain at least one uppercase letter.",
      })
      .regex(/[0-9]/, {
        message: "Password must contain at least one number.",
      }),
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

export const userValidation = {
  createUserValidation,
};
