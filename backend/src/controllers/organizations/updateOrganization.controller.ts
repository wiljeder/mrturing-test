import { Context } from "hono";
import { updateOrganizationSchema } from "../../models/organizations.model.ts";
import { db } from "../../db/index.ts";
import { organizations } from "../../db/schema/index.ts";
import { and, eq } from "drizzle-orm/expressions";

export async function updateOrganizationController(c: Context) {
  try {
    const body = await c.req.json();
    const userId = c.get("userId");
    const organizationId = parseInt(c.get("activeOrganizationId"));

    if (!organizationId) {
      return c.json(
        {
          message: "No active organization found",
        },
        404
      );
    }

    const result = updateOrganizationSchema.safeParse(body);
    if (!result.success) {
      return c.json(
        { message: "Invalid input", errors: result.error.errors },
        400
      );
    }

    const organizationData = result.data;

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
          message: "You don't have permission to update this organization",
        },
        404
      );
    }

    const [updatedOrganization] = await db
      .update(organizations)
      .set(organizationData)
      .where(eq(organizations.id, organizationId))
      .returning();

    return c.json(updatedOrganization, 200);
  } catch (error) {
    console.error("Error updating organization:", error);
    return c.json({ message: "Internal server error" }, 500);
  }
}
