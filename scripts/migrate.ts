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
      `CREATE TABLE IF NOT EXISTS colunavisto.hero_content (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        subtitle VARCHAR(255) NOT NULL,
        text VARCHAR(1024) NOT NULL,
        image_url VARCHAR(255) NOT NULL,
        project_info VARCHAR(1024),
        founder_name VARCHAR(255),
        founder_bio VARCHAR(1024),
        founder_image_url VARCHAR(255),
        social_instagram VARCHAR(255),
        social_facebook VARCHAR(255),
        social_linkedin VARCHAR(255),
        social_youtube VARCHAR(255),
        payment_pix VARCHAR(255),
        payment_paypal VARCHAR(255),
        payment_info VARCHAR(1024),
        updated_at TIMESTAMP DEFAULT now()
      )`,
      `ALTER TABLE colunavisto.hero_content ADD COLUMN IF NOT EXISTS payment_qr_image_url VARCHAR(255);`,
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
