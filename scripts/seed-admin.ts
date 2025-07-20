import "dotenv/config";
import { db } from "../src/lib/db/src/db";
import AdminRepository from "../src/lib/db/src/repositories/AdminRepository";
import { PasswordService } from "../src/lib/auth/src/password";
import { eq } from "../src/lib/db/src";

const seedAdmin = async () => {
  const username = process.env.USERNAME;
  const password = process.env.PASSWORD;
  if (!username || !password) {
    throw new Error("USERNAME and PASSWORD must be set in .env");
  }

  const existing = await AdminRepository.findByUsername(username);
  const password_hash = await PasswordService.hashPassword(password);
  if (existing) {
    await db
      .update(AdminRepository.model)
      .set({ password_hash })
      .where(eq(AdminRepository.model.username, username));
    console.log("Admin password updated");
    return;
  }
  await db.insert(AdminRepository.model).values({ username, password_hash });
  console.log("Admin seeded");
};

seedAdmin().catch((err) => {
  console.error(err);
  process.exit(1);
});
