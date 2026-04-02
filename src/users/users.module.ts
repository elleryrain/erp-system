import { Module } from "@nestjs/common";
import { UsersController } from "./users.controller";
import { NatsClientsModule } from "src/common/nats/nats-clients.module";
import { UsersService } from "./users.service";

@Module({
  imports: [NatsClientsModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
