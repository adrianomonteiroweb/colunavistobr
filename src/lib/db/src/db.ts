import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";

type DatabaseEnv = {
  POSTGRES_URL?: string;
  NILEDB_URL?: string;
  NILEDB_PASSWORD?: string;
  NILEDB_USER?: string;
  NILEDB_API_URL?: string;
  NILEDB_POSTGRES_URL?: string;
  DATABASE_URL?: string;
};

const getDatabaseUrl = (): string => {
  const env = process.env as DatabaseEnv & { DB_ENV?: string };
  const dbEnv = env.DB_ENV || "local";
  if (dbEnv === "production") {
    if (env.POSTGRES_URL) return env.POSTGRES_URL;
    if (env.NILEDB_URL) return env.NILEDB_URL;
    if (env.NILEDB_POSTGRES_URL) return env.NILEDB_POSTGRES_URL;
    throw new Error(
      "No production database URL found in environment variables."
    );
  }
  if (env.DATABASE_URL) return env.DATABASE_URL;
  throw new Error(
    "No development database URL found in environment variables."
  );
};

const pool = new Pool({
  connectionString: getDatabaseUrl(),
});

export const db = drizzle(pool, { schema });
