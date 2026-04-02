import { Module } from '@nestjs/common';
import { ClientsController } from './clients.controller';
import { NatsClientsModule } from '../common/nats/nats-clients.module';
import { ClientsService } from './clients.service';

@Module({
  imports: [NatsClientsModule],
  controllers: [ClientsController],
  providers: [ClientsService],
})
export class ClientsModule {}
