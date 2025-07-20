import dotenv from "dotenv";
dotenv.config();

const isProduction = process.env.DB_ENV === "production";

if (isProduction) {
  import("@niledatabase/server").then(async ({ Nile }) => {
    const server = await Nile({
      user: process.env.NILEDB_USER,
      password: process.env.NILEDB_PASSWORD,
      databaseName: process.env.NILEDB_URL?.split("/").pop(),
      databaseId: process.env.NILEDB_API_URL?.split("/").pop(),
    });

    // Adicione aqui os comandos SQL para todas as tabelas
    const sqlCommands = [
      `CREATE SCHEMA IF NOT EXISTS colunavisto`,
      `CREATE TABLE IF NOT EXISTS colunavisto.admin (
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
      )`,
      // Adicione outros comandos CREATE TABLE aqui conforme necessário
    ];
    try {
      for (const sql of sqlCommands) {
        await server.db.query(sql);
      }
      console.log("Tabelas criadas com sucesso no Nile!");
    } catch (err) {
      console.error("Erro ao criar tabelas no Nile:", err);
      process.exit(1);
    }
  });
} else {
  console.log(
    "Ambiente de desenvolvimento: use 'pnpm drizzle-kit push' para rodar migrations."
  );
}
