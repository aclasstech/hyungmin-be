import {
  CallHandler,
  ExecutionContext,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import qs from "qs";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { BYPASS_KEY } from "../decorators/bypass.decorator";
import { ResOp } from "../model/response.model";

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  constructor(private readonly reflector: Reflector) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>
  ): Observable<any> {
    const bypass = this.reflector.get<boolean>(
      BYPASS_KEY,
      context.getHandler()
    );

    if (bypass) return next.handle();

    const http = context.switchToHttp();
    const request = http.getRequest();

    request.query = qs.parse(request.url.split("?").at(1));

    return next.handle().pipe(
      map((data) => {
        return new ResOp(HttpStatus.OK, data || null);
      })
    );
  }
}
