import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtPayload } from "./types/jwtPayload.type";
import { JwtService } from "@nestjs/jwt";
import { Tokens } from "./types/tokens.type";

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private config: ConfigService
  ) {}

  async getTokens(
    userId: string | number,
    email?: string,
    role?: string
  ): Promise<Tokens> {
    const jwtPayload: JwtPayload = { userId: userId, email: email, role: role };
    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: this.config.get<string>("AUTHENTICATION_SECRET"),
        expiresIn: "1h",
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: this.config.get<string>("REFRESH_TOKEN_SECRET"),
        expiresIn: "30d",
      }),
    ]);

    return {
      accessToken: at,
      refreshToken: rt,
    };
  }
}
