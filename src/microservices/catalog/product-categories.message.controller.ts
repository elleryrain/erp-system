import { Controller, Inject } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { toRpcException } from '../../common/microservices/rpc-exception.util';
import { catalogPatterns } from '../../common/nats/nats-topics';
import { CreateProductCategoryDto } from '../../product-categories/dto/create-product-category.dto';
import { ProductCategoriesRepository } from './product-categories.repository';

@Controller()
export class ProductCategoriesMessageController {
  constructor(
    @Inject(ProductCategoriesRepository)
    private readonly productCategoriesRepository: ProductCategoriesRepository,
  ) {}

  @MessagePattern(catalogPatterns.findCategories)
  async findAll() {
    try {
      return await this.productCategoriesRepository.findAll();
    } catch (error) {
      throw toRpcException(error);
    }
  }

  @MessagePattern(catalogPatterns.createCategory)
  async create(@Payload() payload: CreateProductCategoryDto) {
    try {
      return await this.productCategoriesRepository.create(payload);
    } catch (error) {
      throw toRpcException(error);
    }
  }
}
