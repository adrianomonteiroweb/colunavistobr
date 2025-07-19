import { z } from 'zod';

declare const userSchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    email: z.ZodString;
    phone: z.ZodString;
    role: z.ZodEnum<["admin", "professional", "customer"]>;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
}, "strip", z.ZodTypeAny, {
    id: string;
    name: string;
    email: string;
    phone: string;
    role: "admin" | "professional" | "customer";
    createdAt: Date;
    updatedAt: Date;
}, {
    id: string;
    name: string;
    email: string;
    phone: string;
    role: "admin" | "professional" | "customer";
    createdAt: Date;
    updatedAt: Date;
}>;
declare const createUserSchema: z.ZodObject<Omit<{
    id: z.ZodString;
    name: z.ZodString;
    email: z.ZodString;
    phone: z.ZodString;
    role: z.ZodEnum<["admin", "professional", "customer"]>;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
}, "id" | "createdAt" | "updatedAt">, "strip", z.ZodTypeAny, {
    name: string;
    email: string;
    phone: string;
    role: "admin" | "professional" | "customer";
}, {
    name: string;
    email: string;
    phone: string;
    role: "admin" | "professional" | "customer";
}>;
declare const updateUserSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    email: z.ZodOptional<z.ZodString>;
    phone: z.ZodOptional<z.ZodString>;
    role: z.ZodOptional<z.ZodEnum<["admin", "professional", "customer"]>>;
}, "strip", z.ZodTypeAny, {
    name?: string | undefined;
    email?: string | undefined;
    phone?: string | undefined;
    role?: "admin" | "professional" | "customer" | undefined;
}, {
    name?: string | undefined;
    email?: string | undefined;
    phone?: string | undefined;
    role?: "admin" | "professional" | "customer" | undefined;
}>;
declare const loginSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
}, {
    email: string;
    password: string;
}>;
declare const registerSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
} & {
    name: z.ZodString;
    phone: z.ZodString;
}, "strip", z.ZodTypeAny, {
    name: string;
    email: string;
    phone: string;
    password: string;
}, {
    name: string;
    email: string;
    phone: string;
    password: string;
}>;
type User = z.infer<typeof userSchema>;
type CreateUser = z.infer<typeof createUserSchema>;
type UpdateUser = z.infer<typeof updateUserSchema>;
type Login = z.infer<typeof loginSchema>;
type Register = z.infer<typeof registerSchema>;

