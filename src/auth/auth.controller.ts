import { BadRequestException, Body, Controller, HttpCode, Inject, Post } from '@nestjs/common';
import { Public } from '../common/decorators/public.decorator';
import { LoginRequestDto } from './dto/login-request.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject(AuthService)
    private readonly authService: AuthService,
  ) {}

  @Public()
  @Post('login')
  @HttpCode(200)
  login(@Body() dto: LoginRequestDto) {
    if (!dto) {
      throw new BadRequestException('Request body is required');
    }
    return this.authService.login(dto.email, dto.password);
  }
}
