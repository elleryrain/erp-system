import { ConflictException, Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { DatabaseService } from '../database/database.service';
import { roles, users } from '../database/schema';

@Injectable()
export class UsersRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  async findAll() {
    return this.databaseService.db
      .select({
        id: users.id,
        email: users.email,
        role: roles.name,
      })
      .from(users)
      .leftJoin(roles, eq(users.roleId, roles.id));
  }

  async create(data: { email: string; password: string; role: string }) {
    return this.databaseService.db.transaction(async (tx) => {
      const existingUser = await tx
        .select({ id: users.id })
        .from(users)
        .where(eq(users.email, data.email))
        .limit(1)
        .then((rows) => rows[0]);

      if (existingUser) {
        throw new ConflictException('User with this email already exists');
      }

      const existingRole = await tx
        .select({ id: roles.id, name: roles.name })
        .from(roles)
        .where(eq(roles.name, data.role))
        .limit(1)
        .then((rows) => rows[0]);

      const roleId =
        existingRole?.id ??
        (
          await tx
            .insert(roles)
            .values({ name: data.role })
            .returning({ id: roles.id })
            .then((rows) => rows[0])
        ).id;

      return tx
        .insert(users)
        .values({
          email: data.email,
          passwordHash: data.password,
          fullName: data.email,
          roleId,
        })
        .returning({ id: users.id, email: users.email })
        .then((rows) => ({ ...rows[0], role: data.role }));
    });
  }
}
