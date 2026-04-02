import { BadRequestException, Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { Roles } from '../common/decorators/roles.decorator';
import { ProductCreateDto } from './dto/create-product.dto';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(
    @Inject(ProductsService)
    private readonly productsService: ProductsService,
  ) {}

  @Roles('admin', 'manager', 'warehouse_keeper')
  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Roles('admin', 'manager')
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

    return this.productsService.create(dto);
  }
}
