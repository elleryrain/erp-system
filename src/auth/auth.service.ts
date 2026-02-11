import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthRepository } from './auth.repository';

@Injectable()
export class AuthService {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly jwtService: JwtService,
  ) {}

  async login(email: string, password: string) {
    const user = await this.authRepository.validateUser(email, password);

    const token = await this.jwtService.signAsync({
      sub: user.userId,
      email: user.email,
      role: user.role,
    });

    return {
      token,
      role: user.role,
    };
  }
}
