import { Controller, Get } from '@nestjs/common';
import { BatchesRepository } from './batches.repository';

@Controller('batches')
export class BatchesController {
  constructor(private readonly batchesRepository: BatchesRepository) {}

  @Get()
  findAll() {
    return this.batchesRepository.findAll();
  }
}
