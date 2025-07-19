CREATE SCHEMA "agendei";
--> statement-breakpoint
CREATE TABLE "agendei"."appointment_attachments" (
	"id" serial PRIMARY KEY NOT NULL,
	"appointment_id" integer NOT NULL,
	"filename" varchar(255) NOT NULL,
	"file_type" varchar(100) NOT NULL,
	"file_url" varchar(500) NOT NULL,
	"file_size" integer,
	"uploaded_by" varchar(50) NOT NULL,
	"is_visible_to_customer" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "agendei"."appointment_contexts" (
	"id" serial PRIMARY KEY NOT NULL,
	"appointment_id" integer NOT NULL,
	"internal_notes" text,
	"public_notes" text,
	"status" varchar(50) DEFAULT 'scheduled',
	"context_type" varchar(50),
	"title" varchar(255),
	"content" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "agendei"."appointment_tasks" (
	"id" serial PRIMARY KEY NOT NULL,
	"appointment_id" integer NOT NULL,
	"title" varchar(255) NOT NULL,
	"description" text,
	"is_completed" boolean DEFAULT false NOT NULL,
	"is_visible_to_customer" boolean DEFAULT true NOT NULL,
	"due_date" timestamp,
	"completion_date" timestamp,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "agendei"."appointments" (
	"id" serial PRIMARY KEY NOT NULL,
	"professional_id" integer NOT NULL,
	"customer_id" integer NOT NULL,
	"title" varchar(255) NOT NULL,
	"status" varchar(50) NOT NULL,
	"start_at" timestamp NOT NULL,
	"end_at" timestamp NOT NULL,
	"duration_minutes" integer NOT NULL,
	"is_recurring" boolean DEFAULT false NOT NULL,
	"rrule" text,
	"series_id" varchar(36),
	"is_master" boolean DEFAULT true NOT NULL,
	"master_id" integer,
	"occurrence_date" timestamp,
	"availability_slot_id" integer,
	"is_exception" boolean DEFAULT false NOT NULL,
	"exception_type" varchar(50),
	"original_start_at" timestamp,
	"location_type" varchar(50),
	"location_address" text,
	"online_meeting_url" varchar(500),
	"price" integer NOT NULL,
	"payment_id" integer,
	"client_rating" integer,
	"client_feedback" text,
	"professional_notes" text,
	"metadata" jsonb,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "agendei"."availabilities" (
	"id" serial PRIMARY KEY NOT NULL,
	"professional_id" integer NOT NULL,
	"title" varchar(255) NOT NULL,
	"rrule" text NOT NULL,
	"start_time" time NOT NULL,
	"end_time" time NOT NULL,
	"duration_minutes" integer NOT NULL,
	"buffer_minutes" integer DEFAULT 0 NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"effective_from" timestamp NOT NULL,
	"effective_until" timestamp,
	"metadata" jsonb,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "agendei"."availability_exceptions" (
	"id" serial PRIMARY KEY NOT NULL,
	"professional_id" integer NOT NULL,
	"availability_id" integer,
	"exception_type" varchar(50) NOT NULL,
	"title" varchar(255) NOT NULL,
	"start_at" timestamp NOT NULL,
	"end_at" timestamp NOT NULL,
	"is_recurring" boolean DEFAULT false NOT NULL,
	"rrule" text,
	"modified_start_time" time,
	"modified_end_time" time,
	"notes" text,
	"metadata" jsonb,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "agendei"."availability_slots" (
	"id" serial PRIMARY KEY NOT NULL,
	"availability_id" integer NOT NULL,
	"professional_id" integer NOT NULL,
	"start_at" timestamp NOT NULL,
	"end_at" timestamp NOT NULL,
	"status" varchar(50) DEFAULT 'available' NOT NULL,
	"appointment_id" integer,
	"generated_at" timestamp DEFAULT now(),
	"metadata" jsonb
);
--> statement-breakpoint
CREATE TABLE "agendei"."customers" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"stripe_customer_id" varchar(255),
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "customers_user_id_unique" UNIQUE("user_id")
);
--> statement-breakpoint
CREATE TABLE "agendei"."packages" (
	"id" serial PRIMARY KEY NOT NULL,
	"professional_id" integer NOT NULL,
	"title" varchar(255) NOT NULL,
	"description" text,
	"price" integer NOT NULL,
	"number_of_sessions" integer NOT NULL,
	"allow_rollover" boolean DEFAULT false NOT NULL,
	"max_rollover_sessions" integer DEFAULT 0,
	"cancellation_policy" text,
	"is_active" boolean DEFAULT true NOT NULL,
	"stripe_price_id" varchar(255),
	"stripe_product_id" varchar(255),
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "agendei"."payments" (
	"id" serial PRIMARY KEY NOT NULL,
	"stripe_payment_intent_id" varchar(255) NOT NULL,
	"stripe_session_id" varchar(255),
	"amount" integer NOT NULL,
	"currency" varchar(10) DEFAULT 'brl',
	"status" varchar(50) NOT NULL,
	"method" varchar(50),
	"customer_id" integer NOT NULL,
	"professional_id" integer NOT NULL,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "payments_stripe_payment_intent_id_unique" UNIQUE("stripe_payment_intent_id"),
	CONSTRAINT "payments_stripe_session_id_unique" UNIQUE("stripe_session_id")
);
--> statement-breakpoint
CREATE TABLE "agendei"."professional_tasks" (
	"id" serial PRIMARY KEY NOT NULL,
	"professional_id" integer NOT NULL,
	"title" varchar(255) NOT NULL,
	"description" text,
	"category" varchar(100),
	"priority" varchar(50) DEFAULT 'medium',
	"is_recurring" boolean DEFAULT false NOT NULL,
	"rrule" text,
	"recurrence_type" varchar(50),
	"series_id" varchar(36),
	"is_master" boolean DEFAULT true NOT NULL,
	"master_id" integer,
	"due_date" timestamp NOT NULL,
	"completed_at" timestamp,
	"status" varchar(50) DEFAULT 'pending',
	"alert_settings" jsonb,
	"last_alert_sent" timestamp,
	"next_alert_at" timestamp,
	"appointment_id" integer,
	"customer_id" integer,
	"context_type" varchar(50),
	"estimated_duration_minutes" integer,
	"actual_duration_minutes" integer,
	"tags" jsonb,
	"metadata" jsonb,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "agendei"."professionals" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"username" varchar(50) NOT NULL,
	"bio" text,
	"profession_type" varchar(50) NOT NULL,
	"hourly_rate" integer NOT NULL,
	"stripe_account_id" varchar(255),
	"metadata" jsonb,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "professionals_user_id_unique" UNIQUE("user_id"),
	CONSTRAINT "professionals_username_unique" UNIQUE("username")
);
--> statement-breakpoint
CREATE TABLE "agendei"."session_usage" (
	"id" serial PRIMARY KEY NOT NULL,
	"subscription_id" integer NOT NULL,
	"appointment_id" integer,
	"session_date" timestamp NOT NULL,
	"was_rollover" boolean DEFAULT false NOT NULL,
	"notes" text,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "agendei"."subscriptions" (
	"id" serial PRIMARY KEY NOT NULL,
	"stripe_subscription_id" varchar(255) NOT NULL,
	"customer_id" integer NOT NULL,
	"professional_id" integer NOT NULL,
	"package_id" integer NOT NULL,
	"status" varchar(50) NOT NULL,
	"current_period_start" timestamp NOT NULL,
	"current_period_end" timestamp NOT NULL,
	"sessions_used_current_period" integer DEFAULT 0 NOT NULL,
	"sessions_rollover" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "subscriptions_stripe_subscription_id_unique" UNIQUE("stripe_subscription_id")
);
--> statement-breakpoint
CREATE TABLE "agendei"."task_attachments" (
	"id" serial PRIMARY KEY NOT NULL,
	"task_id" integer NOT NULL,
	"filename" varchar(255) NOT NULL,
	"file_type" varchar(100) NOT NULL,
	"file_url" varchar(500) NOT NULL,
	"file_size" integer,
	"uploaded_by" varchar(50) NOT NULL,
	"description" text,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "agendei"."task_history" (
	"id" serial PRIMARY KEY NOT NULL,
	"task_id" integer NOT NULL,
	"action" varchar(50) NOT NULL,
	"field_changed" varchar(100),
	"old_value" text,
	"new_value" text,
	"changed_by" varchar(50) DEFAULT 'professional',
	"notes" text,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "agendei"."task_subtasks" (
	"id" serial PRIMARY KEY NOT NULL,
	"parent_task_id" integer NOT NULL,
	"title" varchar(255) NOT NULL,
	"description" text,
	"is_completed" boolean DEFAULT false NOT NULL,
	"due_date" timestamp,
	"completed_at" timestamp,
	"order_index" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "agendei"."users" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"password_hash" varchar(255) NOT NULL,
	"role" varchar(50) NOT NULL,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "agendei"."appointment_attachments" ADD CONSTRAINT "appointment_attachments_appointment_id_appointments_id_fk" FOREIGN KEY ("appointment_id") REFERENCES "agendei"."appointments"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "agendei"."appointment_contexts" ADD CONSTRAINT "appointment_contexts_appointment_id_appointments_id_fk" FOREIGN KEY ("appointment_id") REFERENCES "agendei"."appointments"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "agendei"."appointment_tasks" ADD CONSTRAINT "appointment_tasks_appointment_id_appointments_id_fk" FOREIGN KEY ("appointment_id") REFERENCES "agendei"."appointments"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "agendei"."appointments" ADD CONSTRAINT "appointments_professional_id_professionals_id_fk" FOREIGN KEY ("professional_id") REFERENCES "agendei"."professionals"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "agendei"."appointments" ADD CONSTRAINT "appointments_customer_id_customers_id_fk" FOREIGN KEY ("customer_id") REFERENCES "agendei"."customers"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "agendei"."appointments" ADD CONSTRAINT "appointments_master_id_appointments_id_fk" FOREIGN KEY ("master_id") REFERENCES "agendei"."appointments"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "agendei"."appointments" ADD CONSTRAINT "appointments_availability_slot_id_availability_slots_id_fk" FOREIGN KEY ("availability_slot_id") REFERENCES "agendei"."availability_slots"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "agendei"."appointments" ADD CONSTRAINT "appointments_payment_id_payments_id_fk" FOREIGN KEY ("payment_id") REFERENCES "agendei"."payments"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "agendei"."availabilities" ADD CONSTRAINT "availabilities_professional_id_professionals_id_fk" FOREIGN KEY ("professional_id") REFERENCES "agendei"."professionals"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "agendei"."availability_exceptions" ADD CONSTRAINT "availability_exceptions_professional_id_professionals_id_fk" FOREIGN KEY ("professional_id") REFERENCES "agendei"."professionals"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "agendei"."availability_exceptions" ADD CONSTRAINT "availability_exceptions_availability_id_availabilities_id_fk" FOREIGN KEY ("availability_id") REFERENCES "agendei"."availabilities"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "agendei"."availability_slots" ADD CONSTRAINT "availability_slots_availability_id_availabilities_id_fk" FOREIGN KEY ("availability_id") REFERENCES "agendei"."availabilities"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "agendei"."availability_slots" ADD CONSTRAINT "availability_slots_professional_id_professionals_id_fk" FOREIGN KEY ("professional_id") REFERENCES "agendei"."professionals"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "agendei"."availability_slots" ADD CONSTRAINT "availability_slots_appointment_id_appointments_id_fk" FOREIGN KEY ("appointment_id") REFERENCES "agendei"."appointments"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "agendei"."customers" ADD CONSTRAINT "customers_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "agendei"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "agendei"."packages" ADD CONSTRAINT "packages_professional_id_professionals_id_fk" FOREIGN KEY ("professional_id") REFERENCES "agendei"."professionals"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "agendei"."payments" ADD CONSTRAINT "payments_customer_id_customers_id_fk" FOREIGN KEY ("customer_id") REFERENCES "agendei"."customers"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "agendei"."payments" ADD CONSTRAINT "payments_professional_id_professionals_id_fk" FOREIGN KEY ("professional_id") REFERENCES "agendei"."professionals"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "agendei"."professional_tasks" ADD CONSTRAINT "professional_tasks_professional_id_professionals_id_fk" FOREIGN KEY ("professional_id") REFERENCES "agendei"."professionals"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "agendei"."professional_tasks" ADD CONSTRAINT "professional_tasks_master_id_professional_tasks_id_fk" FOREIGN KEY ("master_id") REFERENCES "agendei"."professional_tasks"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "agendei"."professional_tasks" ADD CONSTRAINT "professional_tasks_appointment_id_appointments_id_fk" FOREIGN KEY ("appointment_id") REFERENCES "agendei"."appointments"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "agendei"."professional_tasks" ADD CONSTRAINT "professional_tasks_customer_id_customers_id_fk" FOREIGN KEY ("customer_id") REFERENCES "agendei"."customers"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "agendei"."professionals" ADD CONSTRAINT "professionals_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "agendei"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "agendei"."session_usage" ADD CONSTRAINT "session_usage_subscription_id_subscriptions_id_fk" FOREIGN KEY ("subscription_id") REFERENCES "agendei"."subscriptions"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "agendei"."session_usage" ADD CONSTRAINT "session_usage_appointment_id_appointments_id_fk" FOREIGN KEY ("appointment_id") REFERENCES "agendei"."appointments"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "agendei"."subscriptions" ADD CONSTRAINT "subscriptions_customer_id_customers_id_fk" FOREIGN KEY ("customer_id") REFERENCES "agendei"."customers"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "agendei"."subscriptions" ADD CONSTRAINT "subscriptions_professional_id_professionals_id_fk" FOREIGN KEY ("professional_id") REFERENCES "agendei"."professionals"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "agendei"."subscriptions" ADD CONSTRAINT "subscriptions_package_id_packages_id_fk" FOREIGN KEY ("package_id") REFERENCES "agendei"."packages"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "agendei"."task_attachments" ADD CONSTRAINT "task_attachments_task_id_professional_tasks_id_fk" FOREIGN KEY ("task_id") REFERENCES "agendei"."professional_tasks"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "agendei"."task_history" ADD CONSTRAINT "task_history_task_id_professional_tasks_id_fk" FOREIGN KEY ("task_id") REFERENCES "agendei"."professional_tasks"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "agendei"."task_subtasks" ADD CONSTRAINT "task_subtasks_parent_task_id_professional_tasks_id_fk" FOREIGN KEY ("parent_task_id") REFERENCES "agendei"."professional_tasks"("id") ON DELETE no action ON UPDATE no action;