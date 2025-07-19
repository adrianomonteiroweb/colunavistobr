import {
  create_common_rrules,
  generate_occurrences_in_range,
  rrule_to_human_text,
  is_occurrence_date,
  get_next_occurrence,
  RecurrenceConfig,
  create_rrule_from_config,
} from "./index";
import { format } from "date-fns/format";
import { startOfMonth } from "date-fns/startOfMonth";
import { endOfMonth } from "date-fns/endOfMonth";
import { eachDayOfInterval } from "date-fns/eachDayOfInterval";
import { isSameDay } from "date-fns/isSameDay";
import { addMonths } from "date-fns/addMonths";
import { subMonths } from "date-fns/subMonths";
import { ptBR } from "date-fns/locale/pt-BR";

export interface CalendarAvailability {
  id: number;
  professional_id: number;
  title: string;
  rrule: string;
  start_time: string; // HH:MM format
  end_time: string; // HH:MM format
  duration_minutes: number;
  buffer_minutes: number;
  is_active: boolean;
  effective_from: Date;
  effective_until?: Date;
  metadata?: any;
}

export interface CalendarException {
  id: number;
  professional_id: number;
  availability_id?: number;
  exception_type: "block" | "modify" | "cancel";
  title: string;
  start_at: Date;
  end_at: Date;
  is_recurring: boolean;
  rrule?: string;
  modified_start_time?: string;
  modified_end_time?: string;
  notes?: string;
}

export interface CalendarAppointment {
  id: number;
  professional_id: number;
  customer_id: number;
  title: string;
  start_at: Date;
  end_at: Date;
  status: "scheduled" | "confirmed" | "completed" | "cancelled" | "no_show";
  is_recurring: boolean;
  rrule?: string;
  series_id?: string;
  is_master: boolean;
}

export interface DayAvailability {
  date: Date;
  status: "unavailable" | "available" | "partial" | "full" | "blocked";
  total_slots: number;
  booked_slots: number;
  available_slots: number;
  time_slots: TimeSlot[];
  exceptions: CalendarException[];
}

export interface TimeSlot {
  start_time: string;
  end_time: string;
  is_available: boolean;
  is_booked: boolean;
  appointment?: CalendarAppointment;
  availability_id: number;
}

export class AvailabilityCalendarService {
  /**
   * Calcula a disponibilidade de um profissional para um mês específico
   */
  static calculateMonthAvailability(
    year: number,
    month: number, // 0-based
    availabilities: CalendarAvailability[],
    appointments: CalendarAppointment[],
    exceptions: CalendarException[]
  ): DayAvailability[] {
    const startDate = startOfMonth(new Date(year, month));
    const endDate = endOfMonth(new Date(year, month));
    const daysInMonth = eachDayOfInterval({ start: startDate, end: endDate });

    return daysInMonth.map((date) =>
      this.calculateDayAvailability(
        date,
        availabilities,
        appointments,
        exceptions
      )
    );
  }

