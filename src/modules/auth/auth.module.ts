import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { AuthenticationStrategy } from "./strategies/jwt-auth.strategy";
import { ConfigModule } from "@nestjs/config";
import { GoogleAuthController } from "./google/google-auth.controller";
import { GoogleAuthService } from "./google/google-auth.service";
import { GoogleStrategy } from "./google/google.strategy";
import { JwtModule } from "@nestjs/jwt";
import { LogModule } from "../log/log.module";
import { LoggerModule } from "../logger/logger.module";
import { Module, forwardRef } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { RefreshTokenStrategy } from "./strategies/jwt-refresh-token.strategy";
import { RolesModule } from "../roles/roles.module";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [
    JwtModule.register({}),
    PassportModule.register({
      defaultStrategy: "jwt",
      property: "user",
      session: false,
    }),
    ConfigModule.forRoot(),
    LoggerModule,
    RolesModule,
    LogModule,
  ],
  controllers: [AuthController, GoogleAuthController],
  providers: [
    AuthService,
    AuthenticationStrategy,
    RefreshTokenStrategy,
    GoogleAuthService,
    GoogleStrategy,
  ],
  exports: [AuthService, PassportModule],
})
export class AuthModule {}
