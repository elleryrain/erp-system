import { Injectable, OnModuleDestroy } from "@nestjs/common";
import { drizzle, NodePgDatabase } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";

@Injectable()
export class DatabaseService implements OnModuleDestroy {
  private readonly pool: Pool;
  readonly db: NodePgDatabase<typeof schema>;

  constructor() {
    const connectionString = process.env.DATABASE_URL;

    if (!connectionString) {
      throw new Error("DATABASE_URL is not set");
    }

    this.pool = new Pool({ connectionString });
    this.db = drizzle(this.pool, { schema });
  }

  async onModuleDestroy() {
    await this.pool.end();
  }
}
