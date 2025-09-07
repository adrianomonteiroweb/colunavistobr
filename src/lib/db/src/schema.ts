import {
  pgSchema,
  varchar,
  timestamp,
  serial,
  integer,
  jsonb,
} from "drizzle-orm/pg-core";

export const schema = pgSchema("colunavisto");

// Tabela de configurações (settings) para admin, extensível via JSONB
export const settings = schema.table("settings", {
  id: serial("id").primaryKey(),
  admin_id: integer("admin_id")
    .notNull()
    .references(() => admin.id, { onDelete: "cascade" }),
  data: jsonb("data").notNull().default({}),
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at").defaultNow(),
});

// Tabela de administradores
export const admin = schema.table("admin", {
  id: serial("id").primaryKey(),
  username: varchar("username", { length: 255 }).notNull(),
  password_hash: varchar("password_hash", { length: 255 }).notNull(),
  created_at: timestamp("created_at").defaultNow(),
});

// Tabela de conteúdo do Hero
export const heroContent = schema.table("hero_content", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  subtitle: varchar("subtitle", { length: 255 }).notNull(),
  text: varchar("text", { length: 1024 }).notNull(),
  image_url: varchar("image_url", { length: 255 }).notNull(),
  // Informações do projeto
  project_info: varchar("project_info", { length: 1024 }),
  // Fundadora
  founder_name: varchar("founder_name", { length: 255 }),
  founder_bio: varchar("founder_bio", { length: 1024 }),
  founder_image_url: varchar("founder_image_url", { length: 255 }),
  // Redes sociais
  social_instagram: varchar("social_instagram", { length: 255 }),
  social_facebook: varchar("social_facebook", { length: 255 }),
  social_linkedin: varchar("social_linkedin", { length: 255 }),
  social_youtube: varchar("social_youtube", { length: 255 }),
  // Meios de pagamento
  payment_pix: varchar("payment_pix", { length: 255 }),
  payment_paypal: varchar("payment_paypal", { length: 255 }),
  payment_info: varchar("payment_info", { length: 1024 }),
  payment_qr_image_url: varchar("payment_qr_image_url", { length: 255 }),
  updated_at: timestamp("updated_at").defaultNow(),
});

// Tabela de posts para gerenciamento de conteúdo
export const post = schema.table("post", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  description: varchar("description", { length: 1024 }).notNull(),
  images: jsonb("images").notNull().default([]),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at").defaultNow().notNull(),
});
