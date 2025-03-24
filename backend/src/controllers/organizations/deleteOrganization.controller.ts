import { Context } from "hono";
import { db } from "../../db/index.ts";
import { organizations } from "../../db/schema/index.ts";
import { and, eq } from "drizzle-orm/expressions";

export async function deleteOrganizationController(c: Context) {
  try {
    const userId = c.get("userId");
    const organizationId = parseInt(c.get("activeOrganizationId"));

    if (!organizationId) {
      return c.json({ message: "No active organization found" }, 404);
    }

    const ownerOrganization = await db
      .select()
      .from(organizations)
      .where(
        and(
          eq(organizations.id, organizationId),
          eq(organizations.ownerId, userId)
        )
      )
      .limit(1);

    if (ownerOrganization.length === 0) {
      return c.json(
        {
          message: "You don't have permission to delete this organization",
        },
        403
      );
    }

    await db.delete(organizations).where(eq(organizations.id, organizationId));

    return c.json(undefined, 200);
  } catch (error) {
    console.error("Error deleting organization:", error);
    return c.json({ message: "Internal server error" }, 500);
  }
}