  /**
   * Calcula a disponibilidade para um dia específico
   */
  static calculateDayAvailability(
    date: Date,
    availabilities: CalendarAvailability[],
    appointments: CalendarAppointment[],
    exceptions: CalendarException[]
  ): DayAvailability {
    // Verificar exceções que bloqueiam o dia inteiro
    const dayExceptions = exceptions.filter((exception) => {
      if (exception.exception_type === "block") {
        // Verificar se a exceção afeta este dia
        if (exception.is_recurring && exception.rrule) {
          return is_occurrence_date(exception.rrule, date);
        } else {
          return date >= exception.start_at && date <= exception.end_at;
        }
      }
      return false;
    });

    // Se há exceção de bloqueio para o dia todo, retorna indisponível
    const fullDayBlock = dayExceptions.find(
      (exc) => exc.start_at.getHours() === 0 && exc.end_at.getHours() === 23
    );

    if (fullDayBlock) {
      return {
        date,
        status: "blocked",
        total_slots: 0,
        booked_slots: 0,
        available_slots: 0,
        time_slots: [],
        exceptions: dayExceptions,
      };
    }

    // Gerar slots de disponibilidade para o dia
    const timeSlots = this.generateTimeSlotsForDay(
      date,
      availabilities,
      exceptions
    );

    // Verificar agendamentos existentes
    const dayAppointments = appointments.filter((appointment) => {
      if (appointment.is_recurring && appointment.rrule) {
        return is_occurrence_date(appointment.rrule, date);
      } else {
        return isSameDay(appointment.start_at, date);
      }
    });

    // Marcar slots como ocupados
    timeSlots.forEach((slot) => {
      const slotAppointment = dayAppointments.find((appointment) => {
        const appointmentStart = format(appointment.start_at, "HH:mm");
        const appointmentEnd = format(appointment.end_at, "HH:mm");
        return (
          appointmentStart === slot.start_time &&
          appointmentEnd === slot.end_time
        );
      });

      if (slotAppointment) {
        slot.is_booked = true;
        slot.appointment = slotAppointment;
        slot.is_available = false;
      }
    });

    const totalSlots = timeSlots.length;
    const bookedSlots = timeSlots.filter((slot) => slot.is_booked).length;
    const availableSlots = totalSlots - bookedSlots;

    let status: DayAvailability["status"] = "unavailable";
    if (totalSlots === 0) {
      status = "unavailable";
    } else if (availableSlots === 0) {
      status = "full";
    } else if (availableSlots === totalSlots) {
      status = "available";
    } else {
      status = "partial";
    }

    return {
      date,
      status,
      total_slots: totalSlots,
      booked_slots: bookedSlots,
      available_slots: availableSlots,
      time_slots: timeSlots,
      exceptions: dayExceptions,
    };
  }

  /**
   * Gera slots de tempo para um dia baseado nas disponibilidades
   */
  private static generateTimeSlotsForDay(
    date: Date,
    availabilities: CalendarAvailability[],
    exceptions: CalendarException[]
  ): TimeSlot[] {
    const slots: TimeSlot[] = [];

    // Filtrar disponibilidades ativas que se aplicam a este dia
    const activeAvailabilities = availabilities.filter((availability) => {
      if (!availability.is_active) return false;
      if (date < availability.effective_from) return false;
      if (availability.effective_until && date > availability.effective_until)
        return false;

      // Verificar se a RRule inclui este dia
      return is_occurrence_date(availability.rrule, date);
    });

    // Para cada disponibilidade, gerar slots
    activeAvailabilities.forEach((availability) => {
      const daySlots = this.generateSlotsFromAvailability(
        date,
        availability,
        exceptions
      );
      slots.push(...daySlots);
    });

    // Remover duplicatas e ordenar por horário
    const uniqueSlots = slots.filter(
      (slot, index, self) =>
        index ===
        self.findIndex(
          (s) =>
            s.start_time === slot.start_time && s.end_time === slot.end_time
        )
    );

    return uniqueSlots.sort((a, b) => a.start_time.localeCompare(b.start_time));
  }

  /**
   * Gera slots de uma disponibilidade específica
   */
  private static generateSlotsFromAvailability(
    date: Date,
    availability: CalendarAvailability,
    exceptions: CalendarException[]
  ): TimeSlot[] {
    const slots: TimeSlot[] = [];

    // Converter horários para minutos
    const [startHour, startMinute] = availability.start_time
      .split(":")
      .map(Number);
    const [endHour, endMinute] = availability.end_time.split(":").map(Number);

    const startMinutes = startHour * 60 + startMinute;
    const endMinutes = endHour * 60 + endMinute;

    const slotDuration = availability.duration_minutes;
    const bufferTime = availability.buffer_minutes;
    const totalSlotTime = slotDuration + bufferTime;

    // Gerar slots
    for (
      let currentMinutes = startMinutes;
      currentMinutes + slotDuration <= endMinutes;
      currentMinutes += totalSlotTime
    ) {
      const slotStartTime = this.minutesToTimeString(currentMinutes);
      const slotEndTime = this.minutesToTimeString(
        currentMinutes + slotDuration
      );

      // Verificar se há exceções que afetam este slot
      const isBlocked = this.isSlotBlocked(
        date,
        slotStartTime,
        slotEndTime,
        exceptions
      );

      if (!isBlocked) {
        slots.push({
          start_time: slotStartTime,
          end_time: slotEndTime,
          is_available: true,
          is_booked: false,
          availability_id: availability.id,
        });
      }
    }

    return slots;
  }

