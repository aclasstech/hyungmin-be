import { applyDecorators } from "@nestjs/common";
import { ApiSecurity } from "@nestjs/swagger";

export const API_SECURITY_AUTH = "Auth";

export function ApiSecurityAuth(): ClassDecorator & MethodDecorator {
  return applyDecorators(ApiSecurity(API_SECURITY_AUTH));
}
