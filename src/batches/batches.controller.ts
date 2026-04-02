import { Controller, Get, Inject } from '@nestjs/common';
import { Roles } from '../common/decorators/roles.decorator';
import { BatchesService } from './batches.service';

@Controller('batches')
export class BatchesController {
  constructor(
    @Inject(BatchesService)
    private readonly batchesService: BatchesService,
  ) {}

  @Roles('admin', 'manager', 'warehouse_keeper')
  @Get()
  findAll() {
    return this.batchesService.findAll();
  }
}
