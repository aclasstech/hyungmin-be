import type { ExecutionContext } from "@nestjs/common";

import { createParamDecorator } from "@nestjs/common";
import type { FastifyRequest } from "fastify";
import { getIp } from "../../utils";

/**
 * Trích xuất địa chỉ IP
 */
export const Ip = createParamDecorator((_, context: ExecutionContext) => {
  const request = context.switchToHttp().getRequest<FastifyRequest>();
  return getIp(request);
});

export const Uri = createParamDecorator((_, context: ExecutionContext) => {
  const request = context.switchToHttp().getRequest<FastifyRequest>();
  return request.routerPath;
});
