import { Module } from '@nestjs/common';
import { BatchesController } from './batches.controller';
import { NatsClientsModule } from '../common/nats/nats-clients.module';
import { BatchesService } from './batches.service';

@Module({
  imports: [NatsClientsModule],
  controllers: [BatchesController],
  providers: [BatchesService],
})
export class BatchesModule {}
