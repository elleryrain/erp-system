import { BadRequestException, Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { CreateProductCategoryDto } from './dto/create-product-category.dto';
import { ProductCategoriesRepository } from './product-categories.repository';

@Controller('product-categories')
export class ProductCategoriesController {
  constructor(
    @Inject(ProductCategoriesRepository)
    private readonly productCategoriesRepository: ProductCategoriesRepository,
  ) {}

  @Get()
  findAll() {
    return this.productCategoriesRepository.findAll();
  }

  @Post()
  create(@Body() dto: CreateProductCategoryDto) {
    if (!dto) {
      throw new BadRequestException('Request body is required');
    }
    return this.productCategoriesRepository.create(dto);
  }
}
