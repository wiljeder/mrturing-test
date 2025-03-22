import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(1, "Password is required"),
});

export type TLoginSchema = z.infer<typeof loginSchema>;
