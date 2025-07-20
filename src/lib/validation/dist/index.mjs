// src/user.ts
import { z } from "zod";
var userSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  email: z.string().email("Email inv\xE1lido"),
  phone: z.string().min(10, "Telefone deve ter pelo menos 10 d\xEDgitos"),
  role: z.enum(["admin", "professional", "customer"]),
  createdAt: z.date(),
  updatedAt: z.date()
});
var createUserSchema = userSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true
});
var updateUserSchema = createUserSchema.partial();
var loginSchema = z.object({
  email: z.string().email("Email inv\xE1lido"),
  password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres")
});
var registerSchema = loginSchema.extend({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  phone: z.string().min(10, "Telefone deve ter pelo menos 10 d\xEDgitos")
});

// src/auth.ts
import { z as z2 } from "zod";
var signInSchema = z2.object({
  email: z2.string().email("Email inv\xE1lido"),
  password: z2.string().min(1, "Senha \xE9 obrigat\xF3ria")
});
var signUpSchema = z2.object({
  name: z2.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  email: z2.string().email("Email inv\xE1lido"),
  phone: z2.string().min(10, "Telefone inv\xE1lido"),
  password: z2.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
  confirmPassword: z2.string().min(6, "Confirma\xE7\xE3o de senha \xE9 obrigat\xF3ria")
}).refine((data) => data.password === data.confirmPassword, {
  message: "Senhas n\xE3o coincidem",
  path: ["confirmPassword"]
});
var jwtPayloadSchema = z2.object({
  userId: z2.string().min(1),
  email: z2.string().email(),
  role: z2.enum(["admin", "professional", "customer"]),
  iat: z2.number().optional(),
  exp: z2.number().optional()
});
var refreshTokenSchema = z2.object({
  refreshToken: z2.string().min(1, "Refresh token \xE9 obrigat\xF3rio")
});
var forgotPasswordSchema = z2.object({
  email: z2.string().email("Email inv\xE1lido")
});
var resetPasswordSchema = z2.object({
  token: z2.string().min(1, "Token \xE9 obrigat\xF3rio"),
  password: z2.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
  confirmPassword: z2.string().min(6, "Confirma\xE7\xE3o de senha \xE9 obrigat\xF3ria")
}).refine((data) => data.password === data.confirmPassword, {
  message: "Senhas n\xE3o coincidem",
  path: ["confirmPassword"]
});
var changePasswordSchema = z2.object({
  currentPassword: z2.string().min(1, "Senha atual \xE9 obrigat\xF3ria"),
  newPassword: z2.string().min(6, "Nova senha deve ter pelo menos 6 caracteres"),
  confirmPassword: z2.string().min(6, "Confirma\xE7\xE3o de senha \xE9 obrigat\xF3ria")
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Senhas n\xE3o coincidem",
  path: ["confirmPassword"]
});
export {
  changePasswordSchema,
  createUserSchema,
  forgotPasswordSchema,
  jwtPayloadSchema,
  loginSchema,
  refreshTokenSchema,
  registerSchema,
  resetPasswordSchema,
  signInSchema,
  signUpSchema,
  updateUserSchema,
  userSchema
};
