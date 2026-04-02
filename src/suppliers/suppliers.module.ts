import { Module } from '@nestjs/common';
import { SuppliersController } from './suppliers.controller';
import { NatsClientsModule } from '../common/nats/nats-clients.module';
import { SuppliersService } from './suppliers.service';

@Module({
  imports: [NatsClientsModule],
  controllers: [SuppliersController],
  providers: [SuppliersService],
})
export class SuppliersModule {}
