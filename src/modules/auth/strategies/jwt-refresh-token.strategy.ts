import { ExtractJwt, Strategy } from "passport-jwt";
import { ForbiddenException, Injectable } from "@nestjs/common";

import { BusinessException } from "~/common/exceptions/biz.exception";
import { ConfigService } from "@nestjs/config";
import { JwtPayload } from "../types/jwtPayload.type";
import { JwtPayloadWithRt } from "../types/jwtPayloadWithRt.type";
import { PassportStrategy } from "@nestjs/passport";
import { Request } from "express";

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  "jwt-refresh"
) {
  constructor(config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get<string>("REFRESH_TOKEN_SECRET"),
      passReqToCallback: true,
    });
  }

  validate(req: Request, payload: JwtPayload): JwtPayloadWithRt {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
      throw new BusinessException("Không tìm thấy quyền xác thực trong header");
    }

    const refreshToken = authHeader.replace("Bearer", "").trim();
    if (!refreshToken) {
      throw new ForbiddenException("Refresh token không đúng định dạng");
    }

    return {
      ...payload,
      refreshToken,
    };
  }
}
