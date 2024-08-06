import { ConfigType, registerAs } from "@nestjs/config";
import { env, envBoolean, envNumber } from "~/global/env";
import * as dotenv from "dotenv";

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

export const appRegToken = "app";

export const AppConfig = registerAs(appRegToken, () => ({
  name: env("APP_NAME"),
  port: envNumber("APP_PORT", 3030),
  baseUrl: env("APP_BASE_URL"),
  globalPrefix: env("GLOBAL_PREFIX", "api/v1"),
  locale: env("APP_LOCALE", "vi-VN"),
  /** Cho phép đăng nhập ở nhiều thiết bị */
  multiDeviceLogin: envBoolean("MULTI_DEVICE_LOGIN", true),

  logger: {
    level: env("LOGGER_LEVEL"),
    maxFiles: envNumber("LOGGER_MAX_FILES"),
  },
}));

export type IAppConfig = ConfigType<typeof AppConfig>;
