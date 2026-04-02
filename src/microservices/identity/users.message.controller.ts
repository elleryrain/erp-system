import { Controller, Inject } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { toRpcException } from '../../common/microservices/rpc-exception.util';
import { identityPatterns } from '../../common/nats/nats-topics';
import { UserCreateDto } from '../../users/dto/create-user.dto';
import { UsersRepository } from './users.repository';

@Controller()
export class UsersMessageController {
  constructor(
    @Inject(UsersRepository)
    private readonly usersRepository: UsersRepository,
  ) {}

  @MessagePattern(identityPatterns.findUsers)
  async findAll() {
    try {
      return await this.usersRepository.findAll();
    } catch (error) {
      throw toRpcException(error);
    }
  }

  @MessagePattern(identityPatterns.createUser)
  async create(@Payload() payload: UserCreateDto) {
    try {
      return await this.usersRepository.create(payload);
    } catch (error) {
      throw toRpcException(error);
    }
  }
}
