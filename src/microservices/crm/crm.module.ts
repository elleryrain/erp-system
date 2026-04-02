import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/database.module';
import { ClientsMessageController } from './clients.message.controller';
import { ClientsRepository } from './clients.repository';
import { SuppliersMessageController } from './suppliers.message.controller';
import { SuppliersRepository } from './suppliers.repository';

@Module({
  imports: [DatabaseModule],
  controllers: [ClientsMessageController, SuppliersMessageController],
  providers: [ClientsRepository, SuppliersRepository],
})
export class CrmMicroserviceModule {}
