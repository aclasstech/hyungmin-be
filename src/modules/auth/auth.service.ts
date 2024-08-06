import { PasswordUpdateDto, SignInDto } from "./dtos/auth.dto";
import { Injectable, NotFoundException } from "@nestjs/common";
import { BusinessException } from "~/common/exceptions/biz.exception";
import { ConfigService } from "@nestjs/config";
import { ErrorEnum } from "~/constants/error-code.constant";
import { JwtPayload } from "./types/jwtPayload.type";
import { JwtService } from "@nestjs/jwt";
import { LoginLogService } from "../log/services/login-log.service";
import { ROLE, STATUS } from "~/constants/enum.constant";
import { Tokens } from "./types/tokens.type";
import { verify } from "jsonwebtoken";
import { hashPassword, verifyPassword } from "~/utils/function";

@Injectable()
export class AuthService {
  constructor(
    private readonly systemLogsService: LoginLogService,
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
