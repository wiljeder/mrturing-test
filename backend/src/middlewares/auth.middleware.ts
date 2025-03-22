import { Context, Next } from "hono";
import { jwt } from "hono/jwt";
import { db } from "../db/index.ts";
import { users } from "../db/schema/index.ts";
import { eq } from "drizzle-orm/expressions";

export const jwtMiddleware = jwt({
  secret: Deno.env.get("JWT_SECRET") as string,
});

export async function authMiddleware(c: Context, next: Next) {
  try {
    const payload = c.get("jwtPayload");

    if (!payload || !payload.id) {
      return c.json({ message: "Unauthorized" }, 401);
    }

    const user = await db
      .select()
      .from(users)
      .where(eq(users.id, payload.id))
      .limit(1);

    if (user.length === 0) {
      return c.json({ message: "Unauthorized" }, 401);
    }

    c.set("userId", payload.id);

    if (payload.activeOrganizationId) {
      c.set("activeOrganizationId", payload.activeOrganizationId);
    }

    await next();
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return c.json({ message: "Unauthorized", error: errorMessage }, 401);
  }
}
