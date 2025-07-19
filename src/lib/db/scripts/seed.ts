import * as fs from "fs";
import * as path from "path";
import { db } from "../src/db";

const executeSeedFile = async () => {
  try {
    console.log("🌱 Starting database seeding...");

    // Lê o arquivo seed.sql
    const seedFilePath = path.join(__dirname, "seed.sql");
    const seedSQL = fs.readFileSync(seedFilePath, "utf-8");

    // Remove comentários e divide em statements
    const statements = seedSQL
      .split("\n")
      .filter((line) => !line.trim().startsWith("--") && line.trim().length > 0) // Remove comentários
      .join("\n")
      .split(";")
      .map((stmt) => stmt.trim())
      .filter((stmt) => stmt.length > 0);

    // Executa cada statement
    for (const statement of statements) {
      const preview =
        statement.length > 50 ? statement.substring(0, 50) + "..." : statement;
      console.log(`Executing: ${preview}`);
      await db.execute(statement);
    }

    console.log("✅ Database seeding completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error during seeding:", error);
    process.exit(1);
  }
};

executeSeedFile();
