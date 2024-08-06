import {
  HttpStatus,
  NotAcceptableException,
  Param,
  ParseIntPipe,
} from "@nestjs/common";

export function IdParam() {
  return Param(
    "id",
    new ParseIntPipe({
      errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE,
      exceptionFactory: (_error) => {
        throw new NotAcceptableException("Id không đúng định dạng");
      },
    })
  );
}
