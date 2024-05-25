import { z } from "zod";

const createBlogValidationSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: "Title name is required",
    }),
    description: z.string({
      required_error: "Last name is required",
    }),
    image: z.string().optional(),
  }),
});

export const BlogValidation = {
  createBlogValidationSchema,
};
