import { z } from "zod";

export const createUserSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const updateUserSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters").optional(),
    email: z.string().email("Invalid email format").optional(),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided",
    path: ["*"],
  });

export const userResponseSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const userQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),
  name: z.string().optional(),
  email: z.string().optional(),
});

export const batchDeleteSchema = z.array(z.number()).nonempty();

export type TCreateUserSchema = z.infer<typeof createUserSchema>;
export type TUpdateUserSchema = z.infer<typeof updateUserSchema>;
export type TUserResponseSchema = z.infer<typeof userResponseSchema>;
export type TUserQuerySchema = z.infer<typeof userQuerySchema>;
export type TBatchDeleteSchema = z.infer<typeof batchDeleteSchema>;
