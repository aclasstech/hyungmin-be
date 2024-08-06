import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { LoggerOptions } from "typeorm";
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
      useFactory: async (configService: ConfigService<ConfigKeyPaths>) => {
        let loggerOptions: LoggerOptions = env("MONGODB_LOGGING") as "all";

        if (typeof loggerOptions === 'string') {
          try {
            loggerOptions = JSON.parse(loggerOptions);
          } catch (error) {
            console.error("Error parsing loggerOptions JSON:", error);
            loggerOptions = "all"; 
          }
        }

        const databaseConfig = configService.get<IDatabaseConfig>("database");
        if (!databaseConfig) {
          throw new Error("Database configuration not found");
        }

        console.log("databaseConfig", databaseConfig)
        
        return {
          ...databaseConfig,
          autoLoadEntities: true,
          logging: loggerOptions,
          logger: new TypeORMLogger(loggerOptions),
        };
      },
    }),
  ],
  providers,
  exports: providers,
})
export class DatabaseModule {}
