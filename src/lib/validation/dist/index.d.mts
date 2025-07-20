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

export { type ChangePassword, type CreateUser, type ForgotPassword, type JwtPayload, type Login, type RefreshToken, type Register, type ResetPassword, type SignIn, type SignUp, type UpdateUser, type User, changePasswordSchema, createUserSchema, forgotPasswordSchema, jwtPayloadSchema, loginSchema, refreshTokenSchema, registerSchema, resetPasswordSchema, signInSchema, signUpSchema, updateUserSchema, userSchema };
