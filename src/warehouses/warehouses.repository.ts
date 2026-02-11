import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { warehouses } from '../database/schema';

@Injectable()
export class WarehousesRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  async findAll() {
    return this.databaseService.db
      .select({ id: warehouses.id, name: warehouses.name, address: warehouses.address })
      .from(warehouses);
  }
}
