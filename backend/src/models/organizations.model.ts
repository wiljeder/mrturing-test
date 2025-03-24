import { z } from "zod";
import { paginationSchema } from "./pagination.model.ts";

export const createOrganizationSchema = z.object({
  name: z.string().min(1, "Organization name is required"),
  description: z.string().optional(),
});

export const updateOrganizationSchema = z
  .object({
    name: z.string().min(1, "Organization name is required").optional(),
    description: z.string().optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided",
    path: ["*"],
  });

export const organizationUserQuerySchema = paginationSchema.extend({
  name: z.string().optional(),
  email: z.string().optional(),
});

export type TCreateOrganizationSchema = z.infer<
  typeof createOrganizationSchema
>;
export type TUpdateOrganizationSchema = z.infer<
  typeof updateOrganizationSchema
>;
export type TOrganizationUserQuerySchema = z.infer<
  typeof organizationUserQuerySchema
>;
