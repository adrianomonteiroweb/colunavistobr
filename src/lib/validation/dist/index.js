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
  userSchema,
};

// src/user.ts
import * as import_zod from "zod";
var userSchema = import_zod.z.object({
  id: import_zod.z.string().uuid(),
  name: import_zod.z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  email: import_zod.z.string().email("Email inv\xE1lido"),
  phone: import_zod.z
    .string()
    .min(10, "Telefone deve ter pelo menos 10 d\xEDgitos"),
  role: import_zod.z.enum(["admin", "professional", "customer"]),
  createdAt: import_zod.z.date(),
  updatedAt: import_zod.z.date(),
});
var createUserSchema = userSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
var updateUserSchema = createUserSchema.partial();
var loginSchema = import_zod.z.object({
  email: import_zod.z.string().email("Email inv\xE1lido"),
  password: import_zod.z
    .string()
    .min(6, "Senha deve ter pelo menos 6 caracteres"),
});
var registerSchema = loginSchema.extend({
  name: import_zod.z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  phone: import_zod.z
    .string()
    .min(10, "Telefone deve ter pelo menos 10 d\xEDgitos"),
});

// src/appointment.ts
import * as import_zod2 from "zod";
var profession_type = import_zod2.z.enum([
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
  "other",
  // Outros serviços baseados em tempo
]);
var appointment_status = import_zod2.z.enum([
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
  "rescheduled",
  // Reagendado
]);
var context_type = import_zod2.z.enum([
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
  "maintenance_checklist",
  // Lista de verificação de manutenção
]);
var appointment_schema = import_zod2.z.object({
  id: import_zod2.z.string(),
  professional_id: import_zod2.z.string(),
  client_id: import_zod2.z.string(),
  client_name: import_zod2.z.string(),
  client_email: import_zod2.z.string().email().optional(),
  client_phone: import_zod2.z.string().optional(),
  service_name: import_zod2.z.string(),
  service_duration: import_zod2.z.number(),
  // em minutos
  service_price: import_zod2.z.number().optional(),
  scheduled_date: import_zod2.z.string(),
  // ISO date string
  scheduled_time: import_zod2.z.string(),
  // HH:mm format
  end_time: import_zod2.z.string().optional(),
  // HH:mm format
  status: appointment_status,
  profession_type,
  // Localização
  location_type: import_zod2.z
    .enum(["in_person", "online", "home_visit"])
    .optional(),
  location_address: import_zod2.z.string().optional(),
  online_meeting_url: import_zod2.z.string().url().optional(),
  // Contexto e notas
  pre_appointment_notes: import_zod2.z.string().optional(),
  appointment_context: import_zod2.z
    .array(
      import_zod2.z.object({
        type: context_type,
        title: import_zod2.z.string(),
        content: import_zod2.z.string(),
        created_at: import_zod2.z.string(),
        updated_at: import_zod2.z.string().optional(),
      })
    )
    .optional(),
  // Avaliação e feedback
  client_rating: import_zod2.z.number().min(1).max(5).optional(),
  client_feedback: import_zod2.z.string().optional(),
  professional_notes: import_zod2.z.string().optional(),
  // Tarefas/atividades (para professores, terapeutas, etc.)
  tasks_assigned: import_zod2.z
    .array(
      import_zod2.z.object({
        id: import_zod2.z.string(),
        title: import_zod2.z.string(),
        description: import_zod2.z.string().optional(),
        is_completed: import_zod2.z.boolean().default(false),
        due_date: import_zod2.z.string().optional(),
        completion_date: import_zod2.z.string().optional(),
      })
    )
    .optional(),
  // Anexos e documentos
  attachments: import_zod2.z
    .array(
      import_zod2.z.object({
        id: import_zod2.z.string(),
        filename: import_zod2.z.string(),
        file_type: import_zod2.z.string(),
        file_url: import_zod2.z.string(),
        uploaded_at: import_zod2.z.string(),
      })
    )
    .optional(),
  // Informações de pagamento
  payment_status: import_zod2.z
    .enum(["pending", "paid", "cancelled", "refunded"])
    .optional(),
  payment_amount: import_zod2.z.number().optional(),
  payment_method: import_zod2.z.string().optional(),
  payment_date: import_zod2.z.string().optional(),
  // Informações de recorrência/assinatura
  subscription_id: import_zod2.z.string().optional(),
  session_number: import_zod2.z.number().optional(),
  // Número da sessão no pacote
  // Metadados
  metadata: import_zod2.z.record(import_zod2.z.any()).optional(),
  created_at: import_zod2.z.string(),
  updated_at: import_zod2.z.string(),
});
var profession_config_schema = import_zod2.z.object({
  type: profession_type,
  terminology: import_zod2.z.object({
    client: import_zod2.z.string(),
    // "Paciente", "Aluno", "Cliente", etc.
    appointment: import_zod2.z.string(),
    // "Consulta", "Aula", "Sessão", etc.
    service: import_zod2.z.string(),
    // "Tratamento", "Curso", "Serviço", etc.
    context: import_zod2.z.string(),
    // "Prontuário", "Plano de aula", "Resumo", etc.
  }),
  available_context_types: import_zod2.z.array(context_type),
  default_duration: import_zod2.z.number(),
  // em minutos
  requires_payment: import_zod2.z.boolean().default(true),
  allows_tasks: import_zod2.z.boolean().default(false),
  allows_rating: import_zod2.z.boolean().default(true),
});
var profession_configs = {
  healthcare: {
    type: "healthcare",
    terminology: {
      client: "Paciente",
      appointment: "Consulta",
      service: "Tratamento",
      context: "Prontu\xE1rio",
    },
    available_context_types: [
      "medical_record",
      "treatment_plan",
      "progress_report",
      "notes",
    ],
    default_duration: 60,
    requires_payment: true,
    allows_tasks: false,
    allows_rating: true,
  },
  education: {
    type: "education",
    terminology: {
      client: "Aluno",
      appointment: "Aula",
      service: "Curso",
      context: "Plano de Aula",
    },
    available_context_types: [
      "lesson_plan",
      "homework_assignments",
      "progress_report",
      "notes",
    ],
    default_duration: 60,
    requires_payment: true,
    allows_tasks: true,
    allows_rating: true,
  },
  consulting: {
    type: "consulting",
    terminology: {
      client: "Cliente",
      appointment: "Sess\xE3o",
      service: "Consultoria",
      context: "Resumo da Sess\xE3o",
    },
    available_context_types: [
      "consultation_summary",
      "project_briefing",
      "notes",
    ],
    default_duration: 60,
    requires_payment: true,
    allows_tasks: true,
    allows_rating: true,
  },
  fitness: {
    type: "fitness",
    terminology: {
      client: "Aluno",
      appointment: "Treino",
      service: "Personal Training",
      context: "Plano de Treino",
    },
    available_context_types: ["exercise_routine", "progress_report", "notes"],
    default_duration: 60,
    requires_payment: true,
    allows_tasks: false,
    allows_rating: true,
  },
  beauty: {
    type: "beauty",
    terminology: {
      client: "Cliente",
      appointment: "Atendimento",
      service: "Servi\xE7o",
      context: "Ficha do Cliente",
    },
    available_context_types: ["notes", "progress_report"],
    default_duration: 90,
    requires_payment: true,
    allows_tasks: false,
    allows_rating: true,
  },
  maintenance: {
    type: "maintenance",
    terminology: {
      client: "Cliente",
      appointment: "Atendimento",
      service: "Servi\xE7o T\xE9cnico",
      context: "Relat\xF3rio de Servi\xE7o",
    },
    available_context_types: ["maintenance_checklist", "notes"],
    default_duration: 120,
    requires_payment: true,
    allows_tasks: false,
    allows_rating: true,
  },
  creative: {
    type: "creative",
    terminology: {
      client: "Cliente",
      appointment: "Sess\xE3o",
      service: "Servi\xE7o Criativo",
      context: "Briefing do Projeto",
    },
    available_context_types: ["project_briefing", "notes"],
    default_duration: 120,
    requires_payment: true,
    allows_tasks: true,
    allows_rating: true,
  },
  other: {
    type: "other",
    terminology: {
      client: "Cliente",
      appointment: "Agendamento",
      service: "Servi\xE7o",
      context: "Contexto",
    },
    available_context_types: ["notes"],
    default_duration: 60,
    requires_payment: true,
    allows_tasks: false,
    allows_rating: true,
  },
};
var appointmentSchema = import_zod2.z.object({
  id: import_zod2.z.string().uuid(),
  clientId: import_zod2.z.string().uuid(),
  professionalId: import_zod2.z.string().uuid(),
  serviceId: import_zod2.z.string().uuid(),
  date: import_zod2.z.date(),
  startTime: import_zod2.z
    .string()
    .regex(
      /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/,
      "Formato de hora inv\xE1lido (HH:MM)"
    ),
  endTime: import_zod2.z
    .string()
    .regex(
      /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/,
      "Formato de hora inv\xE1lido (HH:MM)"
    ),
  status: import_zod2.z.enum([
    "scheduled",
    "confirmed",
    "cancelled",
    "completed",
  ]),
  notes: import_zod2.z.string().optional(),
  createdAt: import_zod2.z.date(),
  updatedAt: import_zod2.z.date(),
});
var createAppointmentSchema = appointmentSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
var updateAppointmentSchema = createAppointmentSchema.partial();
var serviceSchema = import_zod2.z.object({
  id: import_zod2.z.string().uuid(),
  name: import_zod2.z
    .string()
    .min(2, "Nome do servi\xE7o deve ter pelo menos 2 caracteres"),
  description: import_zod2.z.string().optional(),
  duration: import_zod2.z
    .number()
    .min(15, "Dura\xE7\xE3o m\xEDnima de 15 minutos"),
  price: import_zod2.z.number().min(0, "Pre\xE7o deve ser positivo"),
  professionalId: import_zod2.z.string().uuid(),
  createdAt: import_zod2.z.date(),
  updatedAt: import_zod2.z.date(),
});
var createServiceSchema = serviceSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
var updateServiceSchema = createServiceSchema.partial();
var availabilitySchema = import_zod2.z.object({
  id: import_zod2.z.string().uuid(),
  professionalId: import_zod2.z.string().uuid(),
  dayOfWeek: import_zod2.z.number().min(0).max(6),
  // 0 = Domingo, 6 = Sábado
  startTime: import_zod2.z
    .string()
    .regex(
      /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/,
      "Formato de hora inv\xE1lido (HH:MM)"
    ),
  endTime: import_zod2.z
    .string()
    .regex(
      /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/,
      "Formato de hora inv\xE1lido (HH:MM)"
    ),
  isActive: import_zod2.z.boolean(),
});

