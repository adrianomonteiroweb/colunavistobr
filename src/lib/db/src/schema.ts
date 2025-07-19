// @ts-nocheck
import { sql } from "drizzle-orm";
import {
  pgSchema,
  boolean,
  varchar,
  jsonb,
  timestamp,
  numeric,
  integer,
  text,
  serial,
  time,
} from "drizzle-orm/pg-core";

export const schema = pgSchema("agendei");

// Tabela principal de usuários
export const users = schema.table("users", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password_hash: varchar("password_hash", { length: 255 }).notNull(),
  role: varchar("role", { length: 50 }).notNull(), // 'professional' | 'customer' | 'admin'
  created_at: timestamp("created_at").defaultNow(),
});

// Profissionais que oferecem serviços
export const professionals = schema.table("professionals", {
  id: serial("id").primaryKey(),
  user_id: integer("user_id")
    .references(() => users.id)
    .notNull()
    .unique(),

  username: varchar("username", { length: 50 }).notNull().unique(), // Username público único

  // Informações profissionais
  bio: text("bio"),
  profession_type: varchar("profession_type", { length: 50 }).notNull(), // healthcare, education, fitness, etc.
  hourly_rate: integer("hourly_rate").notNull(), // valor por hora (em centavos)

  // Integração Stripe
  stripe_account_id: varchar("stripe_account_id", { length: 255 }),

  // Metadados flexíveis para diferentes tipos de profissão
  metadata: jsonb("metadata"),

  created_at: timestamp("created_at").defaultNow(),
});

// Clientes que consomem serviços
export const customers = schema.table("customers", {
  id: serial("id").primaryKey(),
  user_id: integer("user_id")
    .references(() => users.id)
    .notNull()
    .unique(),
  stripe_customer_id: varchar("stripe_customer_id", { length: 255 }), // Stripe customer ID
  created_at: timestamp("created_at").defaultNow(),
});

// Disponibilidade dos profissionais com suporte a RRules
export const availabilities = schema.table("availabilities", {
  id: serial("id").primaryKey(),
  professional_id: integer("professional_id")
    .references(() => professionals.id)
    .notNull(),

  // Sistema de recorrência baseado em RRules para flexibilidade
  title: varchar("title", { length: 255 }).notNull(), // ex: "Segunda-feira manhã", "Fins de semana", "Plantão noturno"
  rrule: text("rrule").notNull(), // RRule string para disponibilidades recorrentes

  // Horários para esta disponibilidade
  start_time: time("start_time").notNull(),
  end_time: time("end_time").notNull(),
  duration_minutes: integer("duration_minutes").notNull(), // Duração padrão dos slots

  // Intervalo entre agendamentos (buffer time)
  buffer_minutes: integer("buffer_minutes").default(0).notNull(),

  // Controle de ativação
  is_active: boolean("is_active").default(true).notNull(),
  effective_from: timestamp("effective_from").notNull(), // Data de início da disponibilidade
  effective_until: timestamp("effective_until"), // Data de fim (null = indefinido)

  // Metadados flexíveis para configurações específicas
  metadata: jsonb("metadata"), // ex: { max_bookings_per_day: 5, advance_booking_days: 30 }

  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at").defaultNow(),
});

// Exceções de disponibilidade (bloqueios, feriados, licenças)
export const availability_exceptions = schema.table("availability_exceptions", {
  id: serial("id").primaryKey(),
  professional_id: integer("professional_id")
    .references(() => professionals.id)
    .notNull(),
  availability_id: integer("availability_id").references(
    () => availabilities.id
  ), // null = exceção geral

  exception_type: varchar("exception_type", { length: 50 }).notNull(), // 'block' | 'modify' | 'cancel'
  title: varchar("title", { length: 255 }).notNull(), // ex: "Férias", "Consulta médica", "Feriado"

  // Data/período da exceção
  start_at: timestamp("start_at").notNull(),
  end_at: timestamp("end_at").notNull(),

  // Para exceções recorrentes (ex: feriados anuais)
  is_recurring: boolean("is_recurring").default(false).notNull(),
  rrule: text("rrule"), // RRule para exceções recorrentes

  // Modificações nos horários (quando exception_type = 'modify')
  modified_start_time: time("modified_start_time"),
  modified_end_time: time("modified_end_time"),

  // Notas e metadados
  notes: text("notes"),
  metadata: jsonb("metadata"),

  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at").defaultNow(),
});

