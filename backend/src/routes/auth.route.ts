import { Hono } from "hono";
import { loginController } from "../controllers/auth/login.controller.ts";
import { registerController } from "../controllers/auth/register.controller.ts";

export const authRoutes = new Hono();

authRoutes.post("/login", loginController);
authRoutes.post("/register", registerController);
