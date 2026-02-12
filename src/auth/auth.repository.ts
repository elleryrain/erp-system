import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { DatabaseService } from '../database/database.service';
import { roles, users } from '../database/schema';

@Injectable()
export class AuthRepository {
  constructor(
    @Inject(DatabaseService)
    private readonly databaseService: DatabaseService,
  ) {}

  async validateUser(email: string, password: string) {
    const row = await this.databaseService.db
      .select({
        userId: users.id,
        email: users.email,
        passwordHash: users.passwordHash,
        role: roles.name,
      })
      .from(users)
      .leftJoin(roles, eq(users.roleId, roles.id))
      .where(eq(users.email, email))
      .limit(1)
      .then((rows) => rows[0]);

    if (!row || row.passwordHash !== password) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return {
      userId: row.userId,
      email: row.email,
      role: row.role ?? 'unknown',
    };
  }
}
