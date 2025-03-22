import { Context } from "hono";
import { loginSchema } from "../../models/auth.model.ts";
import { db } from "../../db/index.ts";
import { userOrganizations, users } from "../../db/schema/index.ts";
import { and, eq } from "drizzle-orm/expressions";
import { comparePassword } from "../../utils/hashing.ts";
import { sign } from "hono/utils/jwt/jwt";
export async function loginController(c: Context) {
  try {
    const body = await c.req.json();

    const result = loginSchema.safeParse(body);
    if (!result.success) {
      return c.json(
        { message: "Invalid input", errors: result.error.errors },
        400
      );
    }

    const { email, password } = result.data;

    const user = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    if (user.length === 0) {
      return c.json({ message: "Invalid credentials" }, 401);
    }

    const [userData] = user;

    if (!comparePassword(userData.password, password)) {
      return c.json({ message: "Invalid credentials" }, 401);
    }

    const activeOrg = await db
      .select({
        organizationId: userOrganizations.organizationId,
      })
      .from(userOrganizations)
      .where(
        and(
          eq(userOrganizations.userId, userData.id),
          eq(userOrganizations.isActive, true)
        )
      )
      .limit(1);

    const { password: _, ...restUser } = userData;

    const userPayload = {
      ...restUser,
      activeOrganizationId:
        activeOrg.length > 0 ? activeOrg[0].organizationId : null,
    };

    const token = await sign(userPayload, Deno.env.get("JWT_SECRET") as string);

    return c.json({
      message: "Login successful",
      token,
      user: userPayload,
    });
  } catch (error) {
    console.error("Error during login:", error);
    return c.json({ message: "Internal server error" }, 500);
  }
}
