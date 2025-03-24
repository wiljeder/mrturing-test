import { Context } from "hono";
import { and, eq } from "drizzle-orm/expressions";
import { userOrganizations, users } from "../../db/schema/index.ts";
import { db } from "../../db/index.ts";

export async function getMyUserController(c: Context) {
  try {
    const userId = parseInt(c.get("userId"));
    const user = await db.select().from(users).where(eq(users.id, userId));

    if (!user) {
      return c.json({ message: "User not found" }, 404);
    }

    const { password: _, ...userWithoutPassword } = user[0];

    const activeOrganization = await db
      .select()
      .from(userOrganizations)
      .where(
        and(
          eq(userOrganizations.userId, userId),
          eq(userOrganizations.isActive, true)
        )
      );

    return c.json({
      ...userWithoutPassword,
      activeOrganization: activeOrganization[0] ?? null,
    });
  } catch (error) {
    console.error("Error getting users:", error);
    return c.json({ message: "Internal server error" }, 500);
  }
}
