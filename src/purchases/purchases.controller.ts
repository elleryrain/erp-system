import { Body, Controller, Get, Post } from '@nestjs/common';
import { PurchaseOrderCreateDto } from './dto/create-purchase-order.dto';
import { PurchasesRepository } from './purchases.repository';

@Controller('purchases/orders')
export class PurchasesController {
  constructor(private readonly purchasesRepository: PurchasesRepository) {}

  @Get()
  findAll() {
    return this.purchasesRepository.findAll();
  }

  @Post()
  create(@Body() dto: PurchaseOrderCreateDto) {
    return this.purchasesRepository.create(dto);
  }
}
