import { Context } from "hono";
import { batchDeleteSchema } from "../../models/users.model.ts";
import { inArray } from "drizzle-orm/expressions";
import { users } from "../../db/schema/index.ts";
import { db } from "../../db/index.ts";

export async function deleteUsersController(c: Context) {
  try {
    const body = await c.req.json();

    const result = batchDeleteSchema.safeParse(body);

    if (!result.success) {
      return c.json(
        { message: "Invalid input", errors: result.error.errors },
        400
      );
    }

    const ids = result.data;

    const deletedUsersCount = (
      await db.delete(users).where(inArray(users.id, ids))
    ).rowCount;

    if (!deletedUsersCount) {
      return c.json({ message: "Users not found" }, 404);
    }

    return c.json({
      message: "Users deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting users:", error);
    return c.json({ message: "Internal server error" }, 500);
  }
}
