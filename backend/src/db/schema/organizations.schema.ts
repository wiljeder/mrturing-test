import { pgTable, serial, text } from "drizzle-orm/pg-core";
import { timestamps } from "./common.ts";

export const organizations = pgTable("organizations", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  ...timestamps,
});

export type TOrganizations = typeof organizations;
