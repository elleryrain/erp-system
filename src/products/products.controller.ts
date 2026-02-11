import { Body, Controller, Get, Post } from '@nestjs/common';
import { ProductCreateDto } from './dto/create-product.dto';
import { ProductsRepository } from './products.repository';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsRepository: ProductsRepository) {}

  @Get()
  findAll() {
    return this.productsRepository.findAll();
  }

  @Post()
  create(@Body() dto: ProductCreateDto) {
    return this.productsRepository.create(dto);
  }
}
