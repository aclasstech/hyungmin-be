import cluster from "node:cluster";
import path from "node:path";

import {
  HttpStatus,
  Logger,
  UnprocessableEntityException,
  ValidationPipe,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { NestFastifyApplication } from "@nestjs/platform-fastify";

import { useContainer } from "class-validator";

import { AppModule } from "./app.module";

import { fastifyApp } from "./common/adapters/fastify.adapter";
import type { ConfigKeyPaths } from "./config";
import { isDev } from "./global/env";
import { setupSwagger } from "./setup-swagger";
import { LoggerService } from "./shared/logger/logger.service";
import { LoggingInterceptor } from "./common/interceptors/logging.interceptor";
// import { RedisIoAdapter } from "./common/adapters/socket.adapter";

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    fastifyApp,
    {
      bufferLogs: true,
      snapshot: true,
    }
  );

  const configService = app.get(ConfigService<ConfigKeyPaths>);

  const { port, globalPrefix } = configService.get("app", { infer: true });

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  app.enableCors({ origin: "*", credentials: true });
  app.setGlobalPrefix(globalPrefix);
  app.useStaticAssets({ root: path.join(__dirname, "..", "public") });
  !isDev && app.enableShutdownHooks();

  if (isDev) app.useGlobalInterceptors(new LoggingInterceptor());

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      transformOptions: { enableImplicitConversion: true },
      errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      stopAtFirstError: true,
      exceptionFactory: (errors) =>
        new UnprocessableEntityException(
          errors.map((e) => {
            const rule = Object.keys(e.constraints!)[0];
            const msg = e.constraints![rule];
            return msg;
          })[0]
        ),
    })
  );

  // app.useWebSocketAdapter(new RedisIoAdapter(app));

  setupSwagger(app, configService);

  await app.listen(port, "0.0.0.0", async () => {
    app.useLogger(app.get(LoggerService));
    const url = await app.getUrl();
    const { pid } = process;
    const env = cluster.isPrimary;
    const prefix = env ? "P" : "W";

    const logger = new Logger("NestApplication");
    logger.log(`[${prefix + pid}] API running on ${url}`);

    if (isDev) logger.log(`[${prefix + pid}] OpenAPI Swagger: ${url}/api-docs`);
  });

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}

bootstrap();
