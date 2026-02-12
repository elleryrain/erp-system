import { BadRequestException, Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { SupplierCreateDto } from './dto/create-supplier.dto';
import { SuppliersRepository } from './suppliers.repository';

@Controller('suppliers')
export class SuppliersController {
  constructor(
    @Inject(SuppliersRepository)
    private readonly suppliersRepository: SuppliersRepository,
  ) {}

  @Get()
  findAll() {
    return this.suppliersRepository.findAll();
  }

  @Post()
  create(@Body() dto: SupplierCreateDto) {
    if (!dto) {
      throw new BadRequestException('Request body is required');
    }
    return this.suppliersRepository.create(dto);
  }
}
