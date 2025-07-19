import { asc, eq, ilike, and } from "drizzle-orm";

import BaseRepository from "./BaseRepository";
import { users, professionals } from "../schema";
import type {
  GetUserParams,
  User,
  UserRole,
  PaginatedResponse,
} from "../types";

export class UserRepository extends BaseRepository {
  static override model = users;

  static async getUsers({
    q = "",
    page = 1,
    page_size = 10,
    role,
  }: GetUserParams = {}): Promise<PaginatedResponse<User>> {
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

  static async findProfessionalByUsername(username: string) {
    const db = this.db;

    const result = await db
      .select({
        id: professionals.id,
        user_id: professionals.user_id,
        username: professionals.username,
        bio: professionals.bio,
        profession_type: professionals.profession_type,
        hourly_rate: professionals.hourly_rate,
        stripe_account_id: professionals.stripe_account_id,
        metadata: professionals.metadata,
        user: {
          id: users.id,
          name: users.name,
          email: users.email,
          role: users.role,
        },
      })
      .from(professionals)
      .innerJoin(users, eq(professionals.user_id, users.id))
      .where(eq(professionals.username, username))
      .limit(1);

    return result[0] || null;
  }
}

export default UserRepository;
