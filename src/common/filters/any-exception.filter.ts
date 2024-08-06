import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from "@nestjs/common";
import { FastifyReply, FastifyRequest } from "fastify";
import { BusinessException } from "../exceptions/biz.exception";
import { isDev } from "~/global/env";
import { ErrorEnum } from "~/constants/error-code.constant";

interface myError {
  readonly status: number;
  readonly statusCode?: number;
  readonly message?: string;
}

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  constructor() {
    this.registerCatchAllExceptionsHook();
  }

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<FastifyRequest>();
    const response = ctx.getResponse<FastifyReply>();

    const url = request.raw.url!;

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : (exception as myError)?.status ||
          (exception as myError)?.statusCode ||
          HttpStatus.INTERNAL_SERVER_ERROR;

    let message =
      (exception as any)?.response?.message ||
      (exception as myError)?.message ||
      `${exception}`;

    console.log(exception);

    // Trường hợp lỗi hệ thống dev
    if (
      status === HttpStatus.INTERNAL_SERVER_ERROR &&
      !(exception instanceof BusinessException)
    ) {
      Logger.error(exception, undefined, "Catch");

      // Ẩn thông báo lỗi trên prod
      if (!isDev) message = ErrorEnum.SERVER_ERROR?.split(":")[1];
    } else {
      this.logger.warn(
        `Thông báo lỗi:(${status}) ${message} Path: ${decodeURI(url)}`
      );
    }

    const apiErrorCode: number =
      exception instanceof BusinessException
        ? exception.getErrorCode()
        : status;

    // Kết quả trả về
    const resBody: IBaseResponse = {
      code: apiErrorCode,
      message,
      data: null,
    };

    response.status(status).send(resBody);
  }

  registerCatchAllExceptionsHook() {
    process.on("unhandledRejection", (reason) => {
      console.error("unhandledRejection: ", reason);
    });

    process.on("uncaughtException", (err) => {
      console.error("uncaughtException: ", err);
    });
  }
}
