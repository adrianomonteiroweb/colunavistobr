// src/user.ts
import { z } from "zod";
var userSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  email: z.string().email("Email inv\xE1lido"),
  phone: z.string().min(10, "Telefone deve ter pelo menos 10 d\xEDgitos"),
  role: z.enum(["admin", "professional", "customer"]),
  createdAt: z.date(),
  updatedAt: z.date()
});
var createUserSchema = userSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true
});
var updateUserSchema = createUserSchema.partial();
var loginSchema = z.object({
  email: z.string().email("Email inv\xE1lido"),
  password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres")
});
var registerSchema = loginSchema.extend({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  phone: z.string().min(10, "Telefone deve ter pelo menos 10 d\xEDgitos")
});

// src/appointment.ts
import { z as z2 } from "zod";
var profession_type = z2.enum([
  "healthcare",
  // Profissionais de saúde (médicos, psicólogos, fisioterapeutas, etc.)
  "education",
  // Professores, tutores, instrutores
  "consulting",
  // Consultores, coaches, advogados
  "fitness",
  // Personal trainers, professores de yoga/pilates
  "beauty",
  // Cabeleireiros, esteticistas, massagistas
  "maintenance",
  // Técnicos, mecânicos, eletricistas
  "creative",
  // Designers, fotógrafos, músicos
  "other"
  // Outros serviços baseados em tempo
]);
var appointment_status = z2.enum([
  "scheduled",
  // Agendado
  "confirmed",
  // Confirmado
  "in_progress",
  // Em andamento
  "completed",
  // Concluído
  "no_show",
  // Cliente não compareceu
  "cancelled_by_client",
  // Cancelado pelo cliente
  "cancelled_by_professional",
  // Cancelado pelo profissional
  "rescheduled"
  // Reagendado
]);
var context_type = z2.enum([
  "notes",
  // Notas gerais
  "medical_record",
  // Prontuário médico
  "lesson_plan",
  // Plano de aula
  "exercise_routine",
  // Rotina de exercícios
  "consultation_summary",
  // Resumo da consulta
  "homework_assignments",
  // Tarefas/lições de casa
  "progress_report",
  // Relatório de progresso
  "treatment_plan",
  // Plano de tratamento
  "project_briefing",
  // Briefing do projeto
  "maintenance_checklist"
  // Lista de verificação de manutenção
]);
var appointment_schema = z2.object({
  id: z2.string(),
  professional_id: z2.string(),
  client_id: z2.string(),
  client_name: z2.string(),
  client_email: z2.string().email().optional(),
  client_phone: z2.string().optional(),
  service_name: z2.string(),
  service_duration: z2.number(),
  // em minutos
  service_price: z2.number().optional(),
  scheduled_date: z2.string(),
  // ISO date string
  scheduled_time: z2.string(),
  // HH:mm format
  end_time: z2.string().optional(),
  // HH:mm format
  status: appointment_status,
  profession_type,
  // Localização
  location_type: z2.enum(["in_person", "online", "home_visit"]).optional(),
  location_address: z2.string().optional(),
  online_meeting_url: z2.string().url().optional(),
  // Contexto e notas
  pre_appointment_notes: z2.string().optional(),
  appointment_context: z2.array(
    z2.object({
      type: context_type,
      title: z2.string(),
      content: z2.string(),
      created_at: z2.string(),
      updated_at: z2.string().optional()
    })
  ).optional(),
  // Avaliação e feedback
  client_rating: z2.number().min(1).max(5).optional(),
  client_feedback: z2.string().optional(),
  professional_notes: z2.string().optional(),
  // Tarefas/atividades (para professores, terapeutas, etc.)
  tasks_assigned: z2.array(
    z2.object({
      id: z2.string(),
      title: z2.string(),
      description: z2.string().optional(),
      is_completed: z2.boolean().default(false),
      due_date: z2.string().optional(),
      completion_date: z2.string().optional()
    })
  ).optional(),
  // Anexos e documentos
  attachments: z2.array(
    z2.object({
      id: z2.string(),
      filename: z2.string(),
      file_type: z2.string(),
      file_url: z2.string(),
      uploaded_at: z2.string()
    })
  ).optional(),
  // Informações de pagamento
  payment_status: z2.enum(["pending", "paid", "cancelled", "refunded"]).optional(),
  payment_amount: z2.number().optional(),
  payment_method: z2.string().optional(),
  payment_date: z2.string().optional(),
  // Informações de recorrência/assinatura
  subscription_id: z2.string().optional(),
  session_number: z2.number().optional(),
  // Número da sessão no pacote
  // Metadados
  metadata: z2.record(z2.any()).optional(),
  created_at: z2.string(),
  updated_at: z2.string()
});
var profession_config_schema = z2.object({
  type: profession_type,
  terminology: z2.object({
    client: z2.string(),
    // "Paciente", "Aluno", "Cliente", etc.
    appointment: z2.string(),
    // "Consulta", "Aula", "Sessão", etc.
    service: z2.string(),
    // "Tratamento", "Curso", "Serviço", etc.
    context: z2.string()
    // "Prontuário", "Plano de aula", "Resumo", etc.
  }),
  available_context_types: z2.array(context_type),
  default_duration: z2.number(),
  // em minutos
  requires_payment: z2.boolean().default(true),
  allows_tasks: z2.boolean().default(false),
  allows_rating: z2.boolean().default(true)
});
var profession_configs = {
  healthcare: {
    type: "healthcare",
    terminology: {
      client: "Paciente",
      appointment: "Consulta",
      service: "Tratamento",
      context: "Prontu\xE1rio"
    },
    available_context_types: [
      "medical_record",
      "treatment_plan",
      "progress_report",
      "notes"
    ],
    default_duration: 60,
    requires_payment: true,
    allows_tasks: false,
    allows_rating: true
  },
  education: {
    type: "education",
    terminology: {
      client: "Aluno",
      appointment: "Aula",
      service: "Curso",
      context: "Plano de Aula"
    },
    available_context_types: [
      "lesson_plan",
      "homework_assignments",
      "progress_report",
      "notes"
    ],
    default_duration: 60,
    requires_payment: true,
    allows_tasks: true,
    allows_rating: true
  },
  consulting: {
    type: "consulting",
    terminology: {
      client: "Cliente",
      appointment: "Sess\xE3o",
      service: "Consultoria",
      context: "Resumo da Sess\xE3o"
    },
    available_context_types: [
      "consultation_summary",
      "project_briefing",
      "notes"
    ],
    default_duration: 60,
    requires_payment: true,
    allows_tasks: true,
    allows_rating: true
  },
  fitness: {
    type: "fitness",
    terminology: {
      client: "Aluno",
      appointment: "Treino",
      service: "Personal Training",
      context: "Plano de Treino"
    },
    available_context_types: ["exercise_routine", "progress_report", "notes"],
    default_duration: 60,
    requires_payment: true,
    allows_tasks: false,
    allows_rating: true
  },
  beauty: {
    type: "beauty",
    terminology: {
      client: "Cliente",
      appointment: "Atendimento",
      service: "Servi\xE7o",
      context: "Ficha do Cliente"
    },
    available_context_types: ["notes", "progress_report"],
    default_duration: 90,
    requires_payment: true,
    allows_tasks: false,
    allows_rating: true
  },
  maintenance: {
    type: "maintenance",
    terminology: {
      client: "Cliente",
      appointment: "Atendimento",
      service: "Servi\xE7o T\xE9cnico",
      context: "Relat\xF3rio de Servi\xE7o"
    },
    available_context_types: ["maintenance_checklist", "notes"],
    default_duration: 120,
    requires_payment: true,
    allows_tasks: false,
    allows_rating: true
  },
  creative: {
    type: "creative",
    terminology: {
      client: "Cliente",
      appointment: "Sess\xE3o",
      service: "Servi\xE7o Criativo",
      context: "Briefing do Projeto"
    },
    available_context_types: ["project_briefing", "notes"],
    default_duration: 120,
    requires_payment: true,
    allows_tasks: true,
    allows_rating: true
  },
  other: {
    type: "other",
    terminology: {
      client: "Cliente",
      appointment: "Agendamento",
      service: "Servi\xE7o",
      context: "Contexto"
    },
    available_context_types: ["notes"],
    default_duration: 60,
    requires_payment: true,
    allows_tasks: false,
    allows_rating: true
  }
};
var appointmentSchema = z2.object({
  id: z2.string().uuid(),
  clientId: z2.string().uuid(),
  professionalId: z2.string().uuid(),
  serviceId: z2.string().uuid(),
  date: z2.date(),
  startTime: z2.string().regex(
    /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/,
    "Formato de hora inv\xE1lido (HH:MM)"
  ),
  endTime: z2.string().regex(
    /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/,
    "Formato de hora inv\xE1lido (HH:MM)"
  ),
  status: z2.enum(["scheduled", "confirmed", "cancelled", "completed"]),
  notes: z2.string().optional(),
  createdAt: z2.date(),
  updatedAt: z2.date()
});
var createAppointmentSchema = appointmentSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true
});
var updateAppointmentSchema = createAppointmentSchema.partial();
var serviceSchema = z2.object({
  id: z2.string().uuid(),
  name: z2.string().min(2, "Nome do servi\xE7o deve ter pelo menos 2 caracteres"),
  description: z2.string().optional(),
  duration: z2.number().min(15, "Dura\xE7\xE3o m\xEDnima de 15 minutos"),
  price: z2.number().min(0, "Pre\xE7o deve ser positivo"),
  professionalId: z2.string().uuid(),
  createdAt: z2.date(),
  updatedAt: z2.date()
});
var createServiceSchema = serviceSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true
});
var updateServiceSchema = createServiceSchema.partial();
var availabilitySchema = z2.object({
  id: z2.string().uuid(),
  professionalId: z2.string().uuid(),
  dayOfWeek: z2.number().min(0).max(6),
  // 0 = Domingo, 6 = Sábado
  startTime: z2.string().regex(
    /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/,
    "Formato de hora inv\xE1lido (HH:MM)"
  ),
  endTime: z2.string().regex(
    /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/,
    "Formato de hora inv\xE1lido (HH:MM)"
  ),
  isActive: z2.boolean()
});

