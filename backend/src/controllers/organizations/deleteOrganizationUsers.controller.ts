import { Context } from "hono";
import { batchDeleteSchema } from "../../models/users.model.ts";
import { and, eq, inArray, ne } from "drizzle-orm/expressions";
import { organizations, userOrganizations } from "../../db/schema/index.ts";
import { db } from "../../db/index.ts";

export async function deleteOrganizationUsersController(c: Context) {
  try {
    const body = await c.req.json();

    const result = batchDeleteSchema.safeParse(body);

    if (!result.success) {
      return c.json(
        { message: "Invalid input", errors: result.error.errors },
        400
      );
    }

    const userId = parseInt(c.get("userId"));
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
          message:
            "You don't have permission to delete users from this organization",
        },
        403
      );
    }

    const ids = result.data.ids;

    const deletedUsersCount = (
      await db
        .delete(userOrganizations)
        .where(
          and(
            ne(userOrganizations.userId, userId),
            eq(userOrganizations.organizationId, organizationId),
            inArray(userOrganizations.userId, ids)
          )
        )
    ).rowCount;

    if (!deletedUsersCount) {
      return c.json({ message: "Users not found" }, 404);
    }

    return c.json(undefined, 200);
  } catch (error) {
    console.error("Error deleting users:", error);
    return c.json({ message: "Internal server error" }, 500);
  }
}
