"use server";
import { AdminRepository } from "@/lib/db/src/repositories/AdminRepository";
import { verifyPassword } from "@/lib/db/src/auth/password";

export const loginAdmin = async (username: string, password: string) => {
  const admin = await AdminRepository.findByUsername(username);

  if (!admin) {
    return null;
  }

  const valid = await verifyPassword(password, admin.password_hash);
  if (!valid) {
    return null;
  }

  // Aqui você pode setar cookie/session se necessário
  return { id: admin.id, username: admin.username };
};
