import { Module } from '@nestjs/common';
import { BatchesController } from './batches.controller';
import { BatchesRepository } from './batches.repository';

@Module({
  controllers: [BatchesController],
  providers: [BatchesRepository],
})
export class BatchesModule {}
