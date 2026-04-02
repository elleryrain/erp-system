import { Global, Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { NatsRequestService } from './nats-request';
import { createNatsClientOptions } from './nats.config';
import {
  CATALOG_SERVICE,
  CRM_SERVICE,
  IDENTITY_SERVICE,
  INVENTORY_SERVICE,
  ORDERS_SERVICE,
} from './nats-tokens';

@Global()
@Module({
  imports: [
    ClientsModule.register([
      createNatsClientOptions(IDENTITY_SERVICE),
      createNatsClientOptions(CATALOG_SERVICE),
      createNatsClientOptions(CRM_SERVICE),
      createNatsClientOptions(INVENTORY_SERVICE),
      createNatsClientOptions(ORDERS_SERVICE),
    ]),
  ],
  providers: [NatsRequestService],
  exports: [ClientsModule, NatsRequestService],
})
export class NatsClientsModule {}
