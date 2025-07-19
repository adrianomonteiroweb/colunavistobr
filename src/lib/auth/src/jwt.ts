import jwt, { SignOptions } from "jsonwebtoken";
import { JwtPayload, jwtPayloadSchema } from "@agendei/validation";

const JWT_SECRET = process.env.JWT_SECRET || "your-super-secret-jwt-key";
const JWT_REFRESH_SECRET =
  process.env.JWT_REFRESH_SECRET || "your-super-secret-refresh-key";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "15m";
const JWT_REFRESH_EXPIRES_IN = process.env.JWT_REFRESH_EXPIRES_IN || "7d";

export interface TokenPair {
  accessToken: string;
  refreshToken: string;
}

export class JwtService {
  static generateAccessToken(payload: JwtPayload): string {
    return jwt.sign(payload, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    } as SignOptions);
  }

  static generateRefreshToken(
    payload: Pick<JwtPayload, "userId" | "email">
  ): string {
    return jwt.sign(payload, JWT_REFRESH_SECRET, {
      expiresIn: JWT_REFRESH_EXPIRES_IN,
    } as SignOptions);
  }

  static generateTokenPair(payload: JwtPayload): TokenPair {
    const accessToken = this.generateAccessToken(payload);
    const refreshToken = this.generateRefreshToken({
      userId: payload.userId,
      email: payload.email,
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  static verifyAccessToken(token: string): JwtPayload {
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      return jwtPayloadSchema.parse(decoded);
    } catch (error) {
      throw new Error("Token inválido ou expirado");
    }
  }

  static verifyRefreshToken(
    token: string
  ): Pick<JwtPayload, "userId" | "email"> {
    try {
      const decoded = jwt.verify(token, JWT_REFRESH_SECRET);
      return decoded as Pick<JwtPayload, "userId" | "email">;
    } catch (error) {
      throw new Error("Refresh token inválido ou expirado");
    }
  }

  static refreshAccessToken(
    refreshToken: string,
    userData: JwtPayload
  ): string {
    try {
      this.verifyRefreshToken(refreshToken);
      return this.generateAccessToken(userData);
    } catch (error) {
      throw new Error("Não foi possível renovar o token");
    }
  }

  static extractTokenFromHeader(authHeader: string): string {
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new Error("Formato de autorização inválido");
    }
    return authHeader.substring(7);
  }

  static decodeToken(token: string): any {
    return jwt.decode(token);
  }

  static isTokenExpired(token: string): boolean {
    try {
      const decoded = jwt.decode(token) as any;
      if (!decoded || !decoded.exp) return true;

      const currentTime = Math.floor(Date.now() / 1000);
      return decoded.exp < currentTime;
    } catch {
      return true;
    }
  }
}
