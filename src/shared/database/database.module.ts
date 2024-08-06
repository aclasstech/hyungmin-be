import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DataSource, LoggerOptions } from "typeorm";
import { EntityExistConstraint } from "./constraints/entity-exist.constraint";
import { UniqueConstraint } from "./constraints/unique.constraint";
import { TypeORMLogger } from "./typeorm-logger";
import { ConfigKeyPaths, IDatabaseConfig } from "~/config";
import { env } from "~/global/env";

const providers = [EntityExistConstraint, UniqueConstraint];

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService<ConfigKeyPaths>) => {
        let loggerOptions: LoggerOptions = env("MONGODB_LOGGING") as "all";

        try {
          loggerOptions = JSON.parse(loggerOptions);
        } catch {}

        return {
          ...configService.get<IDatabaseConfig>("database"),
          autoLoadEntities: true,
          logging: loggerOptions,
          logger: new TypeORMLogger(loggerOptions),
        };
      },
      dataSourceFactory: async (options) => {
        const dataSource = await new DataSource(options).initialize();
        return dataSource;
      },
    }),
  ],
  providers,
  exports: providers,
})
export class DatabaseModule {}
