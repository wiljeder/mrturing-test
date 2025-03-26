import { Context } from "hono";
import { db } from "../../db/index.ts";
import { organizations, userOrganizations } from "../../db/schema/index.ts";
import { desc, eq } from "drizzle-orm/expressions";
import { paginationSchema } from "../../models/pagination.model.ts";

export async function getOrganizationsController(c: Context) {
  try {
    const reqQuery = {
      page: c.req.query("page"),
      limit: c.req.query("limit"),
    };

    const result = paginationSchema.safeParse(reqQuery);

    if (!result.success) {
      return c.json(
        { message: "Invalid input", errors: result.error.errors },
        400
      );
    }

    const query = result.data;
    const offset = (query.page - 1) * query.limit;

    const userId = c.get("userId");

    const userOrgs = await db
      .select({
        organization: organizations,
        isActive: userOrganizations.isActive,
      })
      .from(userOrganizations)
      .innerJoin(
        organizations,
        eq(userOrganizations.organizationId, organizations.id)
      )
      .where(eq(userOrganizations.userId, userId))
      .orderBy(desc(userOrganizations.isActive))
      .limit(query.limit)
      .offset(offset);

    const totalCount = await db.$count(
      userOrganizations,
      eq(userOrganizations.userId, userId)
    );

    const formattedAndOrderedOrgs = userOrgs.map((item) => ({
      ...item.organization,
      isActive: item.isActive,
    }));

    return c.json(
      {
        organizations: formattedAndOrderedOrgs,
        pagination: {
          page: query.page,
          limit: query.limit,
          totalItems: totalCount,
          totalPages: Math.ceil(totalCount / query.limit),
        },
      },
      200
    );
  } catch (error) {
    console.error("Error retrieving organizations:", error);
    return c.json({ message: "Internal server error" }, 500);
  }
}
