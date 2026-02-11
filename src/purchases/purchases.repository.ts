import { BadRequestException, Injectable } from '@nestjs/common';
import { desc, eq, inArray } from 'drizzle-orm';
import { DatabaseService } from '../database/database.service';
import { products, purchaseOrderItems, purchaseOrders, suppliers } from '../database/schema';

@Injectable()
export class PurchasesRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  async findAll() {
    return this.databaseService.db
      .select({
        id: purchaseOrders.id,
        supplierId: purchaseOrders.supplierId,
        status: purchaseOrders.status,
      })
      .from(purchaseOrders)
      .orderBy(desc(purchaseOrders.id));
  }

  async create(data: {
    supplierId: number;
    items: Array<{ productId: number; quantity: number }>;
  }) {
    return this.databaseService.db.transaction(async (tx) => {
      const today = new Date().toISOString().slice(0, 10);
      const supplierExists = await tx
        .select({ id: suppliers.id })
        .from(suppliers)
        .where(eq(suppliers.id, data.supplierId))
        .limit(1)
        .then((rows) => rows[0]);

      if (!supplierExists) {
        throw new BadRequestException(`Supplier ${data.supplierId} not found`);
      }

      const createdOrder = await tx
        .insert(purchaseOrders)
        .values({
          supplierId: data.supplierId,
          orderDate: today,
          status: 'created',
        })
        .returning({
          id: purchaseOrders.id,
          supplierId: purchaseOrders.supplierId,
          status: purchaseOrders.status,
        })
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

        await tx.insert(purchaseOrderItems).values({
          purchaseOrderId: createdOrder.id,
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
