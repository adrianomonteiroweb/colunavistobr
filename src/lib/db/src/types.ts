import { InferSelectModel, InferInsertModel } from "drizzle-orm";
import {
  users,
  professionals,
  customers,
  packages,
  subscriptions,
  appointments,
  appointment_contexts,
  appointment_tasks,
  appointment_attachments,
  availabilities,
  availability_exceptions,
  availability_slots,
  payments,
} from "./schema";

// User types
export type User = InferSelectModel<typeof users>;
export type NewUser = InferInsertModel<typeof users>;
export type UserUpdate = Partial<NewUser>;

// Role types
export type UserRole = "admin" | "professional" | "customer";

// User payload structure
export interface UserPayload {
  preferences?: Record<string, any>;
  settings?: Record<string, any>;
  profile_data?: Record<string, any>;
  [key: string]: any;
}

// User metadata structure
export interface UserMetadata {
  last_login?: string;
  login_count?: number;
  ip_address?: string;
  user_agent?: string;
  [key: string]: any;
}

// Repository query parameters
export interface GetUserParams {
  q?: string;
  page?: number;
  page_size?: number;
  role?: UserRole;
  is_healthcare_professional?: boolean;
}

// User creation data
export interface CreateUserData {
  name: string;
  last_name?: string;
  email: string;
  username?: string;
  document_number?: string;
  password?: string;
  role?: UserRole;
  is_healthcare_professional?: boolean;
  payload?: UserPayload;
  metadata?: UserMetadata;
}

// User update data
export interface UpdateUserData extends Partial<CreateUserData> {
  id?: never; // Prevent updating ID
}

// Sign up data
export interface SignUpUserData {
  name: string;
  email: string;
  document_number: string;
  password: string;
}

// API Response types
export interface ApiResponse<T = any> {
  status: number;
  message?: string;
  code?: string;
  data?: T;
  user?: User;
}

export interface PaginatedResponse<T> {
  count: number;
  data: T[];
  page?: number;
  page_size?: number;
  total_pages?: number;
}

// Enum para status de agendamento
export type AppointmentStatus =
  | "scheduled"
  | "confirmed"
  | "in_progress"
  | "completed"
  | "no_show"
  | "cancelled_by_client"
  | "cancelled_by_professional";

// Appointment types
export type Appointment = InferSelectModel<typeof appointments>;
export type NewAppointment = InferInsertModel<typeof appointments>;

// Professional types
export type Professional = InferSelectModel<typeof professionals>;
export type NewProfessional = InferInsertModel<typeof professionals>;

// Customer types
export type Customer = InferSelectModel<typeof customers>;
export type NewCustomer = InferInsertModel<typeof customers>;

// Package types (renamed from SubscriptionPackage)
export type Package = InferSelectModel<typeof packages>;
export type NewPackage = InferInsertModel<typeof packages>;

// Subscription types
export type Subscription = InferSelectModel<typeof subscriptions>;
export type NewSubscription = InferInsertModel<typeof subscriptions>;

// Payment types
export type Payment = InferSelectModel<typeof payments>;
export type NewPayment = InferInsertModel<typeof payments>;

// Appointment Context types
export type AppointmentContext = InferSelectModel<typeof appointment_contexts>;
export type NewAppointmentContext = InferInsertModel<
  typeof appointment_contexts
>;

// Appointment Task types
export type AppointmentTask = InferSelectModel<typeof appointment_tasks>;
export type NewAppointmentTask = InferInsertModel<typeof appointment_tasks>;

// Appointment Attachment types
export type AppointmentAttachment = InferSelectModel<
  typeof appointment_attachments
>;
export type NewAppointmentAttachment = InferInsertModel<
  typeof appointment_attachments
>;

// Availability types with RRules support
export type Availability = InferSelectModel<typeof availabilities>;
export type NewAvailability = InferInsertModel<typeof availabilities>;
export type AvailabilityUpdate = Partial<NewAvailability>;

export type AvailabilityException = InferSelectModel<
  typeof availability_exceptions
>;
export type NewAvailabilityException = InferInsertModel<
  typeof availability_exceptions
>;

export type AvailabilitySlot = InferSelectModel<typeof availability_slots>;
export type NewAvailabilitySlot = InferInsertModel<typeof availability_slots>;

// Availability-specific enums and interfaces
export type AvailabilityExceptionType = "block" | "modify" | "cancel";
export type SlotStatus = "available" | "booked" | "blocked" | "past";

export interface AvailabilityMetadata {
  max_bookings_per_day?: number;
  advance_booking_days?: number;
  same_day_booking?: boolean;
  cancellation_window_hours?: number;
  [key: string]: any;
}

export interface SlotMetadata {
  is_peak_hour?: boolean;
  special_rate?: number;
  requires_approval?: boolean;
  [key: string]: any;
}

// Extended types with relations
export type PackageWithProfessional = Package & {
  professional: Professional;
};

export type SubscriptionWithPackageAndCustomer = Subscription & {
  package: Package;
  customer: Customer;
  professional?: Professional;
};

export type SubscriptionWithUsage = Subscription & {
  package: Package;
  customer: Customer;
  sessions_available: number;
  sessions_total: number;
  usage_percentage: number;
};

export type AppointmentWithRelations = Appointment & {
  professional: Professional;
  customer: Customer;
  contexts?: AppointmentContext[];
  tasks?: AppointmentTask[];
  attachments?: AppointmentAttachment[];
  payment?: Payment;
};

// Legacy compatibility types
export type SubscriptionPackage = Package;
export type NewSubscriptionPackage = NewPackage;
export type SubscriptionPayment = Payment;
export type NewSubscriptionPayment = NewPayment;
