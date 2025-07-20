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

// ...existing code...
