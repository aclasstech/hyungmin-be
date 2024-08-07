import { APP_FILTER, APP_INTERCEPTOR } from "@nestjs/core";
import { ClassSerializerInterceptor, Module } from "@nestjs/common";
import { ThrottlerModule, seconds } from "@nestjs/throttler";
import { AllExceptionsFilter } from "./common/filters/any-exception.filter";
import { AppService } from "./app.service";
import { CommonModule } from "./common/common.module";
import { ConfigModule } from "@nestjs/config";
import { DatabaseModule } from "./shared/database/database.module";
import { IdempotenceInterceptor } from "./common/interceptors/idempotence.interceptor";
import { SharedModule } from "./shared/shared.module";
import { TimeoutInterceptor } from "./common/interceptors/timeout.interceptor";
import { TransformInterceptor } from "./common/interceptors/transform.interceptor";
import config from "./config";
import { AdmissionModule } from "./modules/admission/admission.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      envFilePath: [".env.local", `.env.${process.env.NODE_ENV}`, ".env"],
      load: [...Object.values(config)],
    }),
    ThrottlerModule.forRootAsync({
      useFactory: () => ({
        errorMessage: "Quá tải, vui lòng thử lại sau!",
        throttlers: [{ ttl: seconds(10), limit: 7 }],
      }),
    }),
    SharedModule,
    DatabaseModule,
    CommonModule,
    AdmissionModule,
  ],
  providers: [
    AppService,
    { provide: APP_FILTER, useClass: AllExceptionsFilter },
    { provide: APP_INTERCEPTOR, useClass: ClassSerializerInterceptor },
    { provide: APP_INTERCEPTOR, useClass: TransformInterceptor },
    {
      provide: APP_INTERCEPTOR,
      useFactory: () => new TimeoutInterceptor(15 * 1000),
    },
    { provide: APP_INTERCEPTOR, useClass: IdempotenceInterceptor },
  ],
})
export class AppModule {}
