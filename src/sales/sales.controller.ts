import { BadRequestException, Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { Roles } from '../common/decorators/roles.decorator';
import { SalesOrderCreateDto } from './dto/create-sales-order.dto';
import { SalesService } from './sales.service';

@Controller('sales/orders')
export class SalesController {
  constructor(
    @Inject(SalesService)
    private readonly salesService: SalesService,
  ) {}

  @Roles('admin', 'manager')
  @Get()
  findAll() {
    return this.salesService.findAll();
  }

  @Roles('admin', 'manager')
  @Post()
  create(@Body() dto: SalesOrderCreateDto) {
    if (!dto) {
      throw new BadRequestException('Request body is required');
    }
    return this.salesService.create(dto);
  }
}
