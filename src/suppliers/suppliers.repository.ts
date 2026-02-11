import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { suppliers } from '../database/schema';

@Injectable()
export class SuppliersRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  async findAll() {
    return this.databaseService.db
      .select({
        id: suppliers.id,
        name: suppliers.name,
        phone: suppliers.phone,
        email: suppliers.email,
      })
      .from(suppliers);
  }

  async create(data: { name: string; phone?: string; email?: string }) {
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
