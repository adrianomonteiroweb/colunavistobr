import { PasswordService } from "@/lib/auth/src/password";

describe("PasswordService", () => {
  const password = "123456";

  it("should hash and verify password correctly", async () => {
    const hash = await PasswordService.hashPassword(password);
    expect(hash).toBeDefined();
    const isValid = await PasswordService.comparePassword(password, hash);
    expect(isValid).toBe(true);
  });

  it("should not verify incorrect password", async () => {
    const hash = await PasswordService.hashPassword(password);
    const isValid = await PasswordService.comparePassword("wrong", hash);
    expect(isValid).toBe(false);
  });

  it("should validate password strength", () => {
    const result = PasswordService.validatePasswordStrength(password);
    expect(result.isValid).toBe(true);
    expect(result.errors.length).toBe(0);
    expect(result.score).toBeGreaterThanOrEqual(3);
  });

  it("should generate random password with required length", () => {
    const random = PasswordService.generateRandomPassword(16);
    expect(random.length).toBe(16);
  });
});
