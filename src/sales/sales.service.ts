import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { NatsRequestService } from '../common/nats/nats-request';
import { ordersPatterns } from '../common/nats/nats-topics';
import { ORDERS_SERVICE } from '../common/nats/nats-tokens';
import { SalesOrderCreateDto } from './dto/create-sales-order.dto';

@Injectable()
export class SalesService {
  constructor(
    @Inject(ORDERS_SERVICE)
    private readonly ordersClient: ClientProxy,
    @Inject(NatsRequestService)
    private readonly natsRequestService: NatsRequestService,
  ) {}

  findAll() {
    return this.natsRequestService.send(this.ordersClient, ordersPatterns.findSales, {});
  }

  create(dto: SalesOrderCreateDto) {
    return this.natsRequestService.send(this.ordersClient, ordersPatterns.createSale, dto);
  }
}
