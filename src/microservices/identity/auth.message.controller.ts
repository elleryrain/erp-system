import { Controller, Inject } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { toRpcException } from '../../common/microservices/rpc-exception.util';
import { identityPatterns } from '../../common/nats/nats-topics';
import { AuthRepository } from './auth.repository';

@Controller()
export class AuthMessageController {
  constructor(
    @Inject(AuthRepository)
    private readonly authRepository: AuthRepository,
  ) {}

  @MessagePattern(identityPatterns.validateUser)
  async validateUser(@Payload() payload: { email: string; password: string }) {
    try {
      return await this.authRepository.validateUser(payload.email, payload.password);
    } catch (error) {
      throw toRpcException(error);
    }
  }
}
