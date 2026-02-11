import { Body, Controller, Get, Post } from '@nestjs/common';
import { SupplierCreateDto } from './dto/create-supplier.dto';
import { SuppliersRepository } from './suppliers.repository';

@Controller('suppliers')
export class SuppliersController {
  constructor(private readonly suppliersRepository: SuppliersRepository) {}

  @Get()
  findAll() {
    return this.suppliersRepository.findAll();
  }

  @Post()
  create(@Body() dto: SupplierCreateDto) {
    return this.suppliersRepository.create(dto);
  }
}
