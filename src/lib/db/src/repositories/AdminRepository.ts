import { eq } from "drizzle-orm";
import { admin } from "../schema";
import BaseRepository from "./BaseRepository";

export class AdminRepository extends BaseRepository {
  static override model = admin;

  static async findByUsername(username: string, { tx }: any = {}) {
    const db = tx || this.db;
    const result = await db
      .select()
      .from(this.model)
      .where(eq(this.model.username, username))
      .limit(1);
    return result[0] || null;
  }
}

export default AdminRepository;
