"use server";
import { AdminRepository } from "@/lib/db/src/repositories/AdminRepository";
import { verifyPassword } from "@/lib/db/src/auth/password";

export const loginAdmin = async (username: string, password: string) => {
  console.log("[loginAdmin] username:", username);
  const admin = await AdminRepository.findByUsername(username);
  console.log("[loginAdmin] admin from db:", admin);

  if (!admin) {
    console.log("[loginAdmin] admin not found");
    return null;
  }

  const valid = await verifyPassword(password, admin.password_hash);
  console.log("[loginAdmin] password valid:", valid);
  if (!valid) {
    console.log("[loginAdmin] password invalid", {
      password,
      hash: admin.password_hash,
    });
    return null;
  }

  // Aqui você pode setar cookie/session se necessário
  console.log("[loginAdmin] login success");
  return { id: admin.id, username: admin.username };
};
