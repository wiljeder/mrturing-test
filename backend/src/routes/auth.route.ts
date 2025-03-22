import { Hono } from "hono";
import { loginController } from "../controllers/auth/login.controller.ts";

export const authRoutes = new Hono();

authRoutes.post("/login", loginController);
