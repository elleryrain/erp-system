import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/database.module';
import { AuthMessageController } from './auth.message.controller';
import { AuthRepository } from './auth.repository';
import { UsersMessageController } from './users.message.controller';
import { UsersRepository } from './users.repository';

@Module({
  imports: [DatabaseModule],
  controllers: [AuthMessageController, UsersMessageController],
  providers: [AuthRepository, UsersRepository],
})
export class IdentityMicroserviceModule {}