declare const profession_type: z.ZodEnum<["healthcare", "education", "consulting", "fitness", "beauty", "maintenance", "creative", "other"]>;
declare const appointment_status: z.ZodEnum<["scheduled", "confirmed", "in_progress", "completed", "no_show", "cancelled_by_client", "cancelled_by_professional", "rescheduled"]>;
declare const context_type: z.ZodEnum<["notes", "medical_record", "lesson_plan", "exercise_routine", "consultation_summary", "homework_assignments", "progress_report", "treatment_plan", "project_briefing", "maintenance_checklist"]>;
declare const appointment_schema: z.ZodObject<{
    id: z.ZodString;
    professional_id: z.ZodString;
    client_id: z.ZodString;
    client_name: z.ZodString;
    client_email: z.ZodOptional<z.ZodString>;
    client_phone: z.ZodOptional<z.ZodString>;
    service_name: z.ZodString;
    service_duration: z.ZodNumber;
    service_price: z.ZodOptional<z.ZodNumber>;
    scheduled_date: z.ZodString;
    scheduled_time: z.ZodString;
    end_time: z.ZodOptional<z.ZodString>;
    status: z.ZodEnum<["scheduled", "confirmed", "in_progress", "completed", "no_show", "cancelled_by_client", "cancelled_by_professional", "rescheduled"]>;
    profession_type: z.ZodEnum<["healthcare", "education", "consulting", "fitness", "beauty", "maintenance", "creative", "other"]>;
    location_type: z.ZodOptional<z.ZodEnum<["in_person", "online", "home_visit"]>>;
    location_address: z.ZodOptional<z.ZodString>;
    online_meeting_url: z.ZodOptional<z.ZodString>;
    pre_appointment_notes: z.ZodOptional<z.ZodString>;
    appointment_context: z.ZodOptional<z.ZodArray<z.ZodObject<{
        type: z.ZodEnum<["notes", "medical_record", "lesson_plan", "exercise_routine", "consultation_summary", "homework_assignments", "progress_report", "treatment_plan", "project_briefing", "maintenance_checklist"]>;
        title: z.ZodString;
        content: z.ZodString;
        created_at: z.ZodString;
        updated_at: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        type: "notes" | "medical_record" | "lesson_plan" | "exercise_routine" | "consultation_summary" | "homework_assignments" | "progress_report" | "treatment_plan" | "project_briefing" | "maintenance_checklist";
        title: string;
        content: string;
        created_at: string;
        updated_at?: string | undefined;
    }, {
        type: "notes" | "medical_record" | "lesson_plan" | "exercise_routine" | "consultation_summary" | "homework_assignments" | "progress_report" | "treatment_plan" | "project_briefing" | "maintenance_checklist";
        title: string;
        content: string;
        created_at: string;
        updated_at?: string | undefined;
    }>, "many">>;
    client_rating: z.ZodOptional<z.ZodNumber>;
    client_feedback: z.ZodOptional<z.ZodString>;
    professional_notes: z.ZodOptional<z.ZodString>;
    tasks_assigned: z.ZodOptional<z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        title: z.ZodString;
        description: z.ZodOptional<z.ZodString>;
        is_completed: z.ZodDefault<z.ZodBoolean>;
        due_date: z.ZodOptional<z.ZodString>;
        completion_date: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        id: string;
        title: string;
        is_completed: boolean;
        description?: string | undefined;
        due_date?: string | undefined;
        completion_date?: string | undefined;
    }, {
        id: string;
        title: string;
        description?: string | undefined;
        is_completed?: boolean | undefined;
        due_date?: string | undefined;
        completion_date?: string | undefined;
    }>, "many">>;
    attachments: z.ZodOptional<z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        filename: z.ZodString;
        file_type: z.ZodString;
        file_url: z.ZodString;
        uploaded_at: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        id: string;
        filename: string;
        file_type: string;
        file_url: string;
        uploaded_at: string;
    }, {
        id: string;
        filename: string;
        file_type: string;
        file_url: string;
        uploaded_at: string;
    }>, "many">>;
    payment_status: z.ZodOptional<z.ZodEnum<["pending", "paid", "cancelled", "refunded"]>>;
    payment_amount: z.ZodOptional<z.ZodNumber>;
    payment_method: z.ZodOptional<z.ZodString>;
    payment_date: z.ZodOptional<z.ZodString>;
    subscription_id: z.ZodOptional<z.ZodString>;
    session_number: z.ZodOptional<z.ZodNumber>;
    metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
    created_at: z.ZodString;
    updated_at: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
    status: "scheduled" | "confirmed" | "in_progress" | "completed" | "no_show" | "cancelled_by_client" | "cancelled_by_professional" | "rescheduled";
    professional_id: string;
    client_id: string;
    client_name: string;
    service_name: string;
    service_duration: number;
    scheduled_date: string;
    scheduled_time: string;
    profession_type: "healthcare" | "education" | "consulting" | "fitness" | "beauty" | "maintenance" | "creative" | "other";
    created_at: string;
    updated_at: string;
    client_email?: string | undefined;
    client_phone?: string | undefined;
    service_price?: number | undefined;
    end_time?: string | undefined;
    location_type?: "in_person" | "online" | "home_visit" | undefined;
    location_address?: string | undefined;
    online_meeting_url?: string | undefined;
    pre_appointment_notes?: string | undefined;
    appointment_context?: {
        type: "notes" | "medical_record" | "lesson_plan" | "exercise_routine" | "consultation_summary" | "homework_assignments" | "progress_report" | "treatment_plan" | "project_briefing" | "maintenance_checklist";
        title: string;
        content: string;
        created_at: string;
        updated_at?: string | undefined;
    }[] | undefined;
    client_rating?: number | undefined;
    client_feedback?: string | undefined;
    professional_notes?: string | undefined;
    tasks_assigned?: {
        id: string;
        title: string;
        is_completed: boolean;
        description?: string | undefined;
        due_date?: string | undefined;
        completion_date?: string | undefined;
    }[] | undefined;
    attachments?: {
        id: string;
        filename: string;
        file_type: string;
        file_url: string;
        uploaded_at: string;
    }[] | undefined;
    payment_status?: "pending" | "paid" | "cancelled" | "refunded" | undefined;
    payment_amount?: number | undefined;
    payment_method?: string | undefined;
    payment_date?: string | undefined;
    subscription_id?: string | undefined;
    session_number?: number | undefined;
    metadata?: Record<string, any> | undefined;
}, {
    id: string;
    status: "scheduled" | "confirmed" | "in_progress" | "completed" | "no_show" | "cancelled_by_client" | "cancelled_by_professional" | "rescheduled";
    professional_id: string;
    client_id: string;
    client_name: string;
    service_name: string;
    service_duration: number;
    scheduled_date: string;
    scheduled_time: string;
    profession_type: "healthcare" | "education" | "consulting" | "fitness" | "beauty" | "maintenance" | "creative" | "other";
    created_at: string;
    updated_at: string;
    client_email?: string | undefined;
    client_phone?: string | undefined;
    service_price?: number | undefined;
    end_time?: string | undefined;
    location_type?: "in_person" | "online" | "home_visit" | undefined;
    location_address?: string | undefined;
    online_meeting_url?: string | undefined;
    pre_appointment_notes?: string | undefined;
    appointment_context?: {
        type: "notes" | "medical_record" | "lesson_plan" | "exercise_routine" | "consultation_summary" | "homework_assignments" | "progress_report" | "treatment_plan" | "project_briefing" | "maintenance_checklist";
        title: string;
        content: string;
        created_at: string;
        updated_at?: string | undefined;
    }[] | undefined;
    client_rating?: number | undefined;
    client_feedback?: string | undefined;
    professional_notes?: string | undefined;
    tasks_assigned?: {
        id: string;
        title: string;
        description?: string | undefined;
        is_completed?: boolean | undefined;
        due_date?: string | undefined;
        completion_date?: string | undefined;
    }[] | undefined;
    attachments?: {
        id: string;
        filename: string;
        file_type: string;
        file_url: string;
        uploaded_at: string;
    }[] | undefined;
    payment_status?: "pending" | "paid" | "cancelled" | "refunded" | undefined;
    payment_amount?: number | undefined;
    payment_method?: string | undefined;
    payment_date?: string | undefined;
    subscription_id?: string | undefined;
    session_number?: number | undefined;
    metadata?: Record<string, any> | undefined;
}>;
type Appointment = z.infer<typeof appointment_schema>;
declare const profession_config_schema: z.ZodObject<{
    type: z.ZodEnum<["healthcare", "education", "consulting", "fitness", "beauty", "maintenance", "creative", "other"]>;
    terminology: z.ZodObject<{
        client: z.ZodString;
        appointment: z.ZodString;
        service: z.ZodString;
        context: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        client: string;
        appointment: string;
        service: string;
        context: string;
    }, {
        client: string;
        appointment: string;
        service: string;
        context: string;
    }>;
    available_context_types: z.ZodArray<z.ZodEnum<["notes", "medical_record", "lesson_plan", "exercise_routine", "consultation_summary", "homework_assignments", "progress_report", "treatment_plan", "project_briefing", "maintenance_checklist"]>, "many">;
    default_duration: z.ZodNumber;
    requires_payment: z.ZodDefault<z.ZodBoolean>;
    allows_tasks: z.ZodDefault<z.ZodBoolean>;
    allows_rating: z.ZodDefault<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    type: "healthcare" | "education" | "consulting" | "fitness" | "beauty" | "maintenance" | "creative" | "other";
    terminology: {
        client: string;
        appointment: string;
        service: string;
        context: string;
    };
    available_context_types: ("notes" | "medical_record" | "lesson_plan" | "exercise_routine" | "consultation_summary" | "homework_assignments" | "progress_report" | "treatment_plan" | "project_briefing" | "maintenance_checklist")[];
    default_duration: number;
    requires_payment: boolean;
    allows_tasks: boolean;
    allows_rating: boolean;
}, {
    type: "healthcare" | "education" | "consulting" | "fitness" | "beauty" | "maintenance" | "creative" | "other";
    terminology: {
        client: string;
        appointment: string;
        service: string;
        context: string;
    };
    available_context_types: ("notes" | "medical_record" | "lesson_plan" | "exercise_routine" | "consultation_summary" | "homework_assignments" | "progress_report" | "treatment_plan" | "project_briefing" | "maintenance_checklist")[];
    default_duration: number;
    requires_payment?: boolean | undefined;
    allows_tasks?: boolean | undefined;
    allows_rating?: boolean | undefined;
}>;
type ProfessionConfig = z.infer<typeof profession_config_schema>;
declare const profession_configs: Record<string, ProfessionConfig>;
declare const appointmentSchema: z.ZodObject<{
    id: z.ZodString;
    clientId: z.ZodString;
    professionalId: z.ZodString;
    serviceId: z.ZodString;
    date: z.ZodDate;
    startTime: z.ZodString;
    endTime: z.ZodString;
    status: z.ZodEnum<["scheduled", "confirmed", "cancelled", "completed"]>;
    notes: z.ZodOptional<z.ZodString>;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
}, "strip", z.ZodTypeAny, {
    id: string;
    status: "scheduled" | "confirmed" | "completed" | "cancelled";
    date: Date;
    createdAt: Date;
    updatedAt: Date;
    clientId: string;
    professionalId: string;
    serviceId: string;
    startTime: string;
    endTime: string;
    notes?: string | undefined;
}, {
    id: string;
    status: "scheduled" | "confirmed" | "completed" | "cancelled";
    date: Date;
    createdAt: Date;
    updatedAt: Date;
    clientId: string;
    professionalId: string;
    serviceId: string;
    startTime: string;
    endTime: string;
    notes?: string | undefined;
}>;
declare const createAppointmentSchema: z.ZodObject<Omit<{
    id: z.ZodString;
    clientId: z.ZodString;
    professionalId: z.ZodString;
    serviceId: z.ZodString;
    date: z.ZodDate;
    startTime: z.ZodString;
    endTime: z.ZodString;
    status: z.ZodEnum<["scheduled", "confirmed", "cancelled", "completed"]>;
    notes: z.ZodOptional<z.ZodString>;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
}, "id" | "createdAt" | "updatedAt">, "strip", z.ZodTypeAny, {
    status: "scheduled" | "confirmed" | "completed" | "cancelled";
    date: Date;
    clientId: string;
    professionalId: string;
    serviceId: string;
    startTime: string;
    endTime: string;
    notes?: string | undefined;
}, {
    status: "scheduled" | "confirmed" | "completed" | "cancelled";
    date: Date;
    clientId: string;
    professionalId: string;
    serviceId: string;
    startTime: string;
    endTime: string;
    notes?: string | undefined;
}>;
declare const updateAppointmentSchema: z.ZodObject<{
    status: z.ZodOptional<z.ZodEnum<["scheduled", "confirmed", "cancelled", "completed"]>>;
    date: z.ZodOptional<z.ZodDate>;
    notes: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    clientId: z.ZodOptional<z.ZodString>;
    professionalId: z.ZodOptional<z.ZodString>;
    serviceId: z.ZodOptional<z.ZodString>;
    startTime: z.ZodOptional<z.ZodString>;
    endTime: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    status?: "scheduled" | "confirmed" | "completed" | "cancelled" | undefined;
    date?: Date | undefined;
    notes?: string | undefined;
    clientId?: string | undefined;
    professionalId?: string | undefined;
    serviceId?: string | undefined;
    startTime?: string | undefined;
    endTime?: string | undefined;
}, {
    status?: "scheduled" | "confirmed" | "completed" | "cancelled" | undefined;
    date?: Date | undefined;
    notes?: string | undefined;
    clientId?: string | undefined;
    professionalId?: string | undefined;
    serviceId?: string | undefined;
    startTime?: string | undefined;
    endTime?: string | undefined;
}>;
declare const serviceSchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    duration: z.ZodNumber;
    price: z.ZodNumber;
    professionalId: z.ZodString;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
}, "strip", z.ZodTypeAny, {
    id: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    professionalId: string;
    duration: number;
    price: number;
    description?: string | undefined;
}, {
    id: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    professionalId: string;
    duration: number;
    price: number;
    description?: string | undefined;
}>;
declare const createServiceSchema: z.ZodObject<Omit<{
    id: z.ZodString;
    name: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    duration: z.ZodNumber;
    price: z.ZodNumber;
    professionalId: z.ZodString;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
}, "id" | "createdAt" | "updatedAt">, "strip", z.ZodTypeAny, {
    name: string;
    professionalId: string;
    duration: number;
    price: number;
    description?: string | undefined;
}, {
    name: string;
    professionalId: string;
    duration: number;
    price: number;
    description?: string | undefined;
}>;
declare const updateServiceSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    professionalId: z.ZodOptional<z.ZodString>;
    duration: z.ZodOptional<z.ZodNumber>;
    price: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    name?: string | undefined;
    description?: string | undefined;
    professionalId?: string | undefined;
    duration?: number | undefined;
    price?: number | undefined;
}, {
    name?: string | undefined;
    description?: string | undefined;
    professionalId?: string | undefined;
    duration?: number | undefined;
    price?: number | undefined;
}>;
declare const availabilitySchema: z.ZodObject<{
    id: z.ZodString;
    professionalId: z.ZodString;
    dayOfWeek: z.ZodNumber;
    startTime: z.ZodString;
    endTime: z.ZodString;
    isActive: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    id: string;
    professionalId: string;
    startTime: string;
    endTime: string;
    dayOfWeek: number;
    isActive: boolean;
}, {
    id: string;
    professionalId: string;
    startTime: string;
    endTime: string;
    dayOfWeek: number;
    isActive: boolean;
}>;
type LegacyAppointment = z.infer<typeof appointmentSchema>;
type CreateAppointment = z.infer<typeof createAppointmentSchema>;
type UpdateAppointment = z.infer<typeof updateAppointmentSchema>;
type Service = z.infer<typeof serviceSchema>;
type CreateService = z.infer<typeof createServiceSchema>;
type UpdateService = z.infer<typeof updateServiceSchema>;
type Availability = z.infer<typeof availabilitySchema>;

