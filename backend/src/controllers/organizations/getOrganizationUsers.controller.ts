import { Context } from "hono";
import { and, eq, ilike, inArray } from "drizzle-orm/expressions";
import { userOrganizations, users } from "../../db/schema/index.ts";
import { db } from "../../db/index.ts";
import { organizationUserQuerySchema } from "../../models/organizations.model.ts";

export async function getOrganizationUsersController(c: Context) {
  try {
    const reqQuery = {
      page: c.req.query("page"),
      limit: c.req.query("limit"),
      name: c.req.query("name"),
      email: c.req.query("email"),
    };

    const result = organizationUserQuerySchema.safeParse(reqQuery);

    if (!result.success) {
      return c.json(
        { message: "Invalid input", errors: result.error.errors },
        400
      );
    }

    const query = result.data;
    const offset = (query.page - 1) * query.limit;

    const conditions = [];
    if (query.name) {
      conditions.push(ilike(users.name, `%${query.name}%`));
    }
    if (query.email) {
      conditions.push(ilike(users.email, `%${query.email}%`));
    }

    const activeOrganizationId = c.get("activeOrganizationId");

    if (!activeOrganizationId) {
      return c.json({ message: "No active organization" }, 400);
    }

    let usersList = [];
    let totalCount: number = 0;

    const userIdsQuery = await db
      .select({ userId: userOrganizations.userId })
      .from(userOrganizations)
      .where(eq(userOrganizations.organizationId, activeOrganizationId));

    const userIds = userIdsQuery.map((user) => user.userId);

    usersList = await db
      .select()
      .from(users)
      .where(and(...conditions, inArray(users.id, userIds)))
      .limit(query.limit)
      .offset(offset);

    totalCount = await db.$count(
      users,
      and(...conditions, inArray(users.id, userIds))
    );

    const usersWithoutPassword = usersList.map(
      ({ password: _, ...user }) => user
    );

    return c.json({
      users: usersWithoutPassword,
      pagination: {
        page: query.page,
        limit: query.limit,
        totalItems: totalCount,
        totalPages: Math.ceil(totalCount / query.limit),
      },
    });
  } catch (error) {
    console.error("Error getting organization users:", error);
    return c.json({ message: "Internal server error" }, 500);
  }
}
