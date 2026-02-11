import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserCreateDto } from './dto/create-user.dto';
import { UsersRepository } from './users.repository';

@Controller('users')
export class UsersController {
  constructor(private readonly usersRepository: UsersRepository) {}

  @Get()
  findAll() {
    return this.usersRepository.findAll();
  }

  @Post()
  create(@Body() dto: UserCreateDto) {
    return this.usersRepository.create(dto);
  }
}