declare const signInSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
}, {
    email: string;
    password: string;
}>;
declare const signUpSchema: z.ZodEffects<z.ZodObject<{
    name: z.ZodString;
    email: z.ZodString;
    phone: z.ZodString;
    password: z.ZodString;
    confirmPassword: z.ZodString;
}, "strip", z.ZodTypeAny, {
    name: string;
    email: string;
    phone: string;
    password: string;
    confirmPassword: string;
}, {
    name: string;
    email: string;
    phone: string;
    password: string;
    confirmPassword: string;
}>, {
    name: string;
    email: string;
    phone: string;
    password: string;
    confirmPassword: string;
}, {
    name: string;
    email: string;
    phone: string;
    password: string;
    confirmPassword: string;
}>;
declare const jwtPayloadSchema: z.ZodObject<{
    userId: z.ZodString;
    email: z.ZodString;
    role: z.ZodEnum<["admin", "professional", "customer"]>;
    iat: z.ZodOptional<z.ZodNumber>;
    exp: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    email: string;
    role: "admin" | "professional" | "customer";
    userId: string;
    iat?: number | undefined;
    exp?: number | undefined;
}, {
    email: string;
    role: "admin" | "professional" | "customer";
    userId: string;
    iat?: number | undefined;
    exp?: number | undefined;
}>;
declare const refreshTokenSchema: z.ZodObject<{
    refreshToken: z.ZodString;
}, "strip", z.ZodTypeAny, {
    refreshToken: string;
}, {
    refreshToken: string;
}>;
declare const forgotPasswordSchema: z.ZodObject<{
    email: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
}, {
    email: string;
}>;
declare const resetPasswordSchema: z.ZodEffects<z.ZodObject<{
    token: z.ZodString;
    password: z.ZodString;
    confirmPassword: z.ZodString;
}, "strip", z.ZodTypeAny, {
    password: string;
    confirmPassword: string;
    token: string;
}, {
    password: string;
    confirmPassword: string;
    token: string;
}>, {
    password: string;
    confirmPassword: string;
    token: string;
}, {
    password: string;
    confirmPassword: string;
    token: string;
}>;
declare const changePasswordSchema: z.ZodEffects<z.ZodObject<{
    currentPassword: z.ZodString;
    newPassword: z.ZodString;
    confirmPassword: z.ZodString;
}, "strip", z.ZodTypeAny, {
    confirmPassword: string;
    currentPassword: string;
    newPassword: string;
}, {
    confirmPassword: string;
    currentPassword: string;
    newPassword: string;
}>, {
    confirmPassword: string;
    currentPassword: string;
    newPassword: string;
}, {
    confirmPassword: string;
    currentPassword: string;
    newPassword: string;
}>;
type SignIn = z.infer<typeof signInSchema>;
type SignUp = z.infer<typeof signUpSchema>;
type JwtPayload = z.infer<typeof jwtPayloadSchema>;
type RefreshToken = z.infer<typeof refreshTokenSchema>;
type ForgotPassword = z.infer<typeof forgotPasswordSchema>;
type ResetPassword = z.infer<typeof resetPasswordSchema>;
type ChangePassword = z.infer<typeof changePasswordSchema>;

