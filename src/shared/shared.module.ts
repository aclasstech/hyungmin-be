import { HttpModule } from "@nestjs/axios";
import { Global, Module } from "@nestjs/common";
import { EventEmitterModule } from "@nestjs/event-emitter";
import { ScheduleModule } from "@nestjs/schedule";
import { ThrottlerModule } from "@nestjs/throttler";

import { isDev } from "~/global/env";

import { LoggerModule } from "./logger/logger.module";
import { MailerModule } from "./mailer/mailer.module";

import { RedisModule } from "./redis/redis.module";

@Global()
@Module({
  imports: [
    LoggerModule.forRoot(),
    HttpModule,
    ScheduleModule.forRoot(),
    ThrottlerModule.forRoot([
      {
        limit: 3,
        ttl: 60000,
      },
    ]),
    EventEmitterModule.forRoot({
      wildcard: true,
      delimiter: ".",
      newListener: false,
      removeListener: false,
      maxListeners: 20,
      verboseMemoryLeak: isDev,
      ignoreErrors: false,
    }),
    RedisModule,
    MailerModule,
  ],
  exports: [HttpModule, MailerModule, RedisModule],
})
export class SharedModule {}
