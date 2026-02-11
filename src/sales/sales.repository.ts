import { BadRequestException, Injectable } from '@nestjs/common';
import { desc, eq, inArray } from 'drizzle-orm';
import { DatabaseService } from '../database/database.service';
import { clients, products, salesOrderItems, salesOrders } from '../database/schema';

@Injectable()
export class SalesRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  async findAll() {
    return this.databaseService.db
      .select({
        id: salesOrders.id,
        clientId: salesOrders.clientId,
        status: salesOrders.status,
      })
      .from(salesOrders)
      .orderBy(desc(salesOrders.id));
  }

  async create(data: {
    clientId: number;
    items: Array<{ productId: number; quantity: number }>;
  }) {
    return this.databaseService.db.transaction(async (tx) => {
      const today = new Date().toISOString().slice(0, 10);
      const clientExists = await tx
        .select({ id: clients.id })
        .from(clients)
        .where(eq(clients.id, data.clientId))
        .limit(1)
        .then((rows) => rows[0]);

      if (!clientExists) {
        throw new BadRequestException(`Client ${data.clientId} not found`);
      }

      const createdOrder = await tx
        .insert(salesOrders)
        .values({
          clientId: data.clientId,
          orderDate: today,
          status: 'created',
        })
        .returning({ id: salesOrders.id, clientId: salesOrders.clientId, status: salesOrders.status })
        .then((rows) => rows[0]);

      const productIds = [...new Set(data.items.map((item) => item.productId))];
      const productRows = await tx
        .select({ id: products.id, price: products.price })
        .from(products)
        .where(inArray(products.id, productIds));

      const priceByProductId = new Map(productRows.map((row) => [row.id, row.price]));

      for (const item of data.items) {
        const price = priceByProductId.get(item.productId);
        if (!price) {
          throw new BadRequestException(`Product ${item.productId} not found`);
        }

        await tx.insert(salesOrderItems).values({
          salesOrderId: createdOrder.id,
          productId: item.productId,
          quantity: item.quantity.toFixed(3),
          price,
        });
      }

      return {
        ...createdOrder,
        items: data.items,
      };
    });
  }
}
