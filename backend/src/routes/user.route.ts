import { Hono } from "hono";
import { getUsersController } from "../controllers/users/getUsers.controller.ts";
import { updateUserController } from "../controllers/users/updateUser.controller.ts";
import { getMyUserController } from "../controllers/users/getMyUser.controller.ts";
import { deleteUserController } from "../controllers/users/deleteUser.controller.ts";
import { userMiddleware } from "../middlewares/auth.middleware.ts";

export const userRoutes = new Hono();

userRoutes.get("/", getUsersController);

userRoutes.get("/me", userMiddleware, getMyUserController);
userRoutes.put("/", userMiddleware, updateUserController);
userRoutes.delete("/", userMiddleware, deleteUserController);
