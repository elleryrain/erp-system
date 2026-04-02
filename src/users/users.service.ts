import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { NatsRequestService } from '../common/nats/nats-request';
import { identityPatterns } from '../common/nats/nats-topics';
import { IDENTITY_SERVICE } from '../common/nats/nats-tokens';
import { UserCreateDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @Inject(IDENTITY_SERVICE)
    private readonly identityClient: ClientProxy,
    @Inject(NatsRequestService)
    private readonly natsRequestService: NatsRequestService,
  ) {}

  findAll() {
    return this.natsRequestService.send(this.identityClient, identityPatterns.findUsers, {});
  }

  create(dto: UserCreateDto) {
    return this.natsRequestService.send(this.identityClient, identityPatterns.createUser, dto);
  }
}
