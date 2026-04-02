import { Module } from '@nestjs/common';
import { PurchasesController } from './purchases.controller';
import { NatsClientsModule } from '../common/nats/nats-clients.module';
import { PurchasesService } from './purchases.service';

@Module({
  imports: [NatsClientsModule],
  controllers: [PurchasesController],
  providers: [PurchasesService],
})
export class PurchasesModule {}
