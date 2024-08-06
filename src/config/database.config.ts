import * as dotenv from "dotenv";

import { ConfigType, registerAs } from "@nestjs/config";
import { DataSource, DataSourceOptions } from "typeorm";
import { env, envBoolean, envNumber } from "~/global/env";

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

const dataSourceOptions: DataSourceOptions = {
  type: "mongodb",
  host: env("MONGODB_HOST", "127.0.0.1"),
  port: envNumber("MONGODB_PORT", 27017),
  username: env("MONGODB_USERNAME"),
  password: env("MONGODB_PASSWORD"),
  database: env("MONGODB_DATABASE"),
  synchronize: envBoolean("MONGODB_SYNCHRONIZE", false),
  entities: ["dist/modules/*/entities/*.entity{.ts,.js}"],
  migrations: ["dist/migrations/*{.ts,.js}"],
};
export const dbRegToken = "database";
export const DatabaseConfig = registerAs(
  dbRegToken,
  (): DataSourceOptions => dataSourceOptions
);

export type IDatabaseConfig = ConfigType<typeof DatabaseConfig>;

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