// Slots de tempo disponíveis gerados a partir das disponibilidades
export const availability_slots = schema.table("availability_slots", {
  id: serial("id").primaryKey(),
  availability_id: integer("availability_id")
    .references(() => availabilities.id)
    .notNull(),
  professional_id: integer("professional_id")
    .references(() => professionals.id)
    .notNull(),

  // Slot específico de tempo
  start_at: timestamp("start_at").notNull(),
  end_at: timestamp("end_at").notNull(),

  // Status do slot
  status: varchar("status", { length: 50 }).default("available").notNull(), // 'available' | 'booked' | 'blocked' | 'past'
  appointment_id: integer("appointment_id").references(() => appointments.id), // null = disponível

  // Data de geração (para controle de cache)
  generated_at: timestamp("generated_at").defaultNow(),

  // Metadados do slot
  metadata: jsonb("metadata"),
});

// Agendamentos/Sessões com suporte a recorrência
export const appointments = schema.table("appointments", {
  id: serial("id").primaryKey(),
  professional_id: integer("professional_id")
    .references(() => professionals.id)
    .notNull(),
  customer_id: integer("customer_id")
    .references(() => customers.id)
    .notNull(),

  // Informações do agendamento
  title: varchar("title", { length: 255 }).notNull(), // ex: "Consulta Inicial", "Aula de Matemática"
  status: varchar("status", { length: 50 }).notNull(), // 'scheduled' | 'confirmed' | 'in_progress' | 'completed' | 'no_show' | 'cancelled_by_client' | 'cancelled_by_professional'

  // Data e horário
  start_at: timestamp("start_at").notNull(),
  end_at: timestamp("end_at").notNull(),
  duration_minutes: integer("duration_minutes").notNull(), // Duração em minutos

  // Sistema de recorrência com RRules aprimorado
  is_recurring: boolean("is_recurring").default(false).notNull(),
  rrule: text("rrule"), // RRule string para agendamentos recorrentes
  series_id: varchar("series_id", { length: 36 }), // UUID para agrupar série de agendamentos
  is_master: boolean("is_master").default(true).notNull(), // Se é o agendamento original da série
  master_id: integer("master_id").references(() => appointments.id), // Referência ao agendamento master
  occurrence_date: timestamp("occurrence_date"), // Data específica desta ocorrência (para instâncias da série)

  // Integração com availability system
  availability_slot_id: integer("availability_slot_id").references(
    () => availability_slots.id
  ), // Slot que foi usado

  // Controle de modificações em série
  is_exception: boolean("is_exception").default(false).notNull(), // Se esta instância foi modificada da série original
  exception_type: varchar("exception_type", { length: 50 }), // 'moved' | 'cancelled' | 'modified'
  original_start_at: timestamp("original_start_at"), // Horário original antes da modificação

  // Localização
  location_type: varchar("location_type", { length: 50 }), // 'in_person' | 'online' | 'home_visit'
  location_address: text("location_address"),
  online_meeting_url: varchar("online_meeting_url", { length: 500 }),

  // Pagamento
  price: integer("price").notNull(), // valor em centavos
  payment_id: integer("payment_id").references(() => payments.id),

  // Avaliação (opcional)
  client_rating: integer("client_rating"), // 1-5
  client_feedback: text("client_feedback"),
  professional_notes: text("professional_notes"),

  // Metadados flexíveis
  metadata: jsonb("metadata"),

  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at").defaultNow(),
});

// Contextos dos agendamentos (conforme requisitos específicos)
export const appointment_contexts = schema.table("appointment_contexts", {
  id: serial("id").primaryKey(),
  appointment_id: integer("appointment_id")
    .references(() => appointments.id)
    .notNull(),

  // Notas conforme requisitos
  internal_notes: text("internal_notes"), // Notas internas (privadas)
  public_notes: text("public_notes"), // Notas públicas (visível ao aluno)

  // Status do agendamento
  status: varchar("status", { length: 50 }).default("scheduled"), // scheduled | completed | canceled | no_show

  // Campos opcionais para flexibilidade
  context_type: varchar("context_type", { length: 50 }), // 'medical_record', 'lesson_plan', etc.
  title: varchar("title", { length: 255 }),
  content: text("content"),

  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at").defaultNow(),
});

// Tarefas/Atividades (conforme requisitos específicos)
export const appointment_tasks = schema.table("appointment_tasks", {
  id: serial("id").primaryKey(),
  appointment_id: integer("appointment_id")
    .references(() => appointments.id)
    .notNull(),

  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  is_completed: boolean("is_completed").default(false).notNull(),
  is_visible_to_customer: boolean("is_visible_to_customer")
    .default(true)
    .notNull(), // Controle de visibilidade
  due_date: timestamp("due_date"),
  completion_date: timestamp("completion_date"),

  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at").defaultNow(),
});

