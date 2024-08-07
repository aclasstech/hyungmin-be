import { MongooseModule } from "@nestjs/mongoose";
import { LogController } from "./log.controller";
import { LoginLogService } from "./services/login-log.service";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { LoginLog, LoginLogSchema } from "./schemas/login-log.schema";

const providers = [LoginLogService];

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: LoginLog.name, schema: LoginLogSchema },
    ]),
  ],
  controllers: [LogController],
  providers: [...providers],
  exports: [TypeOrmModule, ...providers],
})
export class LogModule {}
