import { Controller, Get } from '@nestjs/common';
import { WarehousesRepository } from './warehouses.repository';

@Controller('warehouses')
export class WarehousesController {
  constructor(private readonly warehousesRepository: WarehousesRepository) {}

  @Get()
  findAll() {
    return this.warehousesRepository.findAll();
  }
}
