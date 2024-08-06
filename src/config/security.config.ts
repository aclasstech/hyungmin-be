import { ConfigType, registerAs } from "@nestjs/config";
import { env, envNumber } from "~/global/env";
import * as dotenv from "dotenv";

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

export const securityRegToken = "security";

export const SecurityConfig = registerAs(securityRegToken, () => ({
  jwtSecret: env("JWT_SECRET"),
  jwtExprire: envNumber("JWT_EXPIRE"),
  refreshSecret: env("REFRESH_TOKEN_SECRET"),
  refreshExpire: envNumber("REFRESH_TOKEN_EXPIRE"),
}));

export type ISecurityConfig = ConfigType<typeof SecurityConfig>;
