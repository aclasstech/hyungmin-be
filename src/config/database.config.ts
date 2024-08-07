import * as dotenv from "dotenv";

import { registerAs } from "@nestjs/config";
import { env, envBoolean, envNumber } from "~/global/env";

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

const buildMongoUrl = (
  username: string | undefined,
  password: string | undefined,
  host: string,
  port: number,
  database: string
): string => {
  let url = `mongodb://${host}:${port}/${database}`;

  if (username && password) {
    url = `mongodb://${username}:${password}@${host}:${port}/${database}`;
  }

  return url;
};

const mongoUrl = buildMongoUrl(
  env("MONGODB_USERNAME"),
  env("MONGODB_PASSWORD"),
  env("MONGODB_HOST", "127.0.0.1"),
  envNumber("MONGODB_PORT", 27017),
  env("MONGODB_DATABASE")
);

export const dbRegToken = "database";
export const DatabaseConfig = registerAs(dbRegToken, () => ({
  uri: mongoUrl,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  synchronize: envBoolean("MONGODB_SYNCHRONIZE", false),
}));

export type IDatabaseConfig = ReturnType<typeof DatabaseConfig>;
