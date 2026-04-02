import { Controller, Inject } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { toRpcException } from '../../common/microservices/rpc-exception.util';
import { catalogPatterns } from '../../common/nats/nats-topics';
import { ProductCreateDto } from '../../products/dto/create-product.dto';
import { ProductsRepository } from './products.repository';

@Controller()
export class ProductsMessageController {
  constructor(
    @Inject(ProductsRepository)
    private readonly productsRepository: ProductsRepository,
  ) {}

  @MessagePattern(catalogPatterns.findProducts)
  async findAll() {
    try {
      return await this.productsRepository.findAll();
    } catch (error) {
      throw toRpcException(error);
    }
  }

  @MessagePattern(catalogPatterns.createProduct)
  async create(@Payload() payload: ProductCreateDto) {
    try {
      return await this.productsRepository.create(payload);
    } catch (error) {
      throw toRpcException(error);
    }
  }
}
