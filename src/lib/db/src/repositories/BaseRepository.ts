import { eq, count, getTableName } from "drizzle-orm";
import { NodePgDatabase } from "drizzle-orm/node-postgres";
import { PgTable } from "drizzle-orm/pg-core";
import { RelationalQueryBuilder } from "drizzle-orm/mysql-core/query-builders/query";

import { db } from "../db";
import * as schema from "../schema";

export type TableModel<T extends PgTable> = T;

export class BaseRepository {
  static db: NodePgDatabase<typeof schema> = db;
  static model: TableModel<any>;

  static async transaction(
    fn: (db: NodePgDatabase<typeof schema>) => Promise<any>
  ) {
    return await this.db.transaction(fn);
  }

  static query(db = this.db): RelationalQueryBuilder<any, any, any> {
    return (db as any).query[getTableName(this.model) + "_table"];
  }
  static async findById(id: any, _options: any = {}, { tx }: any = {}) {
    const db = tx || this.db;
    const result = await db
      .select()
      .from(this.model)
      .where(eq(this.model.id, id))
      .limit(1);
    return result[0] || null;
  }
  static async findAll(where?: any, _options: any = {}, { tx }: any = {}) {
    const db = tx || this.db;
    return await db.select().from(this.model).where(where);
  }

  static async findOne(where: any, _options: any = {}, { tx }: any = {}) {
    return await this.query(tx).findFirst({
      // ...options, // removed unused spread
      where,
    });
  }
  static async findOrCreate(
    where: any,
    data: any,
    opts: any = {}
  ): Promise<[any, boolean]> {
    const db = opts.tx || this.db;

    const item = await this.findOne(where);

    if (item) {
      return [item, false];
    }

    const created = await db.insert(this.model).values(data).returning();
    return [created[0], true];
  }

  static async count(where?: any, opts: any = {}) {
    type Result = {
      count: number;
    }[];

    const db = opts.tx || this.db;

    const result: Result = await db
      .select({ count: count() })
      .from(this.model)
      .where(where);
    return result[0]?.count || 0;
  }

  static async updateOrCreate(data: any, target: any = null, opts: any = {}) {
    const db = opts.tx || this.db;

    return await db
      .insert(this.model)
      .values(data)
      .onConflictDoUpdate({
        target: target || this.model.id,
        set: data,
      })
      .returning();
  }

  static async create(data: any, opts: any = {}) {
    const db = opts.tx || this.db;

    const created: any = await db.insert(this.model).values(data).returning();

    return created[0];
  }

  static async bulkCreate(data: any, opts: any = {}) {
    const db = opts.tx || this.db;

    return await db.insert(this.model).values(data).returning();
  }
  static async update(id: any, data: any, opts: any = {}) {
    const db = opts.tx || this.db;

    if (this.model?.updated_at) {
      data.updated_at = new Date();
    }

    const updated: any = await db
      .update(this.model)
      .set(data)
      .where(eq(this.model.id, id))
      .returning();
    return updated[0];
  }

  static async bulkUpdate(where: any, data: any, opts: any = {}) {
    const db = opts.tx || this.db;
    return db.update(this.model).set(data).where(where).returning();
  }

  static async destroy(where: any, opts: any = {}) {
    const db = opts.tx || this.db;
    return await db.delete(this.model).where(where).returning();
  }

  static async deleteById(id: any, opts: any = {}) {
    const db = opts.tx || this.db;
    return await db.delete(this.model).where(eq(this.model.id, id)).returning();
  }
}

export default BaseRepository;
