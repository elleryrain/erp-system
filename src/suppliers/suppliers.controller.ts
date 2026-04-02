import { BadRequestException, Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { Roles } from '../common/decorators/roles.decorator';
import { SupplierCreateDto } from './dto/create-supplier.dto';
import { SuppliersService } from './suppliers.service';

@Controller('suppliers')
export class SuppliersController {
  constructor(
    @Inject(SuppliersService)
    private readonly suppliersService: SuppliersService,
  ) {}

  @Roles('admin', 'manager')
  @Get()
  findAll() {
    return this.suppliersService.findAll();
  }

  @Roles('admin', 'manager')
  @Post()
  create(@Body() dto: SupplierCreateDto) {
    if (!dto) {
      throw new BadRequestException('Request body is required');
    }
    return this.suppliersService.create(dto);
  }
}