// src/auth.ts
import { z as z3 } from "zod";
var signInSchema = z3.object({
  email: z3.string().email("Email inv\xE1lido"),
  password: z3.string().min(1, "Senha \xE9 obrigat\xF3ria")
});
var signUpSchema = z3.object({
  name: z3.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  email: z3.string().email("Email inv\xE1lido"),
  phone: z3.string().min(10, "Telefone inv\xE1lido"),
  password: z3.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
  confirmPassword: z3.string().min(6, "Confirma\xE7\xE3o de senha \xE9 obrigat\xF3ria")
}).refine((data) => data.password === data.confirmPassword, {
  message: "Senhas n\xE3o coincidem",
  path: ["confirmPassword"]
});
var jwtPayloadSchema = z3.object({
  userId: z3.string().min(1),
  email: z3.string().email(),
  role: z3.enum(["admin", "professional", "customer"]),
  iat: z3.number().optional(),
  exp: z3.number().optional()
});
var refreshTokenSchema = z3.object({
  refreshToken: z3.string().min(1, "Refresh token \xE9 obrigat\xF3rio")
});
var forgotPasswordSchema = z3.object({
  email: z3.string().email("Email inv\xE1lido")
});
var resetPasswordSchema = z3.object({
  token: z3.string().min(1, "Token \xE9 obrigat\xF3rio"),
  password: z3.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
  confirmPassword: z3.string().min(6, "Confirma\xE7\xE3o de senha \xE9 obrigat\xF3ria")
}).refine((data) => data.password === data.confirmPassword, {
  message: "Senhas n\xE3o coincidem",
  path: ["confirmPassword"]
});
var changePasswordSchema = z3.object({
  currentPassword: z3.string().min(1, "Senha atual \xE9 obrigat\xF3ria"),
  newPassword: z3.string().min(6, "Nova senha deve ter pelo menos 6 caracteres"),
  confirmPassword: z3.string().min(6, "Confirma\xE7\xE3o de senha \xE9 obrigat\xF3ria")
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Senhas n\xE3o coincidem",
  path: ["confirmPassword"]
});

