import { Body, Controller, Get, Post } from '@nestjs/common';
import { SalesOrderCreateDto } from './dto/create-sales-order.dto';
import { SalesRepository } from './sales.repository';

@Controller('sales/orders')
export class SalesController {
  constructor(private readonly salesRepository: SalesRepository) {}

  @Get()
  findAll() {
    return this.salesRepository.findAll();
  }

  @Post()
  create(@Body() dto: SalesOrderCreateDto) {
    return this.salesRepository.create(dto);
  }
}
