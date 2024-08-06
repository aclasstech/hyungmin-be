import {
  BadRequestException,
  ExecutionContext,
  UnauthorizedException,
  createParamDecorator,
} from "@nestjs/common";

import { ErrorEnum } from "~/constants/error-code.constant";
import { verify } from "jsonwebtoken";

export const GetCurrentUserId = createParamDecorator(
  (_: undefined, context: ExecutionContext): any => {
    const request = context.switchToHttp().getRequest();
    if (!request.headers.authorization) {
      throw new UnauthorizedException(ErrorEnum.NO_PERMISSION);
    }
    const token = request.headers.authorization.split(" ")[1];

    try {
      const decodedToken: any = verify(token, process.env.REFRESH_TOKEN_SECRET);
      return decodedToken.userId;
    } catch (error) {
      throw new BadRequestException("Refresh token không đúng");
    }
  }
);

export const GetUserId = createParamDecorator(
  (_: undefined, context: ExecutionContext): any => {
    const request = context.switchToHttp().getRequest();
    if (!request.headers.authorization) {
      throw new UnauthorizedException(ErrorEnum.NO_PERMISSION);
    }
    const token = request.headers.authorization.split(" ")[1];

    try {
      const decodedToken: any = verify(
        token,
        process.env.AUTHENTICATION_SECRET
      );
      return decodedToken.userId;
    } catch (error) {
      throw new BadRequestException("Token không đúng");
    }
  }
);

export const GetCurrentRole = createParamDecorator(
  (_: undefined, context: ExecutionContext): any => {
    const request = context.switchToHttp().getRequest();
    if (!request.headers.authorization) {
      throw new UnauthorizedException(ErrorEnum.NO_PERMISSION);
    }
    const token = request.headers.authorization.split(" ")[1];

    try {
      const decodedToken: any = verify(
        token,
        process.env.AUTHENTICATION_SECRET
      );
      return decodedToken.role;
    } catch (error) {
      throw new BadRequestException("Không có quyền truy cập");
    }
  }
);
