import { Context } from "hono";
import { createOrganizationSchema } from "../../models/organizations.model.ts";
import { db } from "../../db/index.ts";
import { organizations, userOrganizations } from "../../db/schema/index.ts";
import { eq } from "drizzle-orm/expressions";

export async function createOrganizationController(c: Context) {
  try {
    const body = await c.req.json();
    const userId = c.get("userId");

    const result = createOrganizationSchema.safeParse(body);
    if (!result.success) {
      return c.json(
        { message: "Invalid input", errors: result.error.errors },
        400
      );
    }

    const organizationData = result.data;

    // add the user to the organization, set all other
    // organizations as inactive and the new one as active
    const newOrganization = await db.transaction(async (tx) => {
      const [newOrganization] = await tx
        .insert(organizations)
        .values({
          name: organizationData.name,
          description: organizationData.description,
          ownerId: userId,
        })
        .returning();

      await tx
        .update(userOrganizations)
        .set({
          isActive: false,
        })
        .where(eq(userOrganizations.userId, userId));

      await tx.insert(userOrganizations).values({
        userId: userId,
        organizationId: newOrganization.id,
        isActive: true,
      });

      return newOrganization;
    });

    return c.json(newOrganization, 201);
  } catch (error) {
    console.error("Error creating organization:", error);
    return c.json({ message: "Internal server error" }, 500);
  }
}
