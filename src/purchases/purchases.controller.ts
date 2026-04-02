import { BadRequestException, Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { Roles } from '../common/decorators/roles.decorator';
import { PurchaseOrderCreateDto } from './dto/create-purchase-order.dto';
import { PurchasesService } from './purchases.service';

@Controller('purchases/orders')
export class PurchasesController {
  constructor(
    @Inject(PurchasesService)
    private readonly purchasesService: PurchasesService,
  ) {}

  @Roles('admin', 'manager', 'warehouse_keeper')
  @Get()
  findAll() {
    return this.purchasesService.findAll();
  }

  @Roles('admin', 'manager')
  @Post()
  create(@Body() dto: PurchaseOrderCreateDto) {
    if (!dto) {
      throw new BadRequestException('Request body is required');
    }
    return this.purchasesService.create(dto);
  }
}