  /**
   * Verifica se um slot está bloqueado por exceções
   */
  private static isSlotBlocked(
    date: Date,
    startTime: string,
    endTime: string,
    exceptions: CalendarException[]
  ): boolean {
    return exceptions.some((exception) => {
      if (exception.exception_type !== "block") return false;

      // Verificar se a exceção afeta este dia e horário
      let affectsThisDay = false;

      if (exception.is_recurring && exception.rrule) {
        affectsThisDay = is_occurrence_date(exception.rrule, date);
      } else {
        affectsThisDay = date >= exception.start_at && date <= exception.end_at;
      }

      if (!affectsThisDay) return false;

      // Verificar se o horário do slot está dentro do período de exceção
      const exceptionStart = format(exception.start_at, "HH:mm");
      const exceptionEnd = format(exception.end_at, "HH:mm");

      return (
        (startTime >= exceptionStart && startTime < exceptionEnd) ||
        (endTime > exceptionStart && endTime <= exceptionEnd) ||
        (startTime <= exceptionStart && endTime >= exceptionEnd)
      );
    });
  }

  /**
   * Converte minutos em string de tempo HH:MM
   */
  private static minutesToTimeString(minutes: number): string {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours.toString().padStart(2, "0")}:${mins
      .toString()
      .padStart(2, "0")}`;
  }

  /**
   * Cria uma nova disponibilidade com RRule
   */
  static createAvailability(data: {
    professional_id: number;
    title: string;
    recurrence_config: RecurrenceConfig;
    start_time: string;
    end_time: string;
    duration_minutes: number;
    buffer_minutes?: number;
    effective_from: Date;
    effective_until?: Date;
    metadata?: any;
  }): Omit<CalendarAvailability, "id"> {
    const rrule = create_rrule_from_config(
      data.recurrence_config,
      data.effective_from
    );

    return {
      professional_id: data.professional_id,
      title: data.title,
      rrule: rrule.toString(),
      start_time: data.start_time,
      end_time: data.end_time,
      duration_minutes: data.duration_minutes,
      buffer_minutes: data.buffer_minutes || 0,
      is_active: true,
      effective_from: data.effective_from,
      effective_until: data.effective_until,
      metadata: data.metadata,
    };
  }

  /**
   * Cria uma exceção (bloqueio, feriado, etc.)
   */
  static createException(data: {
    professional_id: number;
    availability_id?: number;
    exception_type: "block" | "modify" | "cancel";
    title: string;
    start_at: Date;
    end_at: Date;
    is_recurring?: boolean;
    recurrence_config?: RecurrenceConfig;
    modified_start_time?: string;
    modified_end_time?: string;
    notes?: string;
  }): Omit<CalendarException, "id"> {
    let rrule: string | undefined;

    if (data.is_recurring && data.recurrence_config) {
      const rruleObj = create_rrule_from_config(
        data.recurrence_config,
        data.start_at
      );
      rrule = rruleObj.toString();
    }

    return {
      professional_id: data.professional_id,
      availability_id: data.availability_id,
      exception_type: data.exception_type,
      title: data.title,
      start_at: data.start_at,
      end_at: data.end_at,
      is_recurring: data.is_recurring || false,
      rrule,
      modified_start_time: data.modified_start_time,
      modified_end_time: data.modified_end_time,
      notes: data.notes,
    };
  }

  /**
   * Obtém próximas disponibilidades de um profissional
   */
  static getUpcomingAvailabilities(
    professional_id: number,
    availabilities: CalendarAvailability[],
    appointments: CalendarAppointment[],
    exceptions: CalendarException[],
    days_ahead: number = 30
  ): DayAvailability[] {
    const today = new Date();
    const endDate = new Date();
    endDate.setDate(today.getDate() + days_ahead);

    const daysInterval = eachDayOfInterval({ start: today, end: endDate });

    return daysInterval
      .map((date) =>
        this.calculateDayAvailability(
          date,
          availabilities,
          appointments,
          exceptions
        )
      )
      .filter((day) => day.available_slots > 0);
  }

  /**
   * Verifica se um horário específico está disponível
   */
  static isTimeSlotAvailable(
    date: Date,
    start_time: string,
    end_time: string,
    professional_id: number,
    availabilities: CalendarAvailability[],
    appointments: CalendarAppointment[],
    exceptions: CalendarException[]
  ): boolean {
    const dayAvailability = this.calculateDayAvailability(
      date,
      availabilities,
      appointments,
      exceptions
    );

    return dayAvailability.time_slots.some(
      (slot) =>
        slot.start_time === start_time &&
        slot.end_time === end_time &&
        slot.is_available &&
        !slot.is_booked
    );
  }

  /**
   * Obtém texto legível de uma RRule
   */
  static getRecurrenceDescription(rrule: string): string {
    return rrule_to_human_text(rrule);
  }

  /**
   * Cria RRules para padrões comuns
   */
  static createCommonPatterns = {
    // Segunda a Sexta, 9h às 18h
    businessHours: (
      professional_id: number,
      effective_from: Date,
      effective_until?: Date
    ) => {
      return this.createAvailability({
        professional_id,
        title: "Horário Comercial",
        recurrence_config: {
          frequency: "weekly",
          interval: 1,
          weekdays: [1, 2, 3, 4, 5], // Seg-Sex
        },
        start_time: "09:00",
        end_time: "18:00",
        duration_minutes: 60,
        buffer_minutes: 15,
        effective_from,
        effective_until,
      });
    },

    // Fins de semana
    weekends: (
      professional_id: number,
      effective_from: Date,
      effective_until?: Date
    ) => {
      return this.createAvailability({
        professional_id,
        title: "Fins de Semana",
        recurrence_config: {
          frequency: "weekly",
          interval: 1,
          weekdays: [0, 6], // Dom, Sáb
        },
        start_time: "08:00",
        end_time: "16:00",
        duration_minutes: 60,
        buffer_minutes: 10,
        effective_from,
        effective_until,
      });
    },

    // Plantão (uma vez por semana)
    weeklyShift: (
      professional_id: number,
      weekday: number,
      effective_from: Date,
      effective_until?: Date
    ) => {
      return this.createAvailability({
        professional_id,
        title: "Plantão Semanal",
        recurrence_config: {
          frequency: "weekly",
          interval: 1,
          weekdays: [weekday],
        },
        start_time: "06:00",
        end_time: "14:00",
        duration_minutes: 30,
        buffer_minutes: 5,
        effective_from,
        effective_until,
      });
    },
  };
}

// Utilitários para UI
export const getCalendarStatusColor = (status: DayAvailability["status"]) => {
  switch (status) {
    case "available":
      return "bg-green-500";
    case "partial":
      return "bg-yellow-500";
    case "full":
      return "bg-red-500";
    case "blocked":
      return "bg-gray-500";
    default:
      return "bg-gray-200";
  }
};

export const getCalendarStatusText = (status: DayAvailability["status"]) => {
  switch (status) {
    case "available":
      return "Disponível";
    case "partial":
      return "Parcial";
    case "full":
      return "Lotado";
    case "blocked":
      return "Bloqueado";
    default:
      return "Indisponível";
  }
};
