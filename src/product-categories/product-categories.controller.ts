import { BadRequestException, Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { Roles } from '../common/decorators/roles.decorator';
import { CreateProductCategoryDto } from './dto/create-product-category.dto';
import { ProductCategoriesService } from './product-categories.service';

@Controller('product-categories')
export class ProductCategoriesController {
  constructor(
    @Inject(ProductCategoriesService)
    private readonly productCategoriesService: ProductCategoriesService,
  ) {}

  @Roles('admin', 'manager', 'warehouse_keeper')
  @Get()
  findAll() {
    return this.productCategoriesService.findAll();
  }

  @Roles('admin', 'manager')
  @Post()
  create(@Body() dto: CreateProductCategoryDto) {
    if (!dto) {
      throw new BadRequestException('Request body is required');
    }
    return this.productCategoriesService.create(dto);
  }
}
