import { integer, pgTable, serial, text } from "drizzle-orm/pg-core";
import { timestamps } from "./common.ts";
import { users } from "./users.schema.ts";

export const organizations = pgTable("organizations", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  ownerId: integer("owner_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  ...timestamps,
});

export type TOrganizations = typeof organizations;
