import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { NatsRequestService } from '../common/nats/nats-request';
import { inventoryPatterns } from '../common/nats/nats-topics';
import { INVENTORY_SERVICE } from '../common/nats/nats-tokens';

@Injectable()
export class StockService {
  constructor(
    @Inject(INVENTORY_SERVICE)
    private readonly inventoryClient: ClientProxy,
    @Inject(NatsRequestService)
    private readonly natsRequestService: NatsRequestService,
  ) {}

  findAll() {
    return this.natsRequestService.send(
      this.inventoryClient,
      inventoryPatterns.findStockMovements,
      {},
    );
  }
}
