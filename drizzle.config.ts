import { defineConfig } from "drizzle-kit";
import dotenv from "dotenv";

dotenv.config();

const dbEnv = process.env.DB_ENV || "local";
let url = "";

if (dbEnv === "production") {
  url =
    process.env.POSTGRES_URL ||
    process.env.NILEDB_URL ||
    process.env.NILEDB_POSTGRES_URL ||
    "";
  // eslint-disable-next-line no-console
  console.log("[drizzle.config] DB_ENV=production, using production URL:", url);
} else {
  url = process.env.DATABASE_URL || "";
  // eslint-disable-next-line no-console
  console.log("[drizzle.config] DB_ENV=local, using local DATABASE_URL:", url);
}

export default defineConfig({
  schema: "./src/lib/db/src/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url,
  },
});
