import { pgSchema, varchar, timestamp, serial } from "drizzle-orm/pg-core";

export const schema = pgSchema("agendei");

// Tabela principal de usuários
export const users = schema.table("users", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password_hash: varchar("password_hash", { length: 255 }).notNull(),
  role: varchar("role", { length: 50 }).notNull(), // 'user' | 'admin'
  created_at: timestamp("created_at").defaultNow(),
});
