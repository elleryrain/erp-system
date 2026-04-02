import { Inject, Injectable } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';
import { productCategories } from '../../database/schema';

@Injectable()
export class ProductCategoriesRepository {
  constructor(
    @Inject(DatabaseService)
    private readonly databaseService: DatabaseService,
  ) {}

  findAll() {
    return this.databaseService.db
      .select({
        id: productCategories.id,
        name: productCategories.name,
        parentId: productCategories.parentId,
      })
      .from(productCategories);
  }

  create(data: { name: string; parentId?: number }) {
    return this.databaseService.db
      .insert(productCategories)
      .values({
        name: data.name,
        parentId: data.parentId ?? null,
      })
      .returning({
        id: productCategories.id,
        name: productCategories.name,
        parentId: productCategories.parentId,
      })
      .then((rows) => rows[0]);
  }
}
