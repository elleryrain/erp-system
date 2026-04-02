import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { NatsRequestService } from '../common/nats/nats-request';
import { crmPatterns } from '../common/nats/nats-topics';
import { CRM_SERVICE } from '../common/nats/nats-tokens';
import { ClientCreateDto } from './dto/create-client.dto';

@Injectable()
export class ClientsService {
  constructor(
    @Inject(CRM_SERVICE)
    private readonly crmClient: ClientProxy,
    @Inject(NatsRequestService)
    private readonly natsRequestService: NatsRequestService,
  ) {}

  findAll() {
    return this.natsRequestService.send(this.crmClient, crmPatterns.findClients, {});
  }

  create(dto: ClientCreateDto) {
    return this.natsRequestService.send(this.crmClient, crmPatterns.createClient, dto);
  }
}
