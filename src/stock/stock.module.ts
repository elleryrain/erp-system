import { Module } from '@nestjs/common';
import { StockController } from './stock.controller';
import { StockRepository } from './stock.repository';

@Module({
  controllers: [StockController],
  providers: [StockRepository],
})
export class StockModule {}
