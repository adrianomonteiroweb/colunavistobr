import { asc, eq, ilike, and } from "drizzle-orm";

import BaseRepository from "./BaseRepository";
import { users } from "../schema";
import type { GetUserParams, User, UserRole } from "../types";

export class UserRepository extends BaseRepository {
  static override model = users;

  static async getUsers({
    q = "",
    page = 1,
    page_size = 10,
    role,
  }: GetUserParams = {}): Promise<{
    count: number;
    data: User[];
    page: number;
    page_size: number;
    total_pages: number;
  }> {
    const limit = page_size || 10;
    const offset = ((page || 1) - 1) * page_size;

    const conditions = [];

    if (q) {
      conditions.push(ilike(users.name, `%${q}%`));
    }

    if (role) {
      conditions.push(eq(users.role, role));
    }

    const where = conditions.length > 0 ? and(...conditions) : undefined;

    const data = await super.findAll(where, {
      orderBy: [asc(users.created_at)],
      limit,
      offset,
    });

    const count = await super.count(where);

    return {
      count,
      data,
      page,
      page_size,
      total_pages: Math.ceil(count / page_size),
    };
  }
  static async findByEmail(
    email: string,
    options: any = {}
  ): Promise<User | undefined> {
    const db = options.tx || this.db;
    const result = await db
      .select()
      .from(this.model)
      .where(eq(this.model.email, email))
      .limit(1);

    return result[0] || undefined;
  }

  static async findByEmailAndRole(
    email: string,
    role: UserRole,
    options: any = {}
  ): Promise<User | undefined> {
    const db = options.tx || this.db;
    const result = await db
      .select()
      .from(this.model)
      .where(and(eq(this.model.email, email), eq(this.model.role, role)))
      .limit(1);

    return result[0] || undefined;
  }
  static async findOrCreateByEmail(email: string): Promise<[User, boolean]> {
    return await this.findOrCreate(eq(users.email, email), { email });
  }

  static async getAllPatientusers(): Promise<User[]> {
    return await this.findAll(eq(users.role, "patient"));
  }
}

export default UserRepository;
