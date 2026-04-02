import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { NatsRequestService } from '../common/nats/nats-request';
import { catalogPatterns } from '../common/nats/nats-topics';
import { CATALOG_SERVICE } from '../common/nats/nats-tokens';
import { CreateProductCategoryDto } from './dto/create-product-category.dto';

@Injectable()
export class ProductCategoriesService {
  constructor(
    @Inject(CATALOG_SERVICE)
    private readonly catalogClient: ClientProxy,
    @Inject(NatsRequestService)
    private readonly natsRequestService: NatsRequestService,
  ) {}

  findAll() {
    return this.natsRequestService.send(this.catalogClient, catalogPatterns.findCategories, {});
  }

  create(dto: CreateProductCategoryDto) {
    return this.natsRequestService.send(this.catalogClient, catalogPatterns.createCategory, dto);
  }
}
