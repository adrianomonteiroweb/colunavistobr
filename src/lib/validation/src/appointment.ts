import { z } from "zod";

// Enum para tipos de profissão/serviços
export const profession_type = z.enum([
  "healthcare", // Profissionais de saúde (médicos, psicólogos, fisioterapeutas, etc.)
  "education", // Professores, tutores, instrutores
  "consulting", // Consultores, coaches, advogados
  "fitness", // Personal trainers, professores de yoga/pilates
  "beauty", // Cabeleireiros, esteticistas, massagistas
  "maintenance", // Técnicos, mecânicos, eletricistas
  "creative", // Designers, fotógrafos, músicos
  "other", // Outros serviços baseados em tempo
]);

// Enum para status de agendamentos
export const appointment_status = z.enum([
  "scheduled", // Agendado
  "confirmed", // Confirmado
  "in_progress", // Em andamento
  "completed", // Concluído
  "no_show", // Cliente não compareceu
  "cancelled_by_client", // Cancelado pelo cliente
  "cancelled_by_professional", // Cancelado pelo profissional
  "rescheduled", // Reagendado
]);

// Enum para tipos de contexto/conteúdo
export const context_type = z.enum([
  "notes", // Notas gerais
  "medical_record", // Prontuário médico
  "lesson_plan", // Plano de aula
  "exercise_routine", // Rotina de exercícios
  "consultation_summary", // Resumo da consulta
  "homework_assignments", // Tarefas/lições de casa
  "progress_report", // Relatório de progresso
  "treatment_plan", // Plano de tratamento
  "project_briefing", // Briefing do projeto
  "maintenance_checklist", // Lista de verificação de manutenção
]);

// Schema para agendamentos genérico
export const appointment_schema = z.object({
  id: z.string(),
  professional_id: z.string(),
  client_id: z.string(),
  client_name: z.string(),
  client_email: z.string().email().optional(),
  client_phone: z.string().optional(),

  service_name: z.string(),
  service_duration: z.number(), // em minutos
  service_price: z.number().optional(),

  scheduled_date: z.string(), // ISO date string
  scheduled_time: z.string(), // HH:mm format
  end_time: z.string().optional(), // HH:mm format

  status: appointment_status,
  profession_type: profession_type,

  // Localização
  location_type: z.enum(["in_person", "online", "home_visit"]).optional(),
  location_address: z.string().optional(),
  online_meeting_url: z.string().url().optional(),

  // Contexto e notas
  pre_appointment_notes: z.string().optional(),
  appointment_context: z
    .array(
      z.object({
        type: context_type,
        title: z.string(),
        content: z.string(),
        created_at: z.string(),
        updated_at: z.string().optional(),
      })
    )
    .optional(),

  // Avaliação e feedback
  client_rating: z.number().min(1).max(5).optional(),
  client_feedback: z.string().optional(),
  professional_notes: z.string().optional(),

  // Tarefas/atividades (para professores, terapeutas, etc.)
  tasks_assigned: z
    .array(
      z.object({
        id: z.string(),
        title: z.string(),
        description: z.string().optional(),
        is_completed: z.boolean().default(false),
        due_date: z.string().optional(),
        completion_date: z.string().optional(),
      })
    )
    .optional(),

  // Anexos e documentos
  attachments: z
    .array(
      z.object({
        id: z.string(),
        filename: z.string(),
        file_type: z.string(),
        file_url: z.string(),
        uploaded_at: z.string(),
      })
    )
    .optional(),

  // Informações de pagamento
  payment_status: z
    .enum(["pending", "paid", "cancelled", "refunded"])
    .optional(),
  payment_amount: z.number().optional(),
  payment_method: z.string().optional(),
  payment_date: z.string().optional(),

  // Informações de recorrência/assinatura
  subscription_id: z.string().optional(),
  session_number: z.number().optional(), // Número da sessão no pacote

  // Metadados
  metadata: z.record(z.any()).optional(),

  created_at: z.string(),
  updated_at: z.string(),
});

export type Appointment = z.infer<typeof appointment_schema>;

// Schema para configuração de profissão
export const profession_config_schema = z.object({
  type: profession_type,
  terminology: z.object({
    client: z.string(), // "Paciente", "Aluno", "Cliente", etc.
    appointment: z.string(), // "Consulta", "Aula", "Sessão", etc.
    service: z.string(), // "Tratamento", "Curso", "Serviço", etc.
    context: z.string(), // "Prontuário", "Plano de aula", "Resumo", etc.
  }),
  available_context_types: z.array(context_type),
  default_duration: z.number(), // em minutos
  requires_payment: z.boolean().default(true),
  allows_tasks: z.boolean().default(false),
  allows_rating: z.boolean().default(true),
});

export type ProfessionConfig = z.infer<typeof profession_config_schema>;

// Configurações predefinidas por tipo de profissão
export const profession_configs: Record<string, ProfessionConfig> = {
  healthcare: {
    type: "healthcare",
    terminology: {
      client: "Paciente",
      appointment: "Consulta",
      service: "Tratamento",
      context: "Prontuário",
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
      appointment: "Sessão",
      service: "Consultoria",
      context: "Resumo da Sessão",
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
      service: "Serviço",
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
      service: "Serviço Técnico",
      context: "Relatório de Serviço",
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
      appointment: "Sessão",
      service: "Serviço Criativo",
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
      service: "Serviço",
      context: "Contexto",
    },
    available_context_types: ["notes"],
    default_duration: 60,
    requires_payment: true,
    allows_tasks: false,
    allows_rating: true,
  },
};

// Schemas legados para compatibilidade
export const appointmentSchema = z.object({
  id: z.string().uuid(),
  clientId: z.string().uuid(),
  professionalId: z.string().uuid(),
  serviceId: z.string().uuid(),
  date: z.date(),
  startTime: z
    .string()
    .regex(
      /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/,
      "Formato de hora inválido (HH:MM)"
    ),
  endTime: z
    .string()
    .regex(
      /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/,
      "Formato de hora inválido (HH:MM)"
    ),
  status: z.enum(["scheduled", "confirmed", "cancelled", "completed"]),
  notes: z.string().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const createAppointmentSchema = appointmentSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const updateAppointmentSchema = createAppointmentSchema.partial();

export const serviceSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(2, "Nome do serviço deve ter pelo menos 2 caracteres"),
  description: z.string().optional(),
  duration: z.number().min(15, "Duração mínima de 15 minutos"),
  price: z.number().min(0, "Preço deve ser positivo"),
  professionalId: z.string().uuid(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const createServiceSchema = serviceSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const updateServiceSchema = createServiceSchema.partial();

export const availabilitySchema = z.object({
  id: z.string().uuid(),
  professionalId: z.string().uuid(),
  dayOfWeek: z.number().min(0).max(6), // 0 = Domingo, 6 = Sábado
  startTime: z
    .string()
    .regex(
      /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/,
      "Formato de hora inválido (HH:MM)"
    ),
  endTime: z
    .string()
    .regex(
      /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/,
      "Formato de hora inválido (HH:MM)"
    ),
  isActive: z.boolean(),
});

export type LegacyAppointment = z.infer<typeof appointmentSchema>;
export type CreateAppointment = z.infer<typeof createAppointmentSchema>;
export type UpdateAppointment = z.infer<typeof updateAppointmentSchema>;
export type Service = z.infer<typeof serviceSchema>;
export type CreateService = z.infer<typeof createServiceSchema>;
export type UpdateService = z.infer<typeof updateServiceSchema>;
export type Availability = z.infer<typeof availabilitySchema>;
