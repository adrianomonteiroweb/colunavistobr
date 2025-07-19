export interface RecurringAppointment {
  id: number;
  // Campos básicos do agendamento
  professional_id: number;
  customer_id: number;
  title: string;

  // Timing da primeira ocorrência
  start_at: Date;
  end_at: Date;
  duration_minutes: number;

  // Configuração de recorrência
  is_recurring: boolean;
  rrule?: string; // RRule string para recorrência
  recurrence_config?: {
    frequency: "daily" | "weekly" | "monthly" | "yearly";
    interval: number;
    weekdays?: number[];
    monthDay?: number;
    endDate?: Date;
    occurrences?: number;
  };

  // Controle de séries
  series_id?: string; // UUID para agrupar todas as ocorrências
  is_master: boolean; // Se é o agendamento original da série
  master_id?: number; // ID do agendamento master (se for uma ocorrência)
  occurrence_date?: Date; // Data específica desta ocorrência

  // Status e metadados
  status: "scheduled" | "confirmed" | "completed" | "cancelled" | "no_show";
  price: number;
  metadata?: any;

  created_at: Date;
  updated_at: Date;
}

export interface AppointmentSeries {
  series_id: string;
  master_appointment: RecurringAppointment;
  occurrences: RecurringAppointment[];
  total_occurrences: number;
  remaining_occurrences: number;
  next_occurrence?: Date;
}

export interface RecurrencePattern {
  type: "once" | "daily" | "weekly" | "monthly" | "custom";
  interval: number;
  weekdays?: number[]; // Para padrão semanal
  monthDay?: number; // Para padrão mensal
  endType: "never" | "until" | "count";
  endDate?: Date;
  occurrences?: number;
}

export interface CreateRecurringAppointmentRequest {
  professional_id: number;
  customer_id: number;
  title: string;
  start_at: Date;
  duration_minutes: number;
  price: number;
  recurrence_pattern: RecurrencePattern;
  location_type?: string;
  location_address?: string;
  online_meeting_url?: string;
  metadata?: any;
}

export interface AppointmentOccurrenceUpdate {
  occurrence_id: number;
  update_type: "this_only" | "this_and_future" | "all";
  changes: Partial<RecurringAppointment>;
}
