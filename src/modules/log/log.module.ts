import { LogController } from "./log.controller";
import { LoginLogEntity } from "./entities/login-log.entity";
import { LoginLogService } from "./services/login-log.service";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

const providers = [LoginLogService];

@Module({
  imports: [TypeOrmModule.forFeature([LoginLogEntity])],
  controllers: [LogController],
  providers: [...providers],
  exports: [TypeOrmModule, ...providers],
})
export class LogModule {}
