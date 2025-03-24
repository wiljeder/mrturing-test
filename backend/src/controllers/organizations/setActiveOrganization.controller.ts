import { Context } from "hono";
import { db } from "../../db/index.ts";
import { userOrganizations } from "../../db/schema/index.ts";
import { and, eq } from "drizzle-orm/expressions";

export async function setActiveOrganizationController(c: Context) {
  try {
    const userId = c.get("userId");
    const organizationId = parseInt(c.req.param("organizationId"));

    return db.transaction(async (tx) => {
      const userOrg = await tx
        .select()
        .from(userOrganizations)
        .where(
          and(
            eq(userOrganizations.userId, userId),
            eq(userOrganizations.organizationId, organizationId)
          )
        )
        .limit(1);

      if (userOrg.length === 0) {
        return c.json(
          { message: "Non-existent organization or you don't belong to it" },
          404
        );
      }

      await tx
        .update(userOrganizations)
        .set({ isActive: false })
        .where(eq(userOrganizations.userId, userId));

      await tx
        .update(userOrganizations)
        .set({ isActive: true })
        .where(
          and(
            eq(userOrganizations.userId, userId),
            eq(userOrganizations.organizationId, organizationId)
          )
        );

      return c.json(undefined, 200);
    });
  } catch (error) {
    console.error("Error setting active organization:", error);
    return c.json({ message: "Internal server error" }, 500);
  }
}