declare const create_subscription_package_schema: z.ZodObject<{
    name: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    monthly_price: z.ZodNumber;
    sessions_per_month: z.ZodNumber;
    allow_rollover: z.ZodDefault<z.ZodBoolean>;
    max_rollover_sessions: z.ZodDefault<z.ZodNumber>;
    cancellation_policy: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    name: string;
    monthly_price: number;
    sessions_per_month: number;
    allow_rollover: boolean;
    max_rollover_sessions: number;
    description?: string | undefined;
    cancellation_policy?: string | undefined;
}, {
    name: string;
    monthly_price: number;
    sessions_per_month: number;
    description?: string | undefined;
    allow_rollover?: boolean | undefined;
    max_rollover_sessions?: number | undefined;
    cancellation_policy?: string | undefined;
}>;
declare const update_subscription_package_schema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    monthly_price: z.ZodOptional<z.ZodNumber>;
    sessions_per_month: z.ZodOptional<z.ZodNumber>;
    allow_rollover: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
    max_rollover_sessions: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
    cancellation_policy: z.ZodOptional<z.ZodOptional<z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    name?: string | undefined;
    description?: string | undefined;
    monthly_price?: number | undefined;
    sessions_per_month?: number | undefined;
    allow_rollover?: boolean | undefined;
    max_rollover_sessions?: number | undefined;
    cancellation_policy?: string | undefined;
}, {
    name?: string | undefined;
    description?: string | undefined;
    monthly_price?: number | undefined;
    sessions_per_month?: number | undefined;
    allow_rollover?: boolean | undefined;
    max_rollover_sessions?: number | undefined;
    cancellation_policy?: string | undefined;
}>;
declare const create_subscription_schema: z.ZodObject<{
    package_id: z.ZodString;
    professional_id: z.ZodString;
    payment_method: z.ZodDefault<z.ZodEnum<["card", "boleto", "pix"]>>;
}, "strip", z.ZodTypeAny, {
    professional_id: string;
    payment_method: "card" | "boleto" | "pix";
    package_id: string;
}, {
    professional_id: string;
    package_id: string;
    payment_method?: "card" | "boleto" | "pix" | undefined;
}>;
declare const update_subscription_status_schema: z.ZodObject<{
    status: z.ZodEnum<["active", "paused", "cancelled", "past_due"]>;
    reason: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    status: "cancelled" | "active" | "paused" | "past_due";
    reason?: string | undefined;
}, {
    status: "cancelled" | "active" | "paused" | "past_due";
    reason?: string | undefined;
}>;
declare const create_session_usage_schema: z.ZodObject<{
    subscription_id: z.ZodString;
    session_date: z.ZodString;
    appointment_id: z.ZodOptional<z.ZodString>;
    notes: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    subscription_id: string;
    session_date: string;
    notes?: string | undefined;
    appointment_id?: string | undefined;
}, {
    subscription_id: string;
    session_date: string;
    notes?: string | undefined;
    appointment_id?: string | undefined;
}>;
type CreateSubscriptionPackageInput = z.infer<typeof create_subscription_package_schema>;
type UpdateSubscriptionPackageInput = z.infer<typeof update_subscription_package_schema>;
type CreateSubscriptionInput = z.infer<typeof create_subscription_schema>;
type UpdateSubscriptionStatusInput = z.infer<typeof update_subscription_status_schema>;
type CreateSessionUsageInput = z.infer<typeof create_session_usage_schema>;
declare const subscription_package_filters_schema: z.ZodObject<{
    professional_id: z.ZodOptional<z.ZodString>;
    is_active: z.ZodOptional<z.ZodBoolean>;
    min_price: z.ZodOptional<z.ZodNumber>;
    max_price: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    professional_id?: string | undefined;
    is_active?: boolean | undefined;
    min_price?: number | undefined;
    max_price?: number | undefined;
}, {
    professional_id?: string | undefined;
    is_active?: boolean | undefined;
    min_price?: number | undefined;
    max_price?: number | undefined;
}>;
declare const subscription_filters_schema: z.ZodObject<{
    customer_id: z.ZodOptional<z.ZodString>;
    package_id: z.ZodOptional<z.ZodString>;
    status: z.ZodOptional<z.ZodEnum<["active", "paused", "cancelled", "past_due"]>>;
}, "strip", z.ZodTypeAny, {
    status?: "cancelled" | "active" | "paused" | "past_due" | undefined;
    package_id?: string | undefined;
    customer_id?: string | undefined;
}, {
    status?: "cancelled" | "active" | "paused" | "past_due" | undefined;
    package_id?: string | undefined;
    customer_id?: string | undefined;
}>;
type SubscriptionPackageFilters = z.infer<typeof subscription_package_filters_schema>;
type SubscriptionFilters = z.infer<typeof subscription_filters_schema>;

