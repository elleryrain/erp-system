import { Controller, Get } from '@nestjs/common';
import { StockRepository } from './stock.repository';

@Controller('stock/movements')
export class StockController {
  constructor(private readonly stockRepository: StockRepository) {}

  @Get()
  findAll() {
    return this.stockRepository.findAll();
  }
}
