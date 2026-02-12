import { BadRequestException, Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { ProductCreateDto } from './dto/create-product.dto';
import { ProductsRepository } from './products.repository';

@Controller('products')
export class ProductsController {
  constructor(
    @Inject(ProductsRepository)
    private readonly productsRepository: ProductsRepository,
  ) {}

  @Get()
  findAll() {
    return this.productsRepository.findAll();
  }

  @Post()
  async create(@Body() body: unknown) {
    if (!body || typeof body !== 'object') {
      throw new BadRequestException('Request body is required');
    }

    const dto = plainToInstance(ProductCreateDto, body);
    const errors = await validate(dto, {
      whitelist: true,
      forbidNonWhitelisted: true,
    });

    if (errors.length > 0) {
      throw new BadRequestException(errors);
    }

    return this.productsRepository.create(dto);
  }
}
