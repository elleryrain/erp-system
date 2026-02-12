import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { DatabaseService } from '../database/database.service';
import { productCategories } from '../database/schema';

@Injectable()
export class ProductCategoriesRepository {
  constructor(
    @Inject(DatabaseService)
    private readonly databaseService: DatabaseService,
  ) {}

  async findAll() {
    return this.databaseService.db
      .select({
        id: productCategories.id,
        name: productCategories.name,
        parentId: productCategories.parentId,
      })
      .from(productCategories);
  }

  async create(data: { name: string; parentId?: number }) {
    if (!data) {
      throw new BadRequestException('Request body is required');
    }
    if (!data.name?.trim()) {
      throw new BadRequestException('name is required');
    }

    if (data.parentId) {
      const parent = await this.databaseService.db
        .select({ id: productCategories.id })
        .from(productCategories)
        .where(eq(productCategories.id, data.parentId))
        .limit(1)
        .then((rows) => rows[0]);

      if (!parent) {
        throw new BadRequestException(`Parent category ${data.parentId} not found`);
      }
    }

    return this.databaseService.db
      .insert(productCategories)
      .values({ name: data.name, parentId: data.parentId })
      .returning({
        id: productCategories.id,
        name: productCategories.name,
        parentId: productCategories.parentId,
      })
      .then((rows) => rows[0]);
  }
}
