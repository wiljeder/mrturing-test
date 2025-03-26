import { Context } from "hono";
import { db } from "../../db/index.ts";
import { organizations } from "../../db/schema/index.ts";
import { and, eq } from "drizzle-orm/expressions";
import { userOrganizations } from "../../db/schema/userOrganizations.schema.ts";

export async function getActiveOrganizationController(c: Context) {
  try {
    const userId = c.get("userId");

    const organization = await db
      .select()
      .from(organizations)
      .innerJoin(
        userOrganizations,
        eq(organizations.id, userOrganizations.organizationId)
      )
      .where(
        and(
          eq(userOrganizations.userId, userId),
          eq(userOrganizations.isActive, true)
        )
      );

    if (!organization.length) {
      return c.json({ message: "Organization not found" }, 404);
    }

    return c.json(organization[0].organizations, 200);
  } catch (error) {
    console.error("Error retrieving organization:", error);
    return c.json({ message: "Internal server error" }, 500);
  }
}
