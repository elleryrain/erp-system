import { Controller, Inject } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { toRpcException } from '../../common/microservices/rpc-exception.util';
import { crmPatterns } from '../../common/nats/nats-topics';
import { ClientCreateDto } from '../../clients/dto/create-client.dto';
import { ClientsRepository } from './clients.repository';

@Controller()
export class ClientsMessageController {
  constructor(
    @Inject(ClientsRepository)
    private readonly clientsRepository: ClientsRepository,
  ) {}

  @MessagePattern(crmPatterns.findClients)
  async findAll() {
    try {
      return await this.clientsRepository.findAll();
    } catch (error) {
      throw toRpcException(error);
    }
  }

  @MessagePattern(crmPatterns.createClient)
  async create(@Payload() payload: ClientCreateDto) {
    try {
      return await this.clientsRepository.create(payload);
    } catch (error) {
      throw toRpcException(error);
    }
  }
}
