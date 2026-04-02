import { Controller, Inject } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { toRpcException } from '../../common/microservices/rpc-exception.util';
import { ordersPatterns } from '../../common/nats/nats-topics';
import { PurchaseOrderCreateDto } from '../../purchases/dto/create-purchase-order.dto';
import { PurchasesRepository } from './purchases.repository';

@Controller()
export class PurchasesMessageController {
  constructor(
    @Inject(PurchasesRepository)
    private readonly purchasesRepository: PurchasesRepository,
  ) {}

  @MessagePattern(ordersPatterns.findPurchases)
  async findAll() {
    try {
      return await this.purchasesRepository.findAll();
    } catch (error) {
      throw toRpcException(error);
    }
  }

  @MessagePattern(ordersPatterns.createPurchase)
  async create(@Payload() payload: PurchaseOrderCreateDto) {
    try {
      return await this.purchasesRepository.create(payload);
    } catch (error) {
      throw toRpcException(error);
    }
  }
}
