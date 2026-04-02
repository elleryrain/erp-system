import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { NatsRequestService } from '../common/nats/nats-request';
import { catalogPatterns } from '../common/nats/nats-topics';
import { CATALOG_SERVICE } from '../common/nats/nats-tokens';
import { ProductCreateDto } from './dto/create-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @Inject(CATALOG_SERVICE)
    private readonly catalogClient: ClientProxy,
    @Inject(NatsRequestService)
    private readonly natsRequestService: NatsRequestService,
  ) {}

  findAll() {
    return this.natsRequestService.send(this.catalogClient, catalogPatterns.findProducts, {});
  }

  create(dto: ProductCreateDto) {
    return this.natsRequestService.send(this.catalogClient, catalogPatterns.createProduct, dto);
  }
}
