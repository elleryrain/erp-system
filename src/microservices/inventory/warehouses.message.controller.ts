import { Controller, Inject } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { toRpcException } from '../../common/microservices/rpc-exception.util';
import { inventoryPatterns } from '../../common/nats/nats-topics';
import { WarehousesRepository } from './warehouses.repository';

@Controller()
export class WarehousesMessageController {
  constructor(
    @Inject(WarehousesRepository)
    private readonly warehousesRepository: WarehousesRepository,
  ) {}

  @MessagePattern(inventoryPatterns.findWarehouses)
  async findAll() {
    try {
      return await this.warehousesRepository.findAll();
    } catch (error) {
      throw toRpcException(error);
    }
  }
}
