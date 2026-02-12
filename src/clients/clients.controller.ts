import { BadRequestException, Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { ClientsRepository } from './clients.repository';
import { ClientCreateDto } from './dto/create-client.dto';

@Controller('clients')
export class ClientsController {
  constructor(
    @Inject(ClientsRepository)
    private readonly clientsRepository: ClientsRepository,
  ) {}

  @Get()
  findAll() {
    return this.clientsRepository.findAll();
  }

  @Post()
  create(@Body() dto: ClientCreateDto) {
    if (!dto) {
      throw new BadRequestException('Request body is required');
    }
    return this.clientsRepository.create(dto);
  }
}
