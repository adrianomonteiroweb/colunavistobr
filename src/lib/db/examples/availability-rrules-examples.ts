/**
 * Exemplos de uso do sistema de disponibilidades com RRules
 *
 * Este arquivo demonstra como usar o novo sistema de disponibilidades
 * que suporta RRules para criar padrões complexos de recorrência.
 */

import type {
  NewAvailability,
  NewAvailabilityException,
  AvailabilityMetadata,
} from "../src/types";

// Exemplo 1: Disponibilidade básica - Segunda a Sexta, 9h às 17h
export const createWeekdayAvailability = (): NewAvailability => ({
  professional_id: 1,
  title: "Horário comercial - Segunda a Sexta",
  rrule: "RRULE:FREQ=WEEKLY;BYDAY=MO,TU,WE,TH,FR",
  start_time: "09:00:00",
  end_time: "17:00:00",
  duration_minutes: 60, // Sessões de 1 hora
  buffer_minutes: 15, // 15min entre sessões
  effective_from: new Date(),
  is_active: true,
  metadata: {
    max_bookings_per_day: 8,
    advance_booking_days: 30,
    same_day_booking: false,
    cancellation_window_hours: 24,
  } as AvailabilityMetadata,
});

// Exemplo 2: Disponibilidade específica - Sábados de manhã
export const createSaturdayMorningAvailability = (): NewAvailability => ({
  professional_id: 1,
  title: "Sábado manhã - Atendimento especial",
  rrule: "RRULE:FREQ=WEEKLY;BYDAY=SA",
  start_time: "08:00:00",
  end_time: "12:00:00",
  duration_minutes: 90, // Sessões mais longas aos sábados
  buffer_minutes: 30,
  effective_from: new Date(),
  is_active: true,
  metadata: {
    max_bookings_per_day: 3,
    advance_booking_days: 14,
    special_rate: 150, // 50% mais caro
    requires_approval: true,
  },
});

// Exemplo 3: Disponibilidade complexa - Plantão noturno a cada 15 dias
export const createNightShiftAvailability = (): NewAvailability => ({
  professional_id: 1,
  title: "Plantão noturno quinzenal",
  rrule: "RRULE:FREQ=WEEKLY;INTERVAL=2;BYDAY=TU,TH",
  start_time: "19:00:00",
  end_time: "22:00:00",
  duration_minutes: 45,
  buffer_minutes: 15,
  effective_from: new Date(),
  effective_until: new Date(Date.now() + 6 * 30 * 24 * 60 * 60 * 1000), // 6 meses
  is_active: true,
  metadata: {
    max_bookings_per_day: 4,
    advance_booking_days: 7,
    is_peak_hour: true,
    special_rate: 120,
  },
});

// Exemplo 4: Disponibilidade sazonal - Apenas nos meses de verão
export const createSummerAvailability = (): NewAvailability => ({
  professional_id: 1,
  title: "Atendimento de verão",
  rrule: "RRULE:FREQ=WEEKLY;BYMONTH=12,1,2;BYDAY=MO,WE,FR", // Dezembro, Janeiro, Fevereiro
  start_time: "07:00:00",
  end_time: "11:00:00",
  duration_minutes: 60,
  buffer_minutes: 0,
  effective_from: new Date(),
  is_active: true,
  metadata: {
    max_bookings_per_day: 4,
    advance_booking_days: 45,
    seasonal: true,
  },
});

// Exemplo 5: Exceção - Férias de 15 dias
export const createVacationException = (): NewAvailabilityException => ({
  professional_id: 1,
  exception_type: "block",
  title: "Férias de final de ano",
  start_at: new Date("2025-12-20"),
  end_at: new Date("2026-01-05"),
  is_recurring: false,
  notes: "Período de férias programadas",
  metadata: {
    auto_reschedule: true,
    notification_sent: true,
  },
});

// Exemplo 6: Exceção recorrente - Feriados nacionais
export const createNationalHolidayException = (): NewAvailabilityException => ({
  professional_id: 1,
  exception_type: "block",
  title: "Independência do Brasil",
  start_at: new Date("2025-09-07"),
  end_at: new Date("2025-09-07"),
  is_recurring: true,
  rrule: "RRULE:FREQ=YEARLY;BYMONTH=9;BYMONTHDAY=7", // 7 de setembro, todos os anos
  notes: "Feriado nacional - sem atendimentos",
  metadata: {
    holiday_type: "national",
    auto_notification: true,
  },
});

// Exemplo 7: Exceção de modificação - Horário especial em determinado dia
export const createSpecialHoursException = (): NewAvailabilityException => ({
  professional_id: 1,
  availability_id: 1, // Modifica uma disponibilidade específica
  exception_type: "modify",
  title: "Horário especial - Congresso médico",
  start_at: new Date("2025-07-15"),
  end_at: new Date("2025-07-15"),
  modified_start_time: "14:00:00", // Atende só à tarde
  modified_end_time: "18:00:00",
  is_recurring: false,
  notes: "Participação em congresso pela manhã",
  metadata: {
    reason: "professional_development",
    make_up_sessions: true,
  },
});

// Função utilitária para gerar RRules comuns
export const generateCommonRRule = (
  pattern: "weekdays" | "weekends" | "daily" | "weekly" | "biweekly",
  days?: string[]
): string => {
  switch (pattern) {
    case "weekdays":
      return "RRULE:FREQ=WEEKLY;BYDAY=MO,TU,WE,TH,FR";
    case "weekends":
      return "RRULE:FREQ=WEEKLY;BYDAY=SA,SU";
    case "daily":
      return "RRULE:FREQ=DAILY";
    case "weekly":
      return days
        ? `RRULE:FREQ=WEEKLY;BYDAY=${days.join(",")}`
        : "RRULE:FREQ=WEEKLY";
    case "biweekly":
      return days
        ? `RRULE:FREQ=WEEKLY;INTERVAL=2;BYDAY=${days.join(",")}`
        : "RRULE:FREQ=WEEKLY;INTERVAL=2";
    default:
      return "RRULE:FREQ=WEEKLY";
  }
};

// Exemplos de RRules comuns
export const commonRRules = {
  // Todos os dias úteis
  weekdays: "RRULE:FREQ=WEEKLY;BYDAY=MO,TU,WE,TH,FR",

  // Fins de semana
  weekends: "RRULE:FREQ=WEEKLY;BYDAY=SA,SU",

  // Toda segunda-feira
  mondays: "RRULE:FREQ=WEEKLY;BYDAY=MO",

  // A cada duas semanas nas terças e quintas
  biweeklyTueThu: "RRULE:FREQ=WEEKLY;INTERVAL=2;BYDAY=TU,TH",

  // Primeiro sábado do mês
  firstSaturday: "RRULE:FREQ=MONTHLY;BYDAY=1SA",

  // Últimos 3 dias do mês
  lastThreeDays: "RRULE:FREQ=MONTHLY;BYMONTHDAY=-3,-2,-1",

  // Apenas dezembro e janeiro
  winterMonths: "RRULE:FREQ=WEEKLY;BYMONTH=12,1;BYDAY=MO,TU,WE,TH,FR",
};