// Anexos dos agendamentos (conforme requisitos específicos)
export const appointment_attachments = schema.table("appointment_attachments", {
  id: serial("id").primaryKey(),
  appointment_id: integer("appointment_id")
    .references(() => appointments.id)
    .notNull(),

  filename: varchar("filename", { length: 255 }).notNull(),
  file_type: varchar("file_type", { length: 100 }).notNull(),
  file_url: varchar("file_url", { length: 500 }).notNull(),
  file_size: integer("file_size"), // em bytes

  uploaded_by: varchar("uploaded_by", { length: 50 }).notNull(), // 'professional' | 'customer'
  is_visible_to_customer: boolean("is_visible_to_customer")
    .default(true)
    .notNull(), // Controle de visibilidade

  created_at: timestamp("created_at").defaultNow(),
});

// Pagamentos
export const payments = schema.table("payments", {
  id: serial("id").primaryKey(),
  stripe_payment_intent_id: varchar("stripe_payment_intent_id", { length: 255 })
    .notNull()
    .unique(),
  stripe_session_id: varchar("stripe_session_id", { length: 255 }).unique(),

  amount: integer("amount").notNull(), // em centavos
  currency: varchar("currency", { length: 10 }).default("brl"),
  status: varchar("status", { length: 50 }).notNull(), // 'succeeded' | 'pending' | 'failed' | 'cancelled' | 'refunded'
  method: varchar("method", { length: 50 }), // 'card' | 'pix' | 'boleto'

  // Referência para quem pagou e recebeu
  customer_id: integer("customer_id")
    .references(() => customers.id)
    .notNull(),
  professional_id: integer("professional_id")
    .references(() => professionals.id)
    .notNull(),

  created_at: timestamp("created_at").defaultNow(),
});

// Assinaturas/Recorrências
export const subscriptions = schema.table("subscriptions", {
  id: serial("id").primaryKey(),
  stripe_subscription_id: varchar("stripe_subscription_id", { length: 255 })
    .notNull()
    .unique(),
  customer_id: integer("customer_id")
    .references(() => customers.id)
    .notNull(),
  professional_id: integer("professional_id")
    .references(() => professionals.id)
    .notNull(),
  package_id: integer("package_id")
    .references(() => packages.id)
    .notNull(),

  status: varchar("status", { length: 50 }).notNull(), // 'active' | 'canceled' | 'past_due' | 'paused'

  // Controle de período
  current_period_start: timestamp("current_period_start").notNull(),
  current_period_end: timestamp("current_period_end").notNull(),

  // Controle de sessões
  sessions_used_current_period: integer("sessions_used_current_period")
    .default(0)
    .notNull(),
  sessions_rollover: integer("sessions_rollover").default(0).notNull(),

  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at").defaultNow(),
});

// Pacotes de serviços
export const packages = schema.table("packages", {
  id: serial("id").primaryKey(),
  professional_id: integer("professional_id")
    .references(() => professionals.id)
    .notNull(),

  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  price: integer("price").notNull(), // em centavos
  number_of_sessions: integer("number_of_sessions").notNull(),

  // Políticas do pacote
  allow_rollover: boolean("allow_rollover").default(false).notNull(),
  max_rollover_sessions: integer("max_rollover_sessions").default(0),
  cancellation_policy: text("cancellation_policy"),

  is_active: boolean("is_active").default(true).notNull(),

  // Integração Stripe
  stripe_price_id: varchar("stripe_price_id", { length: 255 }),
  stripe_product_id: varchar("stripe_product_id", { length: 255 }),

  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at").defaultNow(),
});

// Alias para compatibilidade com código existente
export const users_table = users;
export const subscription_packages = packages; // Para compatibilidade

// Para compatibilidade com sistema de sessões existente
export const session_usage = schema.table("session_usage", {
  id: serial("id").primaryKey(),
  subscription_id: integer("subscription_id")
    .references(() => subscriptions.id)
    .notNull(),
  appointment_id: integer("appointment_id").references(() => appointments.id),

  session_date: timestamp("session_date").notNull(),
  was_rollover: boolean("was_rollover").default(false).notNull(),
  notes: text("notes"),

  created_at: timestamp("created_at").defaultNow(),
});

