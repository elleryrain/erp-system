import { Module } from '@nestjs/common';
import { WarehousesController } from './warehouses.controller';
import { NatsClientsModule } from '../common/nats/nats-clients.module';
import { WarehousesService } from './warehouses.service';

@Module({
  imports: [NatsClientsModule],
  controllers: [WarehousesController],
  providers: [WarehousesService],
})
export class WarehousesModule {}
