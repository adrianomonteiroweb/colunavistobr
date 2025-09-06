import { migrate } from "drizzle-orm/node-postgres/migrator";
import { db } from "./db";

migrate(db, { migrationsFolder: "./migrations" })
  .then(async () => {
    console.log("migrations finished!");
    // Executa o seed-production.ts apenas em produção
    if (process.env.DB_ENV === "production") {
      try {
        const { execa } = await import("execa");
        const { stdout } = await execa("pnpm", [
          "tsx",
          "src/lib/db/scripts/seed-production.ts",
        ]);
        console.log("Seed executado com sucesso:\n", stdout);
        process.exit(0);
      } catch (seedErr) {
        console.error("Erro ao executar o seed-production.ts:", seedErr);
        process.exit(1);
      }
    } else {
      process.exit(0);
    }
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });
