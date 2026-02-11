import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { APP_GUARD } from "@nestjs/core";
import { AuthController } from "./auth.controller";
import { AuthRepository } from "./auth.repository";
import { AuthService } from "./auth.service";
import { JwtStrategy } from "./jwt.strategy";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard";
import type { StringValue } from "ms";

const jwtExpiresIn: StringValue = (process.env.JWT_EXPIRES_IN ?? "1d") as StringValue;

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: "jwt" }),
    JwtModule.register({
      secret: process.env.JWT_SECRET ?? "dev-secret-key",
      signOptions: { expiresIn: jwtExpiresIn },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthRepository,
    AuthService,
    JwtStrategy,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
  exports: [PassportModule, JwtModule],
})
export class AuthModule {}
