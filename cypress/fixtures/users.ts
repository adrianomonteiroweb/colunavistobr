import { LoginData } from "../types";

const USERS: Record<string, LoginData> = {
  user: {
    email: "user@teste.com",
    password: "user123",
    role: "user",
  },
  admin: {
    email: "admin@teste.com",
    password: "admin123",
    role: "admin",
  },
};

export default USERS;
