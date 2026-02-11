import { Body, Controller, Get, Post } from '@nestjs/common';
import { ClientsRepository } from './clients.repository';
import { ClientCreateDto } from './dto/create-client.dto';

@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsRepository: ClientsRepository) {}

  @Get()
  findAll() {
    return this.clientsRepository.findAll();
  }

  @Post()
  create(@Body() dto: ClientCreateDto) {
    return this.clientsRepository.create(dto);
  }
}
