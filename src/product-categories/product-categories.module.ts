import { Module } from '@nestjs/common';
import { ProductCategoriesController } from './product-categories.controller';
import { NatsClientsModule } from '../common/nats/nats-clients.module';
import { ProductCategoriesService } from './product-categories.service';

@Module({
  imports: [NatsClientsModule],
  controllers: [ProductCategoriesController],
  providers: [ProductCategoriesService],
})
export class ProductCategoriesModule {}
