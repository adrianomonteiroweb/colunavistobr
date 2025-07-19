import { z } from "zod";

// Schema para criação de pacote de recorrência
export const create_subscription_package_schema = z.object({
  name: z.string().min(1, "Nome é obrigatório").max(255, "Nome muito longo"),
  description: z.string().optional(),
  monthly_price: z.number().positive("Preço deve ser positivo"),
  sessions_per_month: z
    .number()
    .int()
    .positive("Número de sessões deve ser positivo"),
  allow_rollover: z.boolean().default(false),
  max_rollover_sessions: z.number().int().min(0).default(0),
  cancellation_policy: z.string().optional(),
});

// Schema para atualização de pacote
export const update_subscription_package_schema =
  create_subscription_package_schema.partial();

// Schema para criação de assinatura
export const create_subscription_schema = z.object({
  package_id: z.string().min(1, "ID do pacote é obrigatório"),
  professional_id: z.string().min(1, "ID do profissional é obrigatório"),
  payment_method: z.enum(["card", "boleto", "pix"]).default("card"),
});

// Schema para atualização de status da assinatura
export const update_subscription_status_schema = z.object({
  status: z.enum(["active", "paused", "cancelled", "past_due"]),
  reason: z.string().optional(),
});

// Schema para registro de uso de sessão
export const create_session_usage_schema = z.object({
  subscription_id: z.string().uuid("ID da assinatura inválido"),
  session_date: z.string().datetime("Data da sessão inválida"),
  appointment_id: z.string().uuid().optional(),
  notes: z.string().optional(),
});

// Tipos inferidos
export type CreateSubscriptionPackageInput = z.infer<
  typeof create_subscription_package_schema
>;
export type UpdateSubscriptionPackageInput = z.infer<
  typeof update_subscription_package_schema
>;
export type CreateSubscriptionInput = z.infer<
  typeof create_subscription_schema
>;
export type UpdateSubscriptionStatusInput = z.infer<
  typeof update_subscription_status_schema
>;
export type CreateSessionUsageInput = z.infer<
  typeof create_session_usage_schema
>;

// Schema para filtros de listagem
export const subscription_package_filters_schema = z.object({
  professional_id: z.string().uuid().optional(),
  is_active: z.boolean().optional(),
  min_price: z.number().positive().optional(),
  max_price: z.number().positive().optional(),
});

export const subscription_filters_schema = z.object({
  customer_id: z.string().uuid().optional(),
  package_id: z.string().uuid().optional(),
  status: z.enum(["active", "paused", "cancelled", "past_due"]).optional(),
});

export type SubscriptionPackageFilters = z.infer<
  typeof subscription_package_filters_schema
>;
export type SubscriptionFilters = z.infer<typeof subscription_filters_schema>;
