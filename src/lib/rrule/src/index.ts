import { RRule, Frequency } from "rrule";
import { startOfDay, endOfDay } from "date-fns";

export * from "rrule";
export * from "./types";
export * from "./availability-calendar";

// Types para agendamentos recorrentes
export interface RecurrenceConfig {
  frequency: "daily" | "weekly" | "monthly" | "yearly";
  interval: number; // A cada quantos períodos se repete
  weekdays?: number[]; // Para frequência semanal: [0,1,2,3,4,5,6] (Dom-Sab)
  monthDay?: number; // Para frequência mensal: dia do mês (1-31)
  endDate?: Date; // Data limite
  occurrences?: number; // Número máximo de ocorrências
}

export interface AppointmentOccurrence {
  start_at: Date;
  end_at: Date;
  is_master: boolean; // Se é o agendamento original
  master_id?: number; // ID do agendamento master (se for uma ocorrência)
  occurrence_date: Date; // Data específica desta ocorrência
}

// Converter configuração simplificada para RRule
export const create_rrule_from_config = (
  config: RecurrenceConfig,
  start_date: Date
): RRule => {
  const frequency_map = {
    daily: Frequency.DAILY,
    weekly: Frequency.WEEKLY,
    monthly: Frequency.MONTHLY,
    yearly: Frequency.YEARLY,
  };

  const options: any = {
    freq: frequency_map[config.frequency],
    interval: config.interval,
    dtstart: start_date,
  };

  // Configurações específicas por frequência
  if (config.frequency === "weekly" && config.weekdays) {
    options.byweekday = config.weekdays;
  }

  if (config.frequency === "monthly" && config.monthDay) {
    options.bymonthday = config.monthDay;
  }

  // Limites
  if (config.endDate) {
    options.until = config.endDate;
  }

  if (config.occurrences) {
    options.count = config.occurrences;
  }

  return new RRule(options);
};

// Gerar ocorrências de agendamento baseado em RRule
export const generate_appointment_occurrences = (
  rrule_string: string,
  start_time: Date,
  duration_minutes: number,
  max_occurrences = 100
): AppointmentOccurrence[] => {
  try {
    const rrule = RRule.fromString(rrule_string);
    const occurrences = rrule.all((date, i) => i < max_occurrences);

    return occurrences.map((occurrence_date, index) => {
      const start_at = new Date(occurrence_date);
      const end_at = new Date(
        start_at.getTime() + duration_minutes * 60 * 1000
      );

      return {
        start_at,
        end_at,
        is_master: index === 0,
        occurrence_date: occurrence_date,
      };
    });
  } catch (error) {
    console.error("Error generating occurrences:", error);
    return [];
  }
};

// Gerar ocorrências dentro de um período específico
export const generate_occurrences_in_range = (
  rrule_string: string,
  start_time: Date,
  duration_minutes: number,
  range_start: Date,
  range_end: Date
): AppointmentOccurrence[] => {
  try {
    const rrule = RRule.fromString(rrule_string);
    const occurrences = rrule.between(
      startOfDay(range_start),
      endOfDay(range_end),
      true
    );

    return occurrences.map((occurrence_date) => {
      const start_at = new Date(occurrence_date);
      start_at.setHours(start_time.getHours());
      start_at.setMinutes(start_time.getMinutes());
      start_at.setSeconds(0);
      start_at.setMilliseconds(0);

      const end_at = new Date(
        start_at.getTime() + duration_minutes * 60 * 1000
      );

      return {
        start_at,
        end_at,
        is_master: false, // Ocorrências geradas não são master
        occurrence_date: occurrence_date,
      };
    });
  } catch (error) {
    console.error("Error generating occurrences in range:", error);
    return [];
  }
};

// Validar se uma RRule string é válida
export const validate_rrule = (rrule_string: string): boolean => {
  try {
    RRule.fromString(rrule_string);
    return true;
  } catch {
    return false;
  }
};

// Criar RRule para padrões comuns
export const create_common_rrules = {
  // Todos os dias
  daily: (start_date: Date, end_date?: Date) =>
    new RRule({
      freq: Frequency.DAILY,
      dtstart: start_date,
      until: end_date,
    }).toString(),

  // Dias úteis (Segunda a Sexta)
  weekdays: (start_date: Date, end_date?: Date) =>
    new RRule({
      freq: Frequency.WEEKLY,
      byweekday: [RRule.MO, RRule.TU, RRule.WE, RRule.TH, RRule.FR],
      dtstart: start_date,
      until: end_date,
    }).toString(),

  // Semanal no mesmo dia
  weekly: (start_date: Date, end_date?: Date) =>
    new RRule({
      freq: Frequency.WEEKLY,
      dtstart: start_date,
      until: end_date,
    }).toString(),

  // Quinzenal
  biweekly: (start_date: Date, end_date?: Date) =>
    new RRule({
      freq: Frequency.WEEKLY,
      interval: 2,
      dtstart: start_date,
      until: end_date,
    }).toString(),

  // Mensal no mesmo dia
  monthly: (start_date: Date, end_date?: Date) =>
    new RRule({
      freq: Frequency.MONTHLY,
      dtstart: start_date,
      until: end_date,
    }).toString(),
};

// Utilitários para interface
export const rrule_to_human_text = (rrule_string: string): string => {
  try {
    const rrule = RRule.fromString(rrule_string);
    return rrule.toText();
  } catch {
    return "Regra de recorrência inválida";
  }
};

// Próxima ocorrência após uma data
export const get_next_occurrence = (
  rrule_string: string,
  after_date: Date
): Date | null => {
  try {
    const rrule = RRule.fromString(rrule_string);
    return rrule.after(after_date);
  } catch {
    return null;
  }
};

// Verificar se uma data é uma ocorrência válida
export const is_occurrence_date = (
  rrule_string: string,
  check_date: Date
): boolean => {
  try {
    const rrule = RRule.fromString(rrule_string);
    const occurrences = rrule.between(
      startOfDay(check_date),
      endOfDay(check_date),
      true
    );
    return occurrences.length > 0;
  } catch {
    return false;
  }
};
