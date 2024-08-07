import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { AuthenticationStrategy } from "./strategies/jwt-auth.strategy";
import { ConfigModule } from "@nestjs/config";
import { GoogleAuthController } from "./google/google-auth.controller";
import { GoogleAuthService } from "./google/google-auth.service";
import { GoogleStrategy } from "./google/google.strategy";
import { JwtModule } from "@nestjs/jwt";
import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { RefreshTokenStrategy } from "./strategies/jwt-refresh-token.strategy";

@Module({
  imports: [
    JwtModule.register({}),
    PassportModule.register({
      defaultStrategy: "jwt",
      property: "user",
      session: false,
    }),
    ConfigModule.forRoot(),
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
