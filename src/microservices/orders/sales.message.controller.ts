import { Controller, Inject } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { toRpcException } from '../../common/microservices/rpc-exception.util';
import { ordersPatterns } from '../../common/nats/nats-topics';
import { SalesOrderCreateDto } from '../../sales/dto/create-sales-order.dto';
import { SalesRepository } from './sales.repository';

@Controller()
export class SalesMessageController {
  constructor(
    @Inject(SalesRepository)
    private readonly salesRepository: SalesRepository,
  ) {}

  @MessagePattern(ordersPatterns.findSales)
  async findAll() {
    try {
      return await this.salesRepository.findAll();
    } catch (error) {
      throw toRpcException(error);
    }
  }

  @MessagePattern(ordersPatterns.createSale)
  async create(@Payload() payload: SalesOrderCreateDto) {
    try {
      return await this.salesRepository.create(payload);
    } catch (error) {
      throw toRpcException(error);
    }
  }
}
