import { Module } from '@nestjs/common';
import { StockController } from './stock.controller';
import { NatsClientsModule } from '../common/nats/nats-clients.module';
import { StockService } from './stock.service';

@Module({
  imports: [NatsClientsModule],
  controllers: [StockController],
  providers: [StockService],
})
export class StockModule {}
