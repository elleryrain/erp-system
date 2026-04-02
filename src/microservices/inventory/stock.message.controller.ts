import { Controller, Inject } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { toRpcException } from '../../common/microservices/rpc-exception.util';
import { inventoryPatterns } from '../../common/nats/nats-topics';
import { StockRepository } from './stock.repository';

@Controller()
export class StockMessageController {
  constructor(
    @Inject(StockRepository)
    private readonly stockRepository: StockRepository,
  ) {}

  @MessagePattern(inventoryPatterns.findStockMovements)
  async findAll() {
    try {
      return await this.stockRepository.findAll();
    } catch (error) {
      throw toRpcException(error);
    }
  }
}
