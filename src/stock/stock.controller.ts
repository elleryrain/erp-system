import { Controller, Get, Inject } from '@nestjs/common';
import { StockRepository } from './stock.repository';

@Controller('stock/movements')
export class StockController {
  constructor(
    @Inject(StockRepository)
    private readonly stockRepository: StockRepository,
  ) {}

  @Get()
  findAll() {
    return this.stockRepository.findAll();
  }
}
