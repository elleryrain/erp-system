import { BadRequestException, Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { DatabaseService } from '../database/database.service';
import { productCategories, products, units } from '../database/schema';

const DEFAULT_CATEGORY_NAME = 'General';
const DEFAULT_UNIT = { name: 'Pieces', shortName: 'pcs' };

@Injectable()
export class ProductsRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  async findAll() {
    const rows = await this.databaseService.db
      .select({ id: products.id, name: products.name, price: products.price })
      .from(products);

    return rows.map((row) => ({ ...row, price: Number(row.price) }));
  }

  async create(data: {
    name: string;
    price: number;
    categoryId?: number;
    unitId?: number;
  }) {
    return this.databaseService.db.transaction(async (tx) => {
      if (data.categoryId) {
        const categoryExists = await tx
          .select({ id: productCategories.id })
          .from(productCategories)
          .where(eq(productCategories.id, data.categoryId))
          .limit(1)
          .then((rows) => rows[0]);
        if (!categoryExists) {
          throw new BadRequestException(`Category ${data.categoryId} not found`);
        }
      }

      if (data.unitId) {
        const unitExists = await tx
          .select({ id: units.id })
          .from(units)
          .where(eq(units.id, data.unitId))
          .limit(1)
          .then((rows) => rows[0]);
        if (!unitExists) {
          throw new BadRequestException(`Unit ${data.unitId} not found`);
        }
      }

      const categoryId = data.categoryId ?? (await this.ensureDefaultCategory(tx));
      const unitId = data.unitId ?? (await this.ensureDefaultUnit(tx));

      const row = await tx
        .insert(products)
        .values({
          name: data.name,
          price: data.price.toFixed(2),
          categoryId,
          unitId,
        })
        .returning({ id: products.id, name: products.name, price: products.price })
        .then((rows) => rows[0]);

      return { ...row, price: Number(row.price) };
    });
  }

  private async ensureDefaultCategory(tx: any) {
    const existing = await tx
      .select({ id: productCategories.id })
      .from(productCategories)
      .where(eq(productCategories.name, DEFAULT_CATEGORY_NAME))
      .limit(1)
      .then((rows) => rows[0]);

    if (existing) {
      return existing.id;
    }

    return tx
      .insert(productCategories)
      .values({ name: DEFAULT_CATEGORY_NAME })
      .returning({ id: productCategories.id })
      .then((rows) => rows[0].id);
  }

  private async ensureDefaultUnit(tx: any) {
    const existing = await tx
      .select({ id: units.id })
      .from(units)
      .where(eq(units.shortName, DEFAULT_UNIT.shortName))
      .limit(1)
      .then((rows) => rows[0]);

    if (existing) {
      return existing.id;
    }

    return tx
      .insert(units)
      .values(DEFAULT_UNIT)
      .returning({ id: units.id })
      .then((rows) => rows[0].id);
  }
}
