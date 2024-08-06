import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";

import { ErrorEnum } from "~/constants/error-code.constant";
import { ROLE } from "~/constants/enum.constant";
import { ROLES_KEY } from "~/common/decorators/custom.decorator";
import { Reflector } from "@nestjs/core";
import { verify } from "jsonwebtoken";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<ROLE[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
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
      const userRoles = decodedToken.role;
      return requiredRoles.some((role) => userRoles.includes(role));
    } catch (error) {
      throw new BadRequestException("Không tìm thấy role");
    }
  }
}
