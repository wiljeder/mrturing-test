import { Context } from "hono";
import { updateUserSchema } from "../../models/users.model.ts";
import { eq } from "drizzle-orm/expressions";
import { users } from "../../db/schema/index.ts";
import { db } from "../../db/index.ts";

export async function updateUserController(c: Context) {
  try {
    const body = await c.req.json();

    const result = updateUserSchema.safeParse(body);

    if (!result.success) {
      return c.json(
        { message: "Invalid input", errors: result.error.errors },
        400
      );
    }

    const userData = result.data;

    const userId = parseInt(c.req.param("userId"));
    const user = await db.select().from(users).where(eq(users.id, userId));

    if (!user) {
      return c.json({ message: "User not found" }, 404);
    }

    const [updatedUser] = await db
      .update(users)
      .set(userData)
      .where(eq(users.id, userId))
      .returning();

    const { password: _, ...updatedUserWithoutPassword } = updatedUser;

    return c.json(updatedUserWithoutPassword, 200);
  } catch (error) {
    console.error("Error updating user:", error);
    return c.json({ message: "Internal server error" }, 500);
  }
}