export { type Appointment, type Availability, type ChangePassword, type CreateAppointment, type CreateService, type CreateSessionUsageInput, type CreateSubscriptionInput, type CreateSubscriptionPackageInput, type CreateUser, type ForgotPassword, type JwtPayload, type LegacyAppointment, type Login, type ProfessionConfig, type RefreshToken, type Register, type ResetPassword, type Service, type SignIn, type SignUp, type SubscriptionFilters, type SubscriptionPackageFilters, type UpdateAppointment, type UpdateService, type UpdateSubscriptionPackageInput, type UpdateSubscriptionStatusInput, type UpdateUser, type User, appointmentSchema, appointment_schema, appointment_status, availabilitySchema, changePasswordSchema, context_type, createAppointmentSchema, createServiceSchema, createUserSchema, create_session_usage_schema, create_subscription_package_schema, create_subscription_schema, forgotPasswordSchema, jwtPayloadSchema, loginSchema, profession_config_schema, profession_configs, profession_type, refreshTokenSchema, registerSchema, resetPasswordSchema, serviceSchema, signInSchema, signUpSchema, subscription_filters_schema, subscription_package_filters_schema, updateAppointmentSchema, updateServiceSchema, updateUserSchema, update_subscription_package_schema, update_subscription_status_schema, userSchema };
