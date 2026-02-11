import { Module } from '@nestjs/common';
import { PurchasesController } from './purchases.controller';
import { PurchasesRepository } from './purchases.repository';

@Module({
  controllers: [PurchasesController],
  providers: [PurchasesRepository],
})
export class PurchasesModule {}
