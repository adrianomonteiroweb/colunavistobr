import { migrate } from "drizzle-orm/node-postgres/migrator";
import { db } from "./db";

migrate(db, { migrationsFolder: "./migrations" })
  .then(() => {
    console.log("migrations finished!");
    process.exit(0);
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });
