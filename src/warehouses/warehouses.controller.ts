import { Controller, Get, Inject } from '@nestjs/common';
import { Roles } from '../common/decorators/roles.decorator';
import { WarehousesService } from './warehouses.service';

@Controller('warehouses')
export class WarehousesController {
  constructor(
    @Inject(WarehousesService)
    private readonly warehousesService: WarehousesService,
  ) {}

  @Roles('admin', 'manager', 'warehouse_keeper')
  @Get()
  findAll() {
    return this.warehousesService.findAll();
  }
}
