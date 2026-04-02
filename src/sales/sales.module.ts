import { Module } from '@nestjs/common';
import { SalesController } from './sales.controller';
import { NatsClientsModule } from '../common/nats/nats-clients.module';
import { SalesService } from './sales.service';

@Module({
  imports: [NatsClientsModule],
  controllers: [SalesController],
  providers: [SalesService],
})
export class SalesModule {}
