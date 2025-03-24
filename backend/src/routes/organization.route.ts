import { Hono } from "hono";
import { createOrganizationController } from "../controllers/organizations/createOrganization.controller.ts";
import { getOrganizationsController } from "../controllers/organizations/getOrganizations.controller.ts";
import { updateOrganizationController } from "../controllers/organizations/updateOrganization.controller.ts";
import { deleteOrganizationController } from "../controllers/organizations/deleteOrganization.controller.ts";
import { setActiveOrganizationController } from "../controllers/organizations/setActiveOrganization.controller.ts";
import { addUserToOrganizationController } from "../controllers/organizations/addUserToOrganization.controller.ts";
import { getOrganizationUsersController } from "../controllers/organizations/getOrganizationUsers.controller.ts";
import {
  userMiddleware,
  organizationMiddleware,
  organizationOwnerMiddleware,
} from "../middlewares/auth.middleware.ts";

export const organizationRoutes = new Hono();

organizationRoutes.post("/", userMiddleware, createOrganizationController);
organizationRoutes.get("/", userMiddleware, getOrganizationsController);
organizationRoutes.put(
  "/",
  organizationOwnerMiddleware,
  updateOrganizationController
);
organizationRoutes.delete(
  "/",
  organizationOwnerMiddleware,
  deleteOrganizationController
);

organizationRoutes.post(
  "/:organizationId/activate",
  userMiddleware,
  setActiveOrganizationController
);

organizationRoutes.get(
  "/users",
  organizationMiddleware,
  getOrganizationUsersController
);
organizationRoutes.post(
  "/:userId",
  organizationOwnerMiddleware,
  addUserToOrganizationController
);
organizationRoutes.delete(
  "/users",
  organizationOwnerMiddleware,
  deleteOrganizationController
);
