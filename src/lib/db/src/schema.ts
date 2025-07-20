import { pgSchema, varchar, timestamp, serial } from "drizzle-orm/pg-core";

export const schema = pgSchema("colunavisto");

// Tabela de administradores
export const admin = schema.table("admin", {
  id: serial("id").primaryKey(),
  username: varchar("username", { length: 255 }).notNull(),
  password_hash: varchar("password_hash", { length: 255 }).notNull(),
  created_at: timestamp("created_at").defaultNow(),
});
