import { BadRequestException, Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { Roles } from '../common/decorators/roles.decorator';
import { ClientCreateDto } from './dto/create-client.dto';
import { ClientsService } from './clients.service';

@Controller('clients')
export class ClientsController {
  constructor(
    @Inject(ClientsService)
    private readonly clientsService: ClientsService,
  ) {}

  @Roles('admin', 'manager')
  @Get()
  findAll() {
    return this.clientsService.findAll();
  }

  @Roles('admin', 'manager')
  @Post()
  create(@Body() dto: ClientCreateDto) {
    if (!dto) {
      throw new BadRequestException('Request body is required');
    }
    return this.clientsService.create(dto);
  }
}
