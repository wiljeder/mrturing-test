import { Context } from "hono";
import { db } from "../../db/index.ts";
import {
  users,
  userOrganizations,
  organizations,
} from "../../db/schema/index.ts";
import { and, eq } from "drizzle-orm/expressions";

export async function addUserToOrganizationController(c: Context) {
  try {
    const userId = parseInt(c.get("userId"));
    const organizationId = parseInt(c.get("activeOrganizationId"));
    const addedUserId = parseInt(c.req.param("userId"));

    if (!organizationId) {
      return c.json({ message: "No active organization found" }, 404);
    }

    const organization = await db
      .select()
      .from(organizations)
      .where(
        and(
          eq(organizations.id, organizationId),
          eq(organizations.ownerId, userId)
        )
      )
      .limit(1);

    if (organization.length === 0) {
      return c.json(
        {
          message: "You don't have permission to add users",
        },
        403
      );
    }

    const userToAdd = await db
      .select()
      .from(users)
      .where(eq(users.id, addedUserId))
      .limit(1);

    if (userToAdd.length === 0) {
      return c.json({ message: "User not found" }, 404);
    }

    const existingMembership = await db
      .select()
      .from(userOrganizations)
      .where(
        and(
          eq(userOrganizations.userId, addedUserId),
          eq(userOrganizations.organizationId, organizationId)
        )
      )
      .limit(1);

    if (existingMembership.length > 0) {
      return c.json(
        { message: "User is already a member of this organization" },
        409
      );
    }

    const [userOrganization] = await db
      .insert(userOrganizations)
      .values({
        userId: addedUserId,
        organizationId,
        isActive: false,
      })
      .returning();

    return c.json(userOrganization, 201);
  } catch (error) {
    console.error("Error adding user to organization:", error);
    return c.json({ message: "Internal server error" }, 500);
  }
}
