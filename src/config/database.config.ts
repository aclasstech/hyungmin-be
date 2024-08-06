import * as dotenv from "dotenv";

import { ConfigType, registerAs } from "@nestjs/config";
import { DataSource, DataSourceOptions } from "typeorm";
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

const dataSourceOptions: DataSourceOptions = {
  type: "mongodb",
  url: mongoUrl,
  synchronize: envBoolean("MONGODB_SYNCHRONIZE", false),
  entities: [__dirname + "/modules/*/entities/*.entity{.ts,.js}"],
  migrations: [__dirname + "/migrations/*{.ts,.js}"],
};
export const dbRegToken = "database";
export const DatabaseConfig = registerAs(
  dbRegToken,
  (): DataSourceOptions => dataSourceOptions
);

export type IDatabaseConfig = ConfigType<typeof DatabaseConfig>;

const dataSource = new DataSource(dataSourceOptions);
dataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });

export default dataSource;
