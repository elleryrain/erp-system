import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { clients } from '../database/schema';

@Injectable()
export class ClientsRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  async findAll() {
    return this.databaseService.db
      .select({ id: clients.id, name: clients.name, phone: clients.phone, email: clients.email })
      .from(clients);
  }

  async create(data: { name: string; phone?: string; email?: string }) {
    return this.databaseService.db
      .insert(clients)
      .values(data)
      .returning({ id: clients.id, name: clients.name, phone: clients.phone, email: clients.email })
      .then((rows) => rows[0]);
  }
}
