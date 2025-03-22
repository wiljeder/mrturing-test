import { Hono } from "hono";
import { createUserController } from "../controllers/users/createUser.controller.ts";

export const userRoutes = new Hono();

userRoutes.post("/", createUserController);
