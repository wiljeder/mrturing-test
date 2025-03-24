import { Context } from "hono";
import { eq } from "drizzle-orm/expressions";
import { users } from "../../db/schema/index.ts";
import { db } from "../../db/index.ts";

export async function deleteUserController(c: Context) {
  try {
    const userId = c.get("userId");

    await db.delete(users).where(eq(users.id, userId));

    return c.json(undefined, 200);
  } catch (error) {
    console.error("Error deleting users:", error);
    return c.json({ message: "Internal server error" }, 500);
  }
}
