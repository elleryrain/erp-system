import { BadRequestException, Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { PurchaseOrderCreateDto } from './dto/create-purchase-order.dto';
import { PurchasesRepository } from './purchases.repository';

@Controller('purchases/orders')
export class PurchasesController {
  constructor(
    @Inject(PurchasesRepository)
    private readonly purchasesRepository: PurchasesRepository,
  ) {}

  @Get()
  findAll() {
    return this.purchasesRepository.findAll();
  }

  @Post()
  create(@Body() dto: PurchaseOrderCreateDto) {
    if (!dto) {
      throw new BadRequestException('Request body is required');
    }
    return this.purchasesRepository.create(dto);
  }
}
