import { Context, Next } from "hono";
import { jwt } from "hono/jwt";
import { db } from "../db/index.ts";
import { organizations, userOrganizations, users } from "../db/schema/index.ts";
import { and, eq } from "drizzle-orm/expressions";

interface AuthOptions {
  requireUser?: boolean;
  requireActiveOrganization?: boolean;
  requireOwnership?: boolean;
}

const createAuthMiddleware = (options: AuthOptions = {}) => {
  const jwtMiddleware = jwt({
    secret: Deno.env.get("JWT_SECRET") as string,
  });

  return async (c: Context, next: Next) => {
    try {
      if (options.requireUser) {
        await jwtMiddleware(c, async () => {});

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
        c.set("user", user[0]);
      }

      if (options.requireActiveOrganization) {
        const userId = c.get("userId");
        if (!userId) {
          return c.json({ message: "User not authenticated" }, 401);
        }

        const activeOrganization = await db
          .select({
            id: userOrganizations.organizationId,
          })
          .from(userOrganizations)
          .where(
            and(
              eq(userOrganizations.userId, userId),
              eq(userOrganizations.isActive, true)
            )
          )
          .limit(1);

        if (activeOrganization.length === 0) {
          return c.json({ message: "No active organization found" }, 403);
        }

        c.set("activeOrganizationId", activeOrganization[0].id);
      }

      if (options.requireOwnership) {
        const activeOrganizationId = c.get("activeOrganizationId");
        const userId = c.get("userId");

        if (!activeOrganizationId || !userId) {
          return c.json({ message: "No active organization found" }, 403);
        }

        const isOwner = await db
          .select()
          .from(organizations)
          .where(
            and(
              eq(organizations.ownerId, userId),
              eq(organizations.id, activeOrganizationId)
            )
          )
          .limit(1);

        if (isOwner.length === 0) {
          return c.json({ message: "Insufficient permissions" }, 403);
        }
      }

      await next();
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      return c.json(
        { message: "Authentication failed", error: errorMessage },
        500
      );
    }
  };
};

export const userMiddleware = createAuthMiddleware({ requireUser: true });
export const organizationMiddleware = createAuthMiddleware({
  requireUser: true,
  requireActiveOrganization: true,
});
export const organizationOwnerMiddleware = createAuthMiddleware({
  requireUser: true,
  requireActiveOrganization: true,
  requireOwnership: true,
});
