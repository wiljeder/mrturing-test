import { Context } from "hono";
import { userQuerySchema } from "../../models/users.model.ts";
import { and, ilike } from "drizzle-orm/expressions";
import { users } from "../../db/schema/index.ts";
import { db } from "../../db/index.ts";

export async function getUsersController(c: Context) {
  try {
    const reqQuery = {
      page: c.req.query("page"),
      limit: c.req.query("limit"),
      name: c.req.query("name"),
      email: c.req.query("email"),
    };

    const result = userQuerySchema.safeParse(reqQuery);

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

    const usersList = await db
      .select()
      .from(users)
      .where(and(...conditions))
      .limit(query.limit)
      .offset(offset);
    const totalCount = await db.$count(users, and(...conditions));

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
    console.error("Error getting users:", error);
    return c.json({ message: "Internal server error" }, 500);
  }
}
