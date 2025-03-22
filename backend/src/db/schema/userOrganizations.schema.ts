import { boolean, integer, pgTable, primaryKey } from "drizzle-orm/pg-core";
import { timestamps } from "./common.ts";
import { organizations, users } from "./index.ts";

export const userOrganizations = pgTable(
  "user_organizations",
  {
    userId: integer("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    organizationId: integer("organization_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    isActive: boolean("is_active").default(false).notNull(),
    ...timestamps,
  },
  (t) => ({
    pk: primaryKey(t.userId, t.organizationId),
  })
);

export type TUserOrganizations = typeof userOrganizations;
