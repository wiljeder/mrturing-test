import { Hono } from "hono";
import { logger } from "hono/logger";
import { cors } from "hono/cors";
import { userRoutes } from "./routes/user.route.ts";
import { organizationRoutes } from "./routes/organization.route.ts";

const app = new Hono();

app.use(logger());
app.use(cors());

app.route("/api/users", userRoutes);
app.route("/api/organizations", organizationRoutes);

app.get("/health", (c) => c.json({ status: "ok" }));

const port = parseInt(Deno.env.get("PORT") || "3000");

Deno.serve({ port }, app.fetch);
