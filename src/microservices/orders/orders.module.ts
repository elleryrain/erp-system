import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/database.module';
import { PurchasesMessageController } from './purchases.message.controller';
import { PurchasesRepository } from './purchases.repository';
import { SalesMessageController } from './sales.message.controller';
import { SalesRepository } from './sales.repository';

@Module({
  imports: [DatabaseModule],
  controllers: [PurchasesMessageController, SalesMessageController],
  providers: [PurchasesRepository, SalesRepository],
})
export class OrdersMicroserviceModule {}
