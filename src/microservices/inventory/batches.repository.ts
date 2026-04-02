import { Inject, Injectable } from '@nestjs/common';
import { desc } from 'drizzle-orm';
import { DatabaseService } from '../../database/database.service';
import { batches } from '../../database/schema';

@Injectable()
export class BatchesRepository {
  constructor(
    @Inject(DatabaseService)
    private readonly databaseService: DatabaseService,
  ) {}

  async findAll() {
    const rows = await this.databaseService.db
      .select({
        id: batches.id,
        productId: batches.productId,
        purchaseOrderId: batches.purchaseOrderId,
        receivedAt: batches.receivedAt,
        expiresAt: batches.expiresAt,
        quantity: batches.quantity,
      })
      .from(batches)
      .orderBy(desc(batches.id));

    return rows.map((row) => ({
      ...row,
      quantity: Number(row.quantity),
      receivedAt: `${row.receivedAt}T00:00:00.000Z`,
      expiresAt: row.expiresAt ? `${row.expiresAt}T00:00:00.000Z` : null,
    }));
  }
}
