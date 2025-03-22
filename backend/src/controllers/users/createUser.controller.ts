import { Context } from "hono";
import { createUserSchema } from "../../models/users.model.ts";
import { db } from "../../db/index.ts";
import { users } from "../../db/schema/index.ts";
import { eq } from "drizzle-orm/expressions";
import { hashPassword } from "../../utils/hashing.ts";

export async function createUserController(c: Context) {
  try {
    const body = await c.req.json();

    const result = createUserSchema.safeParse(body);
    if (!result.success) {
      return c.json(
        { message: "Invalid input", errors: result.error.errors },
        400
      );
    }

    const userData = result.data;

    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.email, userData.email))
      .limit(1);

    if (existingUser.length > 0) {
      return c.json({ message: "Email already in use" }, 409);
    }

    const hashedPassword = await hashPassword(userData.password);

    const [newUser] = await db
      .insert(users)
      .values({
        name: userData.name,
        email: userData.email,
        password: hashedPassword,
      })
      .returning();

    return c.json(
      {
        message: "User created successfully",
        user: {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
          createdAt: newUser.createdAt,
          updatedAt: newUser.updatedAt,
        },
      },
      201
    );
  } catch (error) {
    console.error("Error creating user:", error);
    return c.json({ message: "Internal server error" }, 500);
  }
}