// src/subscription.ts
import { z as z4 } from "zod";
var create_subscription_package_schema = z4.object({
  name: z4.string().min(1, "Nome \xE9 obrigat\xF3rio").max(255, "Nome muito longo"),
  description: z4.string().optional(),
  monthly_price: z4.number().positive("Pre\xE7o deve ser positivo"),
  sessions_per_month: z4.number().int().positive("N\xFAmero de sess\xF5es deve ser positivo"),
  allow_rollover: z4.boolean().default(false),
  max_rollover_sessions: z4.number().int().min(0).default(0),
  cancellation_policy: z4.string().optional()
});
var update_subscription_package_schema = create_subscription_package_schema.partial();
var create_subscription_schema = z4.object({
  package_id: z4.string().min(1, "ID do pacote \xE9 obrigat\xF3rio"),
  professional_id: z4.string().min(1, "ID do profissional \xE9 obrigat\xF3rio"),
  payment_method: z4.enum(["card", "boleto", "pix"]).default("card")
});
var update_subscription_status_schema = z4.object({
  status: z4.enum(["active", "paused", "cancelled", "past_due"]),
  reason: z4.string().optional()
});
var create_session_usage_schema = z4.object({
  subscription_id: z4.string().uuid("ID da assinatura inv\xE1lido"),
  session_date: z4.string().datetime("Data da sess\xE3o inv\xE1lida"),
  appointment_id: z4.string().uuid().optional(),
  notes: z4.string().optional()
});
var subscription_package_filters_schema = z4.object({
  professional_id: z4.string().uuid().optional(),
  is_active: z4.boolean().optional(),
  min_price: z4.number().positive().optional(),
  max_price: z4.number().positive().optional()
});
var subscription_filters_schema = z4.object({
  customer_id: z4.string().uuid().optional(),
  package_id: z4.string().uuid().optional(),
  status: z4.enum(["active", "paused", "cancelled", "past_due"]).optional()
});
export {
  appointmentSchema,
  appointment_schema,
  appointment_status,
  availabilitySchema,
  changePasswordSchema,
  context_type,
  createAppointmentSchema,
  createServiceSchema,
  createUserSchema,
  create_session_usage_schema,
  create_subscription_package_schema,
  create_subscription_schema,
  forgotPasswordSchema,
  jwtPayloadSchema,
  loginSchema,
  profession_config_schema,
  profession_configs,
  profession_type,
  refreshTokenSchema,
  registerSchema,
  resetPasswordSchema,
  serviceSchema,
  signInSchema,
  signUpSchema,
  subscription_filters_schema,
  subscription_package_filters_schema,
  updateAppointmentSchema,
  updateServiceSchema,
  updateUserSchema,
  update_subscription_package_schema,
  update_subscription_status_schema,
  userSchema
};
