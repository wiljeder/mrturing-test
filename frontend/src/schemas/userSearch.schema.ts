import { z } from "zod";

export const userSearchSchema = z.object({
  name: z.string().optional(),
  email: z.string().optional(),
});

export type TUserSearchSchema = z.infer<typeof userSearchSchema>;
