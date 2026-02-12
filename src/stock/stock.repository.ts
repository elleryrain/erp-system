import { Inject, Injectable } from '@nestjs/common';
import { desc } from 'drizzle-orm';
import { DatabaseService } from '../database/database.service';
import { stockMovements } from '../database/schema';

@Injectable()
export class StockRepository {
  constructor(
    @Inject(DatabaseService)
    private readonly databaseService: DatabaseService,
  ) {}

  async findAll() {
    const rows = await this.databaseService.db
      .select({
        id: stockMovements.id,
        productId: stockMovements.productId,
        batchId: stockMovements.batchId,
        quantityDelta: stockMovements.quantityDelta,
        createdAt: stockMovements.createdAt,
      })
      .from(stockMovements)
      .orderBy(desc(stockMovements.id));

    return rows.map((row) => ({
      ...row,
      quantityDelta: Number(row.quantityDelta),
      createdAt: `${row.createdAt}T00:00:00.000Z`,
    }));
  }
}
