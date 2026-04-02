import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ClientProxy } from '@nestjs/microservices';
import { assertRole } from '../common/auth/role.utils';
import { NatsRequestService } from '../common/nats/nats-request';
import { identityPatterns } from '../common/nats/nats-topics';
import { IDENTITY_SERVICE } from '../common/nats/nats-tokens';

@Injectable()
export class AuthService {
  constructor(
    @Inject(JwtService)
    private readonly jwtService: JwtService,
    @Inject(IDENTITY_SERVICE)
    private readonly identityClient: ClientProxy,
    @Inject(NatsRequestService)
    private readonly natsRequestService: NatsRequestService,
  ) {}

  async login(email: string, password: string) {
    const user = await this.natsRequestService.send<
      { userId: number; email: string; role: string },
      { email: string; password: string }
    >(this.identityClient, identityPatterns.validateUser, { email, password });
    const role = assertRole(user.role);

    const token = await this.jwtService.signAsync({
      sub: user.userId,
      email: user.email,
      role,
    });

    return {
      token,
      role,
    };
  }
}
