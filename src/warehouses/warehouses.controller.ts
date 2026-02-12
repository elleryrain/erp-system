import { Controller, Get, Inject } from '@nestjs/common';
import { WarehousesRepository } from './warehouses.repository';

@Controller('warehouses')
export class WarehousesController {
  constructor(
    @Inject(WarehousesRepository)
    private readonly warehousesRepository: WarehousesRepository,
  ) {}

  @Get()
  findAll() {
    return this.warehousesRepository.findAll();
  }
}
