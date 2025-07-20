CREATE SCHEMA "colunavistobr";
--> statement-breakpoint
CREATE TABLE "colunavistobr"."admin" (
	"id" serial PRIMARY KEY NOT NULL,
	"username" varchar(255) NOT NULL,
	"password_hash" varchar(255) NOT NULL,
	"created_at" timestamp DEFAULT now()
);
