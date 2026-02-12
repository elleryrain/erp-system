import { Controller, Get, Inject } from '@nestjs/common';
import { BatchesRepository } from './batches.repository';

@Controller('batches')
export class BatchesController {
  constructor(
    @Inject(BatchesRepository)
    private readonly batchesRepository: BatchesRepository,
  ) {}

  @Get()
  findAll() {
    return this.batchesRepository.findAll();
  }
}
