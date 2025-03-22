import { Hono } from "hono";
import { createUserController } from "../controllers/users/createUser.controller.ts";
import {
  authMiddleware,
  jwtMiddleware,
} from "../middlewares/auth.middleware.ts";
import { getUsersController } from "../controllers/users/getUsers.controller.ts";
import { updateUserController } from "../controllers/users/updateUser.controller.ts";
import { deleteUsersController } from "../controllers/users/deleteUsers.controller.ts";

export const userRoutes = new Hono();

userRoutes.post("/", createUserController);
userRoutes.put("/:userId", updateUserController);
userRoutes.delete("/", deleteUsersController);

userRoutes.use("/*", jwtMiddleware, authMiddleware);
userRoutes.get("/", getUsersController);
