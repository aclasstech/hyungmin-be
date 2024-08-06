import { ForbiddenException } from "@nestjs/common";
import { envBoolean } from "~/global/env";

export function checkIsDemoMode() {
  if (envBoolean("IS_DEMO"))
    throw new ForbiddenException("Không có quyền truy cập");
}