// src/auth.ts
import * as import_zod3 from "zod";
var signInSchema = import_zod3.z.object({
  email: import_zod3.z.string().email("Email inv\xE1lido"),
  password: import_zod3.z.string().min(1, "Senha \xE9 obrigat\xF3ria"),
});
var signUpSchema = import_zod3.z
  .object({
    name: import_zod3.z
      .string()
      .min(2, "Nome deve ter pelo menos 2 caracteres"),
    email: import_zod3.z.string().email("Email inv\xE1lido"),
    phone: import_zod3.z.string().min(10, "Telefone inv\xE1lido"),
    password: import_zod3.z
      .string()
      .min(6, "Senha deve ter pelo menos 6 caracteres"),
    confirmPassword: import_zod3.z
      .string()
      .min(6, "Confirma\xE7\xE3o de senha \xE9 obrigat\xF3ria"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Senhas n\xE3o coincidem",
    path: ["confirmPassword"],
  });
var jwtPayloadSchema = import_zod3.z.object({
  userId: import_zod3.z.string().min(1),
  email: import_zod3.z.string().email(),
  role: import_zod3.z.enum(["admin", "professional", "customer"]),
  iat: import_zod3.z.number().optional(),
  exp: import_zod3.z.number().optional(),
});
var refreshTokenSchema = import_zod3.z.object({
  refreshToken: import_zod3.z
    .string()
    .min(1, "Refresh token \xE9 obrigat\xF3rio"),
});
var forgotPasswordSchema = import_zod3.z.object({
  email: import_zod3.z.string().email("Email inv\xE1lido"),
});
var resetPasswordSchema = import_zod3.z
  .object({
    token: import_zod3.z.string().min(1, "Token \xE9 obrigat\xF3rio"),
    password: import_zod3.z
      .string()
      .min(6, "Senha deve ter pelo menos 6 caracteres"),
    confirmPassword: import_zod3.z
      .string()
      .min(6, "Confirma\xE7\xE3o de senha \xE9 obrigat\xF3ria"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Senhas n\xE3o coincidem",
    path: ["confirmPassword"],
  });
var changePasswordSchema = import_zod3.z
  .object({
    currentPassword: import_zod3.z
      .string()
      .min(1, "Senha atual \xE9 obrigat\xF3ria"),
    newPassword: import_zod3.z
      .string()
      .min(6, "Nova senha deve ter pelo menos 6 caracteres"),
    confirmPassword: import_zod3.z
      .string()
      .min(6, "Confirma\xE7\xE3o de senha \xE9 obrigat\xF3ria"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Senhas n\xE3o coincidem",
    path: ["confirmPassword"],
  });

// src/subscription.ts
import * as import_zod4 from "zod";
var create_subscription_package_schema = import_zod4.z.object({
  name: import_zod4.z
    .string()
    .min(1, "Nome \xE9 obrigat\xF3rio")
    .max(255, "Nome muito longo"),
  description: import_zod4.z.string().optional(),
  monthly_price: import_zod4.z.number().positive("Pre\xE7o deve ser positivo"),
  sessions_per_month: import_zod4.z
    .number()
    .int()
    .positive("N\xFAmero de sess\xF5es deve ser positivo"),
  allow_rollover: import_zod4.z.boolean().default(false),
  max_rollover_sessions: import_zod4.z.number().int().min(0).default(0),
  cancellation_policy: import_zod4.z.string().optional(),
});
var update_subscription_package_schema =
  create_subscription_package_schema.partial();
var create_subscription_schema = import_zod4.z.object({
  package_id: import_zod4.z.string().min(1, "ID do pacote \xE9 obrigat\xF3rio"),
  professional_id: import_zod4.z
    .string()
    .min(1, "ID do profissional \xE9 obrigat\xF3rio"),
  payment_method: import_zod4.z.enum(["card", "boleto", "pix"]).default("card"),
});
var update_subscription_status_schema = import_zod4.z.object({
  status: import_zod4.z.enum(["active", "paused", "cancelled", "past_due"]),
  reason: import_zod4.z.string().optional(),
});
var create_session_usage_schema = import_zod4.z.object({
  subscription_id: import_zod4.z.string().uuid("ID da assinatura inv\xE1lido"),
  session_date: import_zod4.z
    .string()
    .datetime("Data da sess\xE3o inv\xE1lida"),
  appointment_id: import_zod4.z.string().uuid().optional(),
  notes: import_zod4.z.string().optional(),
});
var subscription_package_filters_schema = import_zod4.z.object({
  professional_id: import_zod4.z.string().uuid().optional(),
  is_active: import_zod4.z.boolean().optional(),
  min_price: import_zod4.z.number().positive().optional(),
  max_price: import_zod4.z.number().positive().optional(),
});
var subscription_filters_schema = import_zod4.z.object({
  customer_id: import_zod4.z.string().uuid().optional(),
  package_id: import_zod4.z.string().uuid().optional(),
  status: import_zod4.z
    .enum(["active", "paused", "cancelled", "past_due"])
    .optional(),
});
// Annotate the CommonJS export names for ESM import in node:
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
  userSchema,
};
