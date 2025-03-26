import { z } from "zod";

export const paginationSchema = z.object({
  page: z.number().optional(),
  limit: z.number().optional(),
});
