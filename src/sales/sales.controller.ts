import { BadRequestException, Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { SalesOrderCreateDto } from './dto/create-sales-order.dto';
import { SalesRepository } from './sales.repository';

@Controller('sales/orders')
export class SalesController {
  constructor(
    @Inject(SalesRepository)
    private readonly salesRepository: SalesRepository,
  ) {}

  @Get()
  findAll() {
    return this.salesRepository.findAll();
  }

  @Post()
  create(@Body() dto: SalesOrderCreateDto) {
    if (!dto) {
      throw new BadRequestException('Request body is required');
    }
    return this.salesRepository.create(dto);
  }
}
