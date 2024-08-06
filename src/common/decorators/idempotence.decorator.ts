import { SetMetadata } from "@nestjs/common";
import { IdempotenceOption } from "../interceptors/idempotence.interceptor";

import * as dotenv from "dotenv";

export const HTTP_IDEMPOTENCE_KEY = process.env.HTTP_IDEMPOTENCE_KEY;
export const HTTP_IDEMPOTENCE_OPTIONS = process.env.HTTP_IDEMPOTENCE_OPTIONS;

export function Idempotence(options?: IdempotenceOption): MethodDecorator {
  return function (target, key, descriptor: PropertyDescriptor) {
    SetMetadata(HTTP_IDEMPOTENCE_OPTIONS, options || {})(descriptor.value);
  };
}
