import { ConfigType, registerAs } from "@nestjs/config";
import { env, envNumber } from "~/global/env";
import * as dotenv from "dotenv";

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

export const redisRegToken = "redis";

export const RedisConfig = registerAs(redisRegToken, () => ({
  host: env("REDIS_HOST", "localhost"),
  port: envNumber("REDIS_PORT", 6379),
  password: env("REDIS_PASSWORD"),
  db: envNumber("REDIS_DB"),
}));

export type IRedisConfig = ConfigType<typeof RedisConfig>;
