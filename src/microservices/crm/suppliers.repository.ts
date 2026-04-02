import { Inject, Injectable } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';
import { suppliers } from '../../database/schema';

@Injectable()
export class SuppliersRepository {
  constructor(
    @Inject(DatabaseService)
    private readonly databaseService: DatabaseService,
  ) {}

  findAll() {
    return this.databaseService.db
      .select({
        id: suppliers.id,
        name: suppliers.name,
        phone: suppliers.phone,
        email: suppliers.email,
      })
      .from(suppliers);
  }

  create(data: { name: string; phone?: string; email?: string }) {
    return this.databaseService.db
      .insert(suppliers)
      .values(data)
      .returning({
        id: suppliers.id,
        name: suppliers.name,
        phone: suppliers.phone,
        email: suppliers.email,
      })
      .then((rows) => rows[0]);
  }
}
