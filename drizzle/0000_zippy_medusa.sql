--> statement-breakpoint
CREATE TABLE "colunavisto"."admin" (
	"id" serial PRIMARY KEY NOT NULL,
	"username" varchar(255) NOT NULL,
	"password_hash" varchar(255) NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "colunavisto"."hero_content" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(255) NOT NULL,
	"subtitle" varchar(255) NOT NULL,
	"text" varchar(1024) NOT NULL,
	"image_url" varchar(255) NOT NULL,
	"project_info" varchar(1024),
	"founder_name" varchar(255),
	"founder_bio" varchar(1024),
	"founder_image_url" varchar(255),
	"social_instagram" varchar(255),
	"social_facebook" varchar(255),
	"social_linkedin" varchar(255),
	"social_youtube" varchar(255),
	"payment_pix" varchar(255),
	"payment_paypal" varchar(255),
	"payment_info" varchar(1024),
	"payment_qr_image_url" varchar(255),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "colunavisto"."post" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(255) NOT NULL,
	"description" varchar(1024) NOT NULL,
	"images" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "colunavisto"."settings" (
	"id" serial PRIMARY KEY NOT NULL,
	"admin_id" integer NOT NULL,
	"data" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "colunavisto"."settings" ADD CONSTRAINT "settings_admin_id_admin_id_fk" FOREIGN KEY ("admin_id") REFERENCES "colunavisto"."admin"("id") ON DELETE cascade ON UPDATE no action;