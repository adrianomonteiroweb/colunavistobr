export { db, query } from "./db";
export * from "./schema";

// Export drizzle-orm functions for convenience
export { eq, and, or, asc, desc, ilike } from "drizzle-orm";

export * from "./repositories/BaseRepository";
export * from "./repositories/UserRepository";
export * from "./repositories/SubscriptionPackageRepository";
export * from "./repositories/SubscriptionRepository";
export * from "./repositories/SessionUsageRepository";
export * from "./repositories/AppointmentRepository";
export * from "./repositories/RecurringAppointmentRepository";
export * from "./repositories/ProfessionalRepository";
export * from "./repositories/CustomerRepository";
export * from "./repositories/PackageRepository";
export { AppointmentContextRepository } from "./repositories/AppointmentContextRepository";
export * from "./repositories/MetricsRepository";
export * from "./types";

// Export repositories as instances
export { UserRepository as userQueries } from "./repositories/UserRepository";
export { SubscriptionPackageRepository as subscriptionPackageQueries } from "./repositories/SubscriptionPackageRepository";
export { SubscriptionRepository as subscriptionQueries } from "./repositories/SubscriptionRepository";
export { SessionUsageRepository as sessionUsageQueries } from "./repositories/SessionUsageRepository";
export { AppointmentRepository as appointmentQueries } from "./repositories/AppointmentRepository";
export { ProfessionalRepository as professionalQueries } from "./repositories/ProfessionalRepository";
export { CustomerRepository as customerQueries } from "./repositories/CustomerRepository";
export { PackageRepository as packageQueries } from "./repositories/PackageRepository";
export { metricsRepository } from "./repositories/MetricsRepository";

export { db as default } from "./db";
