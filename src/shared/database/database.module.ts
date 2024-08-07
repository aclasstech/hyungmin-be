import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { DatabaseConfig } from "~/config";

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [DatabaseConfig],
    }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const dbConfig = configService.get("database");
        return { ...dbConfig };
      },
    }),
  ],
})
export class DatabaseModule {}
