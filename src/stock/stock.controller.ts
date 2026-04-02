import { Controller, Get, Inject } from '@nestjs/common';
import { Roles } from '../common/decorators/roles.decorator';
import { StockService } from './stock.service';

@Controller('stock/movements')
export class StockController {
  constructor(
    @Inject(StockService)
    private readonly stockService: StockService,
  ) {}

  @Roles('admin', 'manager', 'warehouse_keeper')
  @Get()
  findAll() {
    return this.stockService.findAll();
  }
}
