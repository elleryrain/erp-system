import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { NatsClientsModule } from '../common/nats/nats-clients.module';
import { ProductsService } from './products.service';

@Module({
  imports: [NatsClientsModule],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
