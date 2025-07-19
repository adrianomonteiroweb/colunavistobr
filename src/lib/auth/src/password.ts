import bcrypt from "bcryptjs";

export class PasswordService {
  private static readonly SALT_ROUNDS = 12;

  /**
   * Gera hash da senha usando bcrypt
   */
  static async hashPassword(password: string): Promise<string> {
    try {
      const salt = await bcrypt.genSalt(this.SALT_ROUNDS);
      return bcrypt.hash(password, salt);
    } catch {
      throw new Error("Erro ao criptografar senha");
    }
  }

  /**
   * Compara senha com hash
   */
  static async comparePassword(
    password: string,
    hash: string
  ): Promise<boolean> {
    try {
      return bcrypt.compare(password, hash);
    } catch {
      throw new Error("Erro ao verificar senha");
    }
  }

  /**
   * Valida força da senha
   */
  static validatePasswordStrength(password: string): {
    isValid: boolean;
    errors: string[];
    score: number;
  } {
    const errors: string[] = [];
    let score = 0;

    // Comprimento mínimo
    if (password.length < 6) {
      errors.push("Senha deve ter pelo menos 6 caracteres");
    } else {
      score += 1;
    }

    // Possui letras minúsculas
    if (!/[a-z]/.test(password)) {
      errors.push("Senha deve conter pelo menos uma letra minúscula");
    } else {
      score += 1;
    }

    // Possui letras maiúsculas
    if (!/[A-Z]/.test(password)) {
      errors.push("Senha deve conter pelo menos uma letra maiúscula");
    } else {
      score += 1;
    }

    // Possui números
    if (!/\d/.test(password)) {
      errors.push("Senha deve conter pelo menos um número");
    } else {
      score += 1;
    }

    // Possui caracteres especiais
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      errors.push("Senha deve conter pelo menos um caractere especial");
    } else {
      score += 1;
    }

    // Comprimento ideal
    if (password.length >= 12) {
      score += 1;
    }

    return {
      isValid: errors.length === 0,
      errors,
      score: Math.min(score, 5), // Máximo 5
    };
  }

  /**
   * Gera senha aleatória
   */
  static generateRandomPassword(length: number = 12): string {
    const lowercase = "abcdefghijklmnopqrstuvwxyz";
    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbers = "0123456789";
    const symbols = '!@#$%^&*(),.?":{}|<>';

    const allChars = lowercase + uppercase + numbers + symbols;
    let password = "";

    // Garantir pelo menos um de cada tipo
    password += lowercase[Math.floor(Math.random() * lowercase.length)];
    password += uppercase[Math.floor(Math.random() * uppercase.length)];
    password += numbers[Math.floor(Math.random() * numbers.length)];
    password += symbols[Math.floor(Math.random() * symbols.length)];

    // Preencher o resto aleatoriamente
    for (let i = password.length; i < length; i++) {
      password += allChars[Math.floor(Math.random() * allChars.length)];
    }

    // Embaralhar a senha
    return password
      .split("")
      .sort(() => Math.random() - 0.5)
      .join("");
  }
}
