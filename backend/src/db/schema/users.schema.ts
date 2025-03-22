import { pgTable, serial, text } from "drizzle-orm/pg-core";
import { timestamps } from "./common.ts";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  ...timestamps,
});

export type TUsers = typeof users;
