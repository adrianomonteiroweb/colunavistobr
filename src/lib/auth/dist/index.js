"use strict";
// __create removed for ESLint compliance
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
// __getProtoOf removed for ESLint compliance
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if ((from && typeof from === "object") || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, {
          get: () => from[key],
          enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable,
        });
  }
  return to;
};
// __toESM removed for ESLint compliance
var __toCommonJS = (mod) =>
  __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  JwtService: () => JwtService,
  PasswordService: () => PasswordService,
});
module.exports = __toCommonJS(index_exports);

// src/jwt.ts
// require() removed for ESLint compliance
// require() removed for ESLint compliance
var JWT_SECRET = process.env.JWT_SECRET || "your-super-secret-jwt-key";
var JWT_REFRESH_SECRET =
  process.env.JWT_REFRESH_SECRET || "your-super-secret-refresh-key";
var JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "15m";
var JWT_REFRESH_EXPIRES_IN = process.env.JWT_REFRESH_EXPIRES_IN || "7d";
var JwtService = class {
  static generateAccessToken(payload) {
    return import_jsonwebtoken.default.sign(payload, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });
  }
  static generateRefreshToken(payload) {
    return import_jsonwebtoken.default.sign(payload, JWT_REFRESH_SECRET, {
      expiresIn: JWT_REFRESH_EXPIRES_IN,
    });
  }
  static generateTokenPair(payload) {
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
  static verifyAccessToken(token) {
    try {
      const decoded = import_jsonwebtoken.default.verify(token, JWT_SECRET);
      return import_validation.jwtPayloadSchema.parse(decoded);
    } catch {
      throw new Error("Token inv\xE1lido ou expirado");
    }
  }
  static verifyRefreshToken(token) {
    try {
      const decoded = import_jsonwebtoken.default.verify(
        token,
        JWT_REFRESH_SECRET
      );
      return decoded;
    } catch {
      throw new Error("Refresh token inv\xE1lido ou expirado");
    }
  }
  static refreshAccessToken(refreshToken, userData) {
    try {
      this.verifyRefreshToken(refreshToken);
      return this.generateAccessToken(userData);
    } catch {
      throw new Error("N\xE3o foi poss\xEDvel renovar o token");
    }
  }
  static extractTokenFromHeader(authHeader) {
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new Error("Formato de autoriza\xE7\xE3o inv\xE1lido");
    }
    return authHeader.substring(7);
  }
  static decodeToken(token) {
    return import_jsonwebtoken.default.decode(token);
  }
  static isTokenExpired(token) {
    try {
      const decoded = import_jsonwebtoken.default.decode(token);
      if (!decoded || !decoded.exp) return true;
      const currentTime = Math.floor(Date.now() / 1e3);
      return decoded.exp < currentTime;
    } catch {
      return true;
    }
  }
};

// src/password.ts
// require() removed for ESLint compliance
var PasswordService = class {
  /**
   * Gera hash da senha usando bcrypt
   */
  static async hashPassword(password) {
    try {
      const salt = await import_bcryptjs.default.genSalt(this.SALT_ROUNDS);
      return import_bcryptjs.default.hash(password, salt);
    } catch {
      throw new Error("Erro ao criptografar senha");
    }
  }
  /**
   * Compara senha com hash
   */
  static async comparePassword(password, hash) {
    try {
      return import_bcryptjs.default.compare(password, hash);
    } catch {
      throw new Error("Erro ao verificar senha");
    }
  }
  /**
   * Valida força da senha
   */
  static validatePasswordStrength(password) {
    const errors = [];
    let score = 0;
    if (password.length < 6) {
      errors.push("Senha deve ter pelo menos 6 caracteres");
    } else {
      score += 1;
    }
    if (!/[a-z]/.test(password)) {
      errors.push("Senha deve conter pelo menos uma letra min\xFAscula");
    } else {
      score += 1;
    }
    if (!/[A-Z]/.test(password)) {
      errors.push("Senha deve conter pelo menos uma letra mai\xFAscula");
    } else {
      score += 1;
    }
    if (!/\d/.test(password)) {
      errors.push("Senha deve conter pelo menos um n\xFAmero");
    } else {
      score += 1;
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      errors.push("Senha deve conter pelo menos um caractere especial");
    } else {
      score += 1;
    }
    if (password.length >= 12) {
      score += 1;
    }
    return {
      isValid: errors.length === 0,
      errors,
      score: Math.min(score, 5),
      // Máximo 5
    };
  }
  /**
   * Gera senha aleatória
   */
  static generateRandomPassword(length = 12) {
    const lowercase = "abcdefghijklmnopqrstuvwxyz";
    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbers = "0123456789";
    const symbols = '!@#$%^&*(),.?":{}|<>';
    const allChars = lowercase + uppercase + numbers + symbols;
    let password = "";
    password += lowercase[Math.floor(Math.random() * lowercase.length)];
    password += uppercase[Math.floor(Math.random() * uppercase.length)];
    password += numbers[Math.floor(Math.random() * numbers.length)];
    password += symbols[Math.floor(Math.random() * symbols.length)];
    for (let i = password.length; i < length; i++) {
      password += allChars[Math.floor(Math.random() * allChars.length)];
    }
    return password
      .split("")
      .sort(() => Math.random() - 0.5)
      .join("");
  }
};
PasswordService.SALT_ROUNDS = 12;
// Annotate the CommonJS export names for ESM import in node:
// unused expression removed for ESLint compliance
