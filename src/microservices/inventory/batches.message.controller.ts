import { Controller, Inject } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { toRpcException } from '../../common/microservices/rpc-exception.util';
import { inventoryPatterns } from '../../common/nats/nats-topics';
import { BatchesRepository } from './batches.repository';

@Controller()
export class BatchesMessageController {
  constructor(
    @Inject(BatchesRepository)
    private readonly batchesRepository: BatchesRepository,
  ) {}

  @MessagePattern(inventoryPatterns.findBatches)
  async findAll() {
    try {
      return await this.batchesRepository.findAll();
    } catch (error) {
      throw toRpcException(error);
    }
  }
}
