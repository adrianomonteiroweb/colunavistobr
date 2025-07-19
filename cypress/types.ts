export type UserRole = "user" | "admin";

export interface LoginData {
  email: string;
  password: string;
  role: UserRole;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}
