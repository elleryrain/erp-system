import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/database.module';
import { ProductCategoriesMessageController } from './product-categories.message.controller';
import { ProductCategoriesRepository } from './product-categories.repository';
import { ProductsMessageController } from './products.message.controller';
import { ProductsRepository } from './products.repository';

@Module({
  imports: [DatabaseModule],
  controllers: [ProductCategoriesMessageController, ProductsMessageController],
  providers: [ProductCategoriesRepository, ProductsRepository],
})
export class CatalogMicroserviceModule {}
