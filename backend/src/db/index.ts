import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "./schema/index.ts";

const pool = new pg.Pool({
  connectionString: Deno.env.get("DATABASE_URL") as string,
});

export const db = drizzle({ client: pool, schema });
