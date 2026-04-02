import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { NatsRequestService } from '../common/nats/nats-request';
import { ordersPatterns } from '../common/nats/nats-topics';
import { ORDERS_SERVICE } from '../common/nats/nats-tokens';
import { PurchaseOrderCreateDto } from './dto/create-purchase-order.dto';

@Injectable()
export class PurchasesService {
  constructor(
    @Inject(ORDERS_SERVICE)
    private readonly ordersClient: ClientProxy,
    @Inject(NatsRequestService)
    private readonly natsRequestService: NatsRequestService,
  ) {}

  findAll() {
    return this.natsRequestService.send(this.ordersClient, ordersPatterns.findPurchases, {});
  }

  create(dto: PurchaseOrderCreateDto) {
    return this.natsRequestService.send(this.ordersClient, ordersPatterns.createPurchase, dto);
  }
}