// ===== SISTEMA DE GERENCIAMENTO DE TAREFAS PROFISSIONAIS =====
// Disponível nos planos médio e premium

// Tarefas profissionais com suporte a RRules
export const professional_tasks = schema.table("professional_tasks", {
  id: serial("id").primaryKey(),
  professional_id: integer("professional_id")
    .references(() => professionals.id)
    .notNull(),

  // Informações da Tarefa
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  category: varchar("category", { length: 100 }), // 'administrative', 'clinical', 'marketing', 'education', 'financial'
  priority: varchar("priority", { length: 50 }).default("medium"), // 'low', 'medium', 'high', 'urgent'

  // Sistema de Recorrência com RRules - Suporte completo para períodos customizados
  is_recurring: boolean("is_recurring").default(false).notNull(),
  rrule: text("rrule"), // Ex: 'RRULE:FREQ=WEEKLY;BYDAY=MO' para toda segunda-feira
  recurrence_type: varchar("recurrence_type", { length: 50 }), // 'daily', 'weekly', 'biweekly', 'monthly', 'quarterly', 'semiannual', 'yearly', 'custom'
  series_id: varchar("series_id", { length: 36 }), // UUID para agrupar série de tarefas
  is_master: boolean("is_master").default(true).notNull(),
  master_id: integer("master_id").references(() => professional_tasks.id),

  // Controle de Data e Status
  due_date: timestamp("due_date").notNull(),
  completed_at: timestamp("completed_at"),
  status: varchar("status", { length: 50 }).default("pending"), // 'pending', 'in_progress', 'completed', 'cancelled', 'overdue'

  // Alertas e Notificações
  alert_settings: jsonb("alert_settings"), // Configurações de quando alertar
  last_alert_sent: timestamp("last_alert_sent"),
  next_alert_at: timestamp("next_alert_at"),

  // Vinculação com Agendamentos e Contextos (opcional)
  appointment_id: integer("appointment_id").references(() => appointments.id),
  customer_id: integer("customer_id").references(() => customers.id),
  context_type: varchar("context_type", { length: 50 }), // 'appointment', 'customer_birthday', 'evaluation', 'certification', 'general'

  // Estimativa de Tempo
  estimated_duration_minutes: integer("estimated_duration_minutes"),
  actual_duration_minutes: integer("actual_duration_minutes"),

  // Metadados e Organização
  tags: jsonb("tags"), // Array de tags para organização
  metadata: jsonb("metadata"), // Dados específicos por tipo de profissão

  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at").defaultNow(),
});

// Subtarefas para organização hierárquica
export const task_subtasks = schema.table("task_subtasks", {
  id: serial("id").primaryKey(),
  parent_task_id: integer("parent_task_id")
    .references(() => professional_tasks.id)
    .notNull(),

  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  is_completed: boolean("is_completed").default(false).notNull(),
  due_date: timestamp("due_date"),
  completed_at: timestamp("completed_at"),

  order_index: integer("order_index").default(0).notNull(),

  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at").defaultNow(),
});

// Anexos das tarefas profissionais
export const task_attachments = schema.table("task_attachments", {
  id: serial("id").primaryKey(),
  task_id: integer("task_id")
    .references(() => professional_tasks.id)
    .notNull(),

  filename: varchar("filename", { length: 255 }).notNull(),
  file_type: varchar("file_type", { length: 100 }).notNull(),
  file_url: varchar("file_url", { length: 500 }).notNull(),
  file_size: integer("file_size"), // em bytes

  uploaded_by: varchar("uploaded_by", { length: 50 }).notNull(), // 'professional' | 'system'
  description: text("description"), // Descrição opcional do anexo

  created_at: timestamp("created_at").defaultNow(),
});

// Histórico de alterações nas tarefas para auditoria
export const task_history = schema.table("task_history", {
  id: serial("id").primaryKey(),
  task_id: integer("task_id")
    .references(() => professional_tasks.id)
    .notNull(),

  action: varchar("action", { length: 50 }).notNull(), // 'created', 'updated', 'completed', 'cancelled', 'status_changed'
  field_changed: varchar("field_changed", { length: 100 }), // Campo que foi alterado
  old_value: text("old_value"), // Valor anterior
  new_value: text("new_value"), // Novo valor

  changed_by: varchar("changed_by", { length: 50 }).default("professional"), // 'professional' | 'system'
  notes: text("notes"), // Notas adicionais sobre a alteração

  created_at: timestamp("created_at").defaultNow(),
});

// ===== FINAL DO SCHEMA =====
