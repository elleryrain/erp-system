import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/database.module';
import { BatchesMessageController } from './batches.message.controller';
import { BatchesRepository } from './batches.repository';
import { StockMessageController } from './stock.message.controller';
import { StockRepository } from './stock.repository';
import { WarehousesMessageController } from './warehouses.message.controller';
import { WarehousesRepository } from './warehouses.repository';

@Module({
  imports: [DatabaseModule],
  controllers: [
    BatchesMessageController,
    WarehousesMessageController,
    StockMessageController,
  ],
  providers: [BatchesRepository, WarehousesRepository, StockRepository],
})
export class InventoryMicroserviceModule {}
