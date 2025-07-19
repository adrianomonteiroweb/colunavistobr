import { JwtPayload } from '@agendei/validation';

interface TokenPair {
    accessToken: string;
    refreshToken: string;
}
declare class JwtService {
    static generateAccessToken(payload: JwtPayload): string;
    static generateRefreshToken(payload: Pick<JwtPayload, "userId" | "email">): string;
    static generateTokenPair(payload: JwtPayload): TokenPair;
    static verifyAccessToken(token: string): JwtPayload;
    static verifyRefreshToken(token: string): Pick<JwtPayload, "userId" | "email">;
    static refreshAccessToken(refreshToken: string, userData: JwtPayload): string;
    static extractTokenFromHeader(authHeader: string): string;
    static decodeToken(token: string): any;
    static isTokenExpired(token: string): boolean;
}

declare class PasswordService {
    private static readonly SALT_ROUNDS;
    /**
     * Gera hash da senha usando bcrypt
     */
    static hashPassword(password: string): Promise<string>;
    /**
     * Compara senha com hash
     */
    static comparePassword(password: string, hash: string): Promise<boolean>;
    /**
     * Valida força da senha
     */
    static validatePasswordStrength(password: string): {
        isValid: boolean;
        errors: string[];
        score: number;
    };
    /**
     * Gera senha aleatória
     */
    static generateRandomPassword(length?: number): string;
}

export { JwtService, PasswordService, type TokenPair };
